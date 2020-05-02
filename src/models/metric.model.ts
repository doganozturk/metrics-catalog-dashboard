export interface IMetric {
    _id: string;
    host: string;
    date: Date;
    ttfb: number;
    fcp: number;
    domContentLoaded: number;
    windowLoaded: number;
    resources: {
        name: string;
        requestStart: number;
        responseEnd: number;
        startTime: number;
    }[];
}
