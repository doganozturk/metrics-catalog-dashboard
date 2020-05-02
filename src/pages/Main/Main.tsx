import * as React from "react";
import "./Main.css";
import { IMetric } from "../../models/metric.model";
import { metricsService } from "../../services/metrics.service";
import { AxiosResponse } from "axios";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Chart from "../../components/Chart/Chart";
import Resource from "../../components/Resource/Resource";

enum ChartType {
    TTFB = "ttfb",
    FCP = "fcp",
    DOM_CONTENT_LOADED = "domContentLoaded",
    WINDOW_LOADED = "windowLoaded",
}

const MainPage: React.FC = () => {
    const now = new Date();
    const [metrics, setMetrics] = React.useState<IMetric[]>([]);
    const [dateMin, setDateMin] = React.useState<Date | null>(
        new Date(now.getTime() - 30 * 60000)
    );
    const [dateMax, setDateMax] = React.useState<Date | null>(now);

    const getMetrics = async () => {
        if (!dateMin || !dateMax) {
            return;
        }

        const response: AxiosResponse<
            IMetric[]
        > = await metricsService.getMetrics(dateMin, dateMax);
        const data: IMetric[] = response.data;

        setMetrics(data);
    };

    React.useEffect(() => {
        getMetrics();
    }, [dateMin, dateMax]);

    const renderChart = (type: ChartType, title: string) => (
        <Chart
            title={title}
            data={metrics.reduce((prev: number[], curr) => {
                prev.push(curr[type]);
                return prev;
            }, [])}
            dates={metrics.reduce((prev: Date[], curr) => {
                prev.push(curr.date);
                return prev;
            }, [])}
        />
    );

    return (
        <div className="Main">
            <Header />
            <main>
                <section className="container">
                    <Filters
                        dateMin={dateMin}
                        dateMax={dateMax}
                        setDateMin={setDateMin}
                        setDateMax={setDateMax}
                    />
                </section>
                <section className="container chart-container">
                    <div className="chart-container__item">
                        {renderChart(ChartType.TTFB, "Time to First Byte")}
                    </div>
                    <div className="chart-container__item">
                        {renderChart(ChartType.FCP, "First ContentFull Paint")}
                    </div>
                    <div className="chart-container__item">
                        {renderChart(
                            ChartType.DOM_CONTENT_LOADED,
                            "DOM Content Loaded"
                        )}
                    </div>
                    <div className="chart-container__item">
                        {renderChart(ChartType.WINDOW_LOADED, "Window Loaded")}
                    </div>
                </section>
                <section className="container resource-container">
                    {metrics.length ? (
                        <h2 className="resource-container__title">
                            RESOURCE METRICS
                        </h2>
                    ) : null}
                    {metrics.map((metric) => (
                        <Resource metric={metric} key={metric._id} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default MainPage;
