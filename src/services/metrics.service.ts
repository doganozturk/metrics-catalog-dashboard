import axios, { AxiosResponse } from "axios";
import { IMetric } from "../models/metric.model";

class MetricsService {
    private static readonly API_URL = process.env.REACT_APP_API_URL;

    getMetrics(
        host: string,
        dateMin: Date,
        dateMax: Date
    ): Promise<AxiosResponse> {
        return axios.get<IMetric[]>(`${MetricsService.API_URL}`, {
            params: {
                host,
                date_min: dateMin,
                date_max: dateMax,
            },
        });
    }
}

export const metricsService = new MetricsService();
