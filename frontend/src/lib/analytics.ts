// Google Analytics utility
import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  logEvent('Button', 'Click', buttonName);
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  logEvent('Form', 'Submit', formName);
};
