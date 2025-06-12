import React, { useState } from 'react';
import useSWR from 'swr';
import { 
  portfolioFetcher, 
  useOfflineStatus, 
  cacheUtils 
} from '../../utils/swrUtils';
import '../../styles/swrComponents.css';

interface ExampleData {
  id: number;
  title: string;
  description: string;
}

/**
 * Enhanced Data Component demonstrating all SWR optimizations
 * This component showcases:
 * - Enhanced error handling with retry functionality
 * - Offline detection and appropriate messaging
 * - Cache management utilities
 * - Loading states with better UX
 * - Data validation
 */
const EnhancedDataComponent: React.FC = () => {
  const [showCacheStats, setShowCacheStats] = useState(false);
  const isOffline = useOfflineStatus();
  
  const { 
    data, 
    error, 
    isLoading, 
    mutate,
    isValidating 
  } = useSWR<ExampleData[]>('data/service.json', portfolioFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 2000,
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  });

  const handleRetry = () => {
    mutate();
  };

  const handleClearCache = () => {
    cacheUtils.clearCache();
    mutate(); // Refetch after clearing cache
  };

  const handleClearSpecificCache = () => {
    cacheUtils.clearCacheEntry('data/service.json');
    mutate();
  };

  const getCacheStats = () => {
    return cacheUtils.getCacheStats();
  };

  const isCacheValid = () => {
    return cacheUtils.isCacheValid('data/service.json');
  };

  // Offline indicator
  const OfflineIndicator = () => (
    <div className={`offline-indicator ${!isOffline ? 'online' : ''}`}>
      {isOffline ? '🔴 You are offline' : '🟢 Back online'}
    </div>
  );

  // Cache status component
  const CacheStatus = () => {
    if (!showCacheStats) return null;
    
    const stats = getCacheStats();
    const isValid = isCacheValid();
    
    return (
      <div className="cache-status">
        <div><strong>Cache Stats:</strong></div>
        <div>Entries: {stats.size}</div>
        <div>Valid: {isValid ? 'Yes' : 'No'}</div>
        <div>Keys: {stats.entries.slice(0, 3).join(', ')}</div>
        {stats.entries.length > 3 && <div>... and {stats.entries.length - 3} more</div>}
      </div>
    );
  };

  // Error state with enhanced messaging and retry options
  if (error) {
    return (
      <div className="enhanced-data-component">
        <OfflineIndicator />
        <h2>Enhanced Data Component</h2>
        
        <div className="error-container">
          <p>
            <strong>Error loading data:</strong><br />
            {isOffline 
              ? "You're currently offline. Please check your internet connection and try again."
              : error.message || 'An unexpected error occurred while fetching data.'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleRetry} 
              disabled={isOffline || isValidating}
              className="retry-button"
            >
              {isValidating ? 'Retrying...' : 'Try Again'}
            </button>
            
            <button 
              onClick={handleClearSpecificCache}
              disabled={isOffline}
              className="retry-button"
            >
              Clear Cache & Retry
            </button>
          </div>
          
          {error.status && (
            <div style={{ marginTop: '10px', fontSize: '0.9em', opacity: 0.8 }}>
              HTTP Status: {error.status}
            </div>
          )}
        </div>
        
        <CacheStatus />
      </div>
    );
  }

  // Loading state with better UX
  if (isLoading) {
    return (
      <div className="enhanced-data-component">
        <OfflineIndicator />
        <h2>Enhanced Data Component</h2>
        
        <div className="loading-container">
          <div>Loading data...</div>
        </div>
        
        <CacheStatus />
      </div>
    );
  }

  // Success state with data and cache management options
  return (
    <div className="enhanced-data-component">
      <OfflineIndicator />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Enhanced Data Component</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowCacheStats(!showCacheStats)}
            style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
          >
            {showCacheStats ? 'Hide' : 'Show'} Cache Stats
          </button>
          <button 
            onClick={handleClearCache}
            style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
          >
            Clear All Cache
          </button>
        </div>
      </div>

      {isValidating && (
        <div className="cache-warning">
          🔄 Revalidating data in background...
        </div>
      )}

      <div className="data-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {data?.map((item: ExampleData) => (
          <div 
            key={item.id} 
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>Component Features Demonstrated:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>✅ Enhanced error handling with retry functionality</li>
          <li>✅ Offline detection and appropriate messaging</li>
          <li>✅ Data validation through portfolioFetcher</li>
          <li>✅ Cache management utilities</li>
          <li>✅ Loading states with better UX</li>
          <li>✅ Background revalidation indicators</li>
          <li>✅ Request deduplication</li>
          <li>✅ Configurable retry behavior</li>
        </ul>
      </div>

      <CacheStatus />
    </div>
  );
};

export default EnhancedDataComponent;
