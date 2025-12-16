import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

export const AnalyticsTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (GA_MEASUREMENT_ID) {
            ReactGA.initialize(GA_MEASUREMENT_ID);
            setInitialized(true);
            console.log('GA Initialized');
        } else {
            console.warn('Google Analytics Measurement ID not found (VITE_GOOGLE_ANALYTICS_ID). Analytics disabled.');
        }
    }, []);

    useEffect(() => {
        if (initialized) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [initialized, location]);

    return null;
};
