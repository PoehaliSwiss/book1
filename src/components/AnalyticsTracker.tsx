import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const ENV_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const IS_READER_MODE = import.meta.env.VITE_APP_MODE === 'reader';

interface AnalyticsTrackerProps {
    courseGaId?: string;
}

export const AnalyticsTracker = ({ courseGaId }: AnalyticsTrackerProps) => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // Determine which ID to use
        // If Reader Mode: ONLY use the courseGaId (user provided via course.yaml)
        // If Designer/Server: PRIORITIZE env var (Service Provider's GA), fallback to courseGaId? 
        // Actually typically the Designer/Server tracks its own usage via Env Var.

        const targetId = IS_READER_MODE ? courseGaId : (ENV_MEASUREMENT_ID || courseGaId);

        if (targetId && !initialized) {
            // Check if already initialized to avoid warnings if strict mode mounts twice
            if (!window.ga4Initialized) {
                ReactGA.initialize(targetId);
                window.ga4Initialized = true; // Simple global flag to prevent double init in dev
                setInitialized(true);
                console.log(`[Analytics] Initialized with ID: ${targetId} (Mode: ${IS_READER_MODE ? 'Reader' : 'Designer'})`);
            } else {
                setInitialized(true);
            }
        }
    }, [courseGaId]);

    useEffect(() => {
        if (initialized) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [initialized, location]);

    return null;
};

// Add global type for window
declare global {
    interface Window {
        ga4Initialized?: boolean;
    }
}
