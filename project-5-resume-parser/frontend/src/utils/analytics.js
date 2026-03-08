class Analytics {
  constructor() {
    this.initialized = false;
    this.userId = null;
    this.properties = {};
  }

  /**
   * Initialize analytics
   */
  init(userId = null) {
    this.initialized = true;
    this.userId = userId;
    
    // Track initial page view
    this.trackPageView(window.location.pathname);
  }

  /**
   * Track page view
   */
  trackPageView(path) {
    if (!this.initialized) return;
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.REACT_APP_GA_ID, {
        page_path: path,
        user_id: this.userId
      });
    }

    // Send to backend
    this.sendToBackend('page_view', {
      path,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track event
   */
  trackEvent(action, category, label, value = null, properties = {}) {
    if (!this.initialized) return;

    const eventData = {
      action,
      category,
      label,
      value,
      ...properties,
      timestamp: new Date().toISOString(),
      user_id: this.userId
    };

    // Send to Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...properties
      });
    }

    // Send to backend
    this.sendToBackend('custom_event', eventData);
  }

  /**
   * Track user engagement
   */
  trackEngagement(action, data = {}) {
    this.trackEvent('user_engagement', 'engagement', action, null, data);
  }

  /**
   * Track feature usage
   */
  trackFeature(feature, action = 'used', data = {}) {
    this.trackEvent('feature_usage', 'features', feature, null, {
      feature,
      action,
      ...data
    });
  }

  /**
   * Track error
   */
  trackError(error, context = {}) {
    this.trackEvent('error', 'errors', error.message, null, {
      error: error.message,
      stack: error.stack,
      ...context
    });
  }

  /**
   * Track performance
   */
  trackPerformance(name, duration, metadata = {}) {
    this.trackEvent('performance', 'performance', name, duration, {
      duration,
      ...metadata
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties) {
    this.properties = { ...this.properties, ...properties };
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('set', 'user_properties', properties);
    }
  }

  /**
   * Identify user
   */
  identify(userId, traits = {}) {
    this.userId = userId;
    this.setUserProperties(traits);
  }

  /**
   * Reset analytics
   */
  reset() {
    this.userId = null;
    this.properties = {};
  }

  /**
   * Send data to backend
   */
  sendToBackend(type, data) {
    // Don't block on analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
      keepalive: true
    }).catch(() => {
      // Silently fail
    });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent('time_on_page', 'engagement', 'seconds', timeSpent);
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth() {
    const depths = [25, 50, 75, 90, 100];
    const tracked = new Set();

    const handler = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / 
        document.documentElement.scrollHeight * 100;

      depths.forEach(depth => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth);
          this.trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
        }
      });
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }

  /**
   * Track outbound links
   */
  trackOutboundLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        this.trackEvent('outbound_link', 'engagement', link.href);
      }
    });
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formId, formName) {
    this.trackEvent('form_submission', 'forms', formName, null, {
      form_id: formId,
      form_name: formName
    });
  }

  /**
   * Track search
   */
  trackSearch(query, resultsCount) {
    this.trackEvent('search', 'search', query, resultsCount, {
      query,
      results_count: resultsCount
    });
  }

  /**
   * Track download
   */
  trackDownload(fileName, fileType, fileSize) {
    this.trackEvent('download', 'files', fileName, null, {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize
    });
  }

  /**
   * Track share
   */
  trackShare(platform, contentId, contentType) {
    this.trackEvent('share', 'social', platform, null, {
      platform,
      content_id: contentId,
      content_type: contentType
    });
  }

  /**
   * Track login
   */
  trackLogin(method) {
    this.trackEvent('login', 'auth', method);
  }

  /**
   * Track signup
   */
  trackSignup(method) {
    this.trackEvent('signup', 'auth', method);
  }

  /**
   * Track logout
   */
  trackLogout() {
    this.trackEvent('logout', 'auth', 'logout');
  }
}

export default new Analytics();