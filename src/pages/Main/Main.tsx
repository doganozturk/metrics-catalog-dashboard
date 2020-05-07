import * as React from "react";
import { AxiosResponse } from "axios";
import { IMetric } from "../../models/metric.model";
import { metricsService } from "../../services/metrics.service";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Chart from "../../components/Chart/Chart";
import Resource from "../../components/Resource/Resource";
import Loader from "../../components/Loader/Loader";
import { getHost } from "../../util/get-host";
import "./Main.css";

enum ChartType {
    TTFB = "ttfb",
    FCP = "fcp",
    DOM_CONTENT_LOADED = "domContentLoaded",
    WINDOW_LOADED = "windowLoaded",
}

enum ChartName {
    TTFB = "Time to First Byte",
    FCP = "First Contentfull Paint",
    DOM_CONTENT_LOADED = "DOM Content Loaded",
    WINDOW_LOADED = "Window Loaded",
}

const MainPage: React.FC = () => {
    const now = new Date();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [host] = React.useState<string>(getHost());
    const [metrics, setMetrics] = React.useState<IMetric[]>([]);
    const [dateMin, setDateMin] = React.useState<Date | null>(
        new Date(now.getTime() - 30 * 60000)
    );
    const [dateMax, setDateMax] = React.useState<Date | null>(now);

    const getMetrics = React.useCallback(async () => {
        if (!host || !dateMin || !dateMax) {
            return;
        }

        const response: AxiosResponse<
            IMetric[]
        > = await metricsService.getMetrics(host, dateMin, dateMax);
        const data: IMetric[] = response.data;

        setMetrics(data);
    }, [host, dateMin, dateMax]);

    React.useEffect(() => {
        setIsLoading(true);

        getMetrics()
            .then(() => setIsLoading(false))
            .catch(console.log);
    }, [host, dateMin, dateMax, getMetrics]);

    const renderChart = (
        type: ChartType,
        title: string
    ): React.ReactElement => (
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

    const renderCharts = (): React.ReactElement | null => {
        if (!metrics.length) {
            return null;
        }

        return (
            <section className="container chart-container">
                <div className="chart-container__item">
                    {renderChart(ChartType.TTFB, ChartName.TTFB)}
                </div>
                <div className="chart-container__item">
                    {renderChart(ChartType.FCP, ChartName.FCP)}
                </div>
                <div className="chart-container__item">
                    {renderChart(
                        ChartType.DOM_CONTENT_LOADED,
                        ChartName.DOM_CONTENT_LOADED
                    )}
                </div>
                <div className="chart-container__item">
                    {renderChart(
                        ChartType.WINDOW_LOADED,
                        ChartName.WINDOW_LOADED
                    )}
                </div>
            </section>
        );
    };

    const renderResources = (): React.ReactElement | null => {
        if (!metrics.length) {
            return null;
        }

        return (
            <section className="container resource-container">
                <h2 className="resource-container__title">RESOURCE METRICS</h2>
                {metrics.map((metric) => (
                    <Resource metric={metric} key={metric._id} />
                ))}
            </section>
        );
    };

    const renderLoading = (): React.ReactElement | null => {
        if (!isLoading) {
            return null;
        }

        return (
            <div className="container loader-container">
                <Loader />
            </div>
        );
    };

    const renderError = (): React.ReactElement | null => {
        if (host) {
            return null;
        }

        return (
            <section className="container">
                <h1>
                    Please provide a valid 'host' such as
                    'https://metrics-catalog-dashboard.now.sh/doganozturk.dev'.
                </h1>
            </section>
        );
    };

    return (
        <div className="MainPage">
            <Header />
            <main className="main">
                {renderError()}
                {host ? (
                    <section className="container">
                        <Filters
                            dateMin={dateMin}
                            dateMax={dateMax}
                            setDateMin={setDateMin}
                            setDateMax={setDateMax}
                        />
                    </section>
                ) : null}
                {renderLoading()}
                {metrics.length && !isLoading ? (
                    <React.Fragment>
                        {renderCharts()}
                        {renderResources()}
                    </React.Fragment>
                ) : null}
            </main>
        </div>
    );
};

export default MainPage;
