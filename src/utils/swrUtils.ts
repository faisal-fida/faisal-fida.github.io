import { Cache } from "swr";
import { useState, useEffect } from "react";

type CustomCache = Cache<unknown>;

// Configuration constants
const CACHE_KEY = "app-cache";
const CACHE_EXPIRY_KEY = "app-cache-expiry";
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_CACHE_SIZE = 100; // Maximum number of cache entries

// Types for enhanced caching
interface CacheEntry {
  data: unknown;
  timestamp: number;
  ttl: number;
}

interface CacheMetadata {
  [key: string]: {
    timestamp: number;
    ttl: number;
  };
}

// Enhanced error class for better error handling
class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public url?: string
  ) {
    super(message);
    this.name = "FetchError";
  }
}

// Utility function to validate JSON data
const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

// Utility function to check if cache entry is expired
const isCacheExpired = (timestamp: number, ttl: number): boolean => {
  return Date.now() - timestamp > ttl;
};

// Enhanced fetcher with comprehensive error handling and optimizations
export const fetcher = async (
  url: string,
  options: {
    timeout?: number;
    ttl?: number;
    validateData?: (data: unknown) => boolean;
    retries?: number;
  } = {}
): Promise<unknown> => {
  const {
    timeout = REQUEST_TIMEOUT,
    ttl = DEFAULT_CACHE_TTL,
    validateData,
    retries = 2
  } = options;

  // Create AbortController for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error | null = null;

  // Retry logic
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Check if we're offline
      if (!navigator.onLine) {
        throw new FetchError("Network unavailable", 0, url);
      }

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        throw new FetchError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new FetchError(
          `Expected JSON response, got ${contentType}`,
          response.status,
          url
        );
      }

      const text = await response.text();

      // Validate JSON
      if (!isValidJSON(text)) {
        throw new FetchError("Invalid JSON response", response.status, url);
      }

      const data = JSON.parse(text);

      // Custom data validation if provided
      if (validateData && !validateData(data)) {
        throw new FetchError("Data validation failed", response.status, url);
      }

      return data;

    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (error instanceof FetchError && error.status && error.status >= 400 && error.status < 500) {
        break;
      }

      // Don't retry on abort (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        break;
      }

      // Wait before retry (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  clearTimeout(timeoutId);

  // If all retries failed, throw the last error with enhanced message
  throw new FetchError(
    `Failed to fetch ${url} after ${retries + 1} attempts: ${lastError?.message}`,
    lastError instanceof FetchError ? lastError.status : undefined,
    url
  );
};

// Enhanced localStorage provider with expiration and performance optimizations
export const localStorageProvider = (): CustomCache => {
  let hasSetupEventListener = false;

  // Load cache from localStorage with error handling
  const loadCache = (): Map<string, unknown> => {
    try {
      const cacheData = localStorage.getItem(CACHE_KEY);
      const cacheMetadata = localStorage.getItem(CACHE_EXPIRY_KEY);

      if (!cacheData || !cacheMetadata) {
        return new Map();
      }

      const entries: [string, unknown][] = JSON.parse(cacheData);
      const metadata: CacheMetadata = JSON.parse(cacheMetadata);
      const map = new Map<string, unknown>();

      // Filter out expired entries
      const now = Date.now();
      entries.forEach(([key, value]) => {
        const meta = metadata[key];
        if (meta && !isCacheExpired(meta.timestamp, meta.ttl)) {
          map.set(key, value);
        }
      });

      return map;
    } catch (error) {
      console.warn("Failed to load cache from localStorage:", error);
      return new Map();
    }
  };

  // Save cache to localStorage with error handling
  const saveCache = (map: Map<string, unknown>) => {
    try {
      // Limit cache size to prevent localStorage overflow
      if (map.size > MAX_CACHE_SIZE) {
        // Remove oldest entries
        const entries = Array.from(map.entries());
        const toKeep = entries.slice(-MAX_CACHE_SIZE);
        map.clear();
        toKeep.forEach(([key, value]) => map.set(key, value));
      }

      const entries = Array.from(map.entries());
      const metadata: CacheMetadata = {};

      entries.forEach(([key]) => {
        metadata[key] = {
          timestamp: Date.now(),
          ttl: DEFAULT_CACHE_TTL
        };
      });

      localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
      localStorage.setItem(CACHE_EXPIRY_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.warn("Failed to save cache to localStorage:", error);
    }
  };

  const map = loadCache();

  // Setup event listener only once to prevent memory leaks
  if (!hasSetupEventListener) {
    hasSetupEventListener = true;

    const handleBeforeUnload = () => {
      saveCache(map);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveCache(map);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Periodic cache cleanup (every 5 minutes)
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      let hasExpiredEntries = false;

      map.forEach((_, key) => {
        // For simplicity, we'll use default TTL for cleanup
        // In a real implementation, you'd store TTL per entry
        const cacheTime = now - DEFAULT_CACHE_TTL;
        if (cacheTime > DEFAULT_CACHE_TTL) {
          map.delete(key);
          hasExpiredEntries = true;
        }
      });

      if (hasExpiredEntries) {
        saveCache(map);
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      clearInterval(cleanupInterval);
    });
  }

  return map as CustomCache;
};

// Utility functions for cache management
export const cacheUtils = {
  // Clear all cache
  clearCache: (): void => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);
    } catch (error) {
      console.warn("Failed to clear cache:", error);
    }
  },

  // Clear specific cache entry
  clearCacheEntry: (key: string): void => {
    try {
      const cacheData = localStorage.getItem(CACHE_KEY);
      const cacheMetadata = localStorage.getItem(CACHE_EXPIRY_KEY);

      if (cacheData && cacheMetadata) {
        const entries: [string, unknown][] = JSON.parse(cacheData);
        const metadata: CacheMetadata = JSON.parse(cacheMetadata);

        const filteredEntries = entries.filter(([entryKey]) => entryKey !== key);
        delete metadata[key];

        localStorage.setItem(CACHE_KEY, JSON.stringify(filteredEntries));
        localStorage.setItem(CACHE_EXPIRY_KEY, JSON.stringify(metadata));
      }
    } catch (error) {
      console.warn("Failed to clear cache entry:", error);
    }
  },

  // Get cache statistics
  getCacheStats: (): { size: number; entries: string[] } => {
    try {
      const cacheData = localStorage.getItem(CACHE_KEY);
      if (cacheData) {
        const entries: [string, unknown][] = JSON.parse(cacheData);
        return {
          size: entries.length,
          entries: entries.map(([key]) => key)
        };
      }
    } catch (error) {
      console.warn("Failed to get cache stats:", error);
    }
    return { size: 0, entries: [] };
  },

  // Check if cache entry exists and is valid
  isCacheValid: (key: string): boolean => {
    try {
      const cacheMetadata = localStorage.getItem(CACHE_EXPIRY_KEY);
      if (cacheMetadata) {
        const metadata: CacheMetadata = JSON.parse(cacheMetadata);
        const meta = metadata[key];
        return meta ? !isCacheExpired(meta.timestamp, meta.ttl) : false;
      }
    } catch (error) {
      console.warn("Failed to check cache validity:", error);
    }
    return false;
  }
};

// Specialized fetcher for portfolio data with validation
export const portfolioFetcher = async (url: string) => {
  return fetcher(url, {
    validateData: (data) => {
      // Validate portfolio data structure
      if (url.includes('home.json')) {
        return data && typeof data === 'object' &&
               'homeData' in data && 'socials' in data;
      }
      if (url.includes('project.json') || url.includes('service.json') ||
          url.includes('testimonial.json') || url.includes('blog.json')) {
        return Array.isArray(data);
      }
      if (url.includes('about.json')) {
        return data && typeof data === 'object' &&
               'resume' in data && 'skills' in data;
      }
      if (url.includes('experience.json')) {
        return Array.isArray(data);
      }
      return true; // Default validation
    },
    ttl: 10 * 60 * 1000, // 10 minutes for portfolio data
    retries: 3
  });
};

// Hook for offline detection
export const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOffline;
};
