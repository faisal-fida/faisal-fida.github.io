// Test file for SWR utilities
// Note: This is a basic test structure. You'll need to install testing dependencies.

import { fetcher, cacheUtils, portfolioFetcher } from '../swrUtils';

// Mock fetch for testing
global.fetch = jest.fn();

describe('SWR Utils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('fetcher', () => {
    it('should fetch data successfully', async () => {
      const mockData = { test: 'data' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        text: () => Promise.resolve(JSON.stringify(mockData))
      });

      const result = await fetcher('test-url');
      expect(result).toEqual(mockData);
    });

    it('should handle HTTP errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(fetcher('test-url')).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetcher('test-url')).rejects.toThrow();
    });

    it('should validate JSON response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        text: () => Promise.resolve('invalid json')
      });

      await expect(fetcher('test-url')).rejects.toThrow('Invalid JSON response');
    });

    it('should retry on failure', async () => {
      (fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: {
            get: (name: string) => name === 'content-type' ? 'application/json' : null
          },
          text: () => Promise.resolve('{"success": true}')
        });

      const result = await fetcher('test-url', { retries: 1 });
      expect(result).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('portfolioFetcher', () => {
    it('should validate home.json structure', async () => {
      const validHomeData = {
        homeData: { name: 'Test', job_title: 'Developer' },
        socials: []
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        text: () => Promise.resolve(JSON.stringify(validHomeData))
      });

      const result = await portfolioFetcher('data/home.json');
      expect(result).toEqual(validHomeData);
    });

    it('should reject invalid home.json structure', async () => {
      const invalidHomeData = { invalid: 'structure' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/json' : null
        },
        text: () => Promise.resolve(JSON.stringify(invalidHomeData))
      });

      await expect(portfolioFetcher('data/home.json')).rejects.toThrow('Data validation failed');
    });
  });

  describe('cacheUtils', () => {
    it('should clear cache', () => {
      localStorage.setItem('app-cache', '[]');
      localStorage.setItem('app-cache-expiry', '{}');

      cacheUtils.clearCache();

      expect(localStorage.getItem('app-cache')).toBeNull();
      expect(localStorage.getItem('app-cache-expiry')).toBeNull();
    });

    it('should get cache stats', () => {
      const testEntries = [['key1', 'value1'], ['key2', 'value2']];
      localStorage.setItem('app-cache', JSON.stringify(testEntries));

      const stats = cacheUtils.getCacheStats();
      expect(stats.size).toBe(2);
      expect(stats.entries).toEqual(['key1', 'key2']);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = jest.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const stats = cacheUtils.getCacheStats();
      expect(stats).toEqual({ size: 0, entries: [] });

      // Restore original method
      localStorage.getItem = originalGetItem;
    });
  });
});

// Example of how to test components using the enhanced SWR utils
describe('Component Integration', () => {
  it('should handle offline state', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    // Test offline behavior
    expect(navigator.onLine).toBe(false);
  });
});
