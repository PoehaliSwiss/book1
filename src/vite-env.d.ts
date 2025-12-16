/// <reference types="vite/client" />

declare module '*.mdx' {
    import type { ComponentType, PropsWithChildren } from 'react'
    const component: ComponentType<PropsWithChildren>
    export default component
    export const frontmatter: Record<string, any>
}

declare module 'react-ga4' {
    export interface GA4 {
        initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID: string | any[], options?: any): void;
        send(fieldObject: string | any): void;
        event(options: any): void;
        gtag(...args: any[]): void;
        set(fieldsObject: any): void;
    }
    const ReactGA: GA4;
    export default ReactGA;
}
