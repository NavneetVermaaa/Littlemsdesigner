import { useEffect } from 'react';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-legacy-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.dataset.legacySrc = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/**
 * Loads classic (non-module) scripts in order and optionally calls a global init function.
 */
export function useLegacyScript(src, initGlobalName) {
  useEffect(() => {
    let cancelled = false;
    
    const initializeScript = async () => {
      try {
        await loadScript(src);
        
        if (cancelled) return;
        
        // Give the script a moment to initialize
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (initGlobalName && typeof window[initGlobalName] === 'function') {
          const result = window[initGlobalName]();
          if (result instanceof Promise) {
            await result;
          }
        }
      } catch (error) {
        console.error('useLegacyScript error:', error);
      }
    };
    
    initializeScript();
    
    return () => {
      cancelled = true;
    };
  }, [src, initGlobalName]);
}

export function useLegacyScripts(scripts, initGlobalName) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const src of scripts) {
        await loadScript(src);
        if (cancelled) return;
      }
      if (!cancelled && initGlobalName && typeof window[initGlobalName] === 'function') {
        window[initGlobalName]();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [scripts, initGlobalName]);
}
