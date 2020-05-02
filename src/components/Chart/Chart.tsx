import * as React from "react";
import "./Chart.css";
import ApexChart from "react-apexcharts";
import { getCssVariable } from "../../util/get-css-variable";

const colorLightPurple = getCssVariable("--color-light-purple");
const colorGreen = getCssVariable("--color-green");

interface IProps {
    title: string;
    data: number[];
    dates: Date[];
}

const Chart: React.FC<IProps> = ({ title, data, dates }) => {
    const [chartData, setChartData] = React.useState<number[]>(data);

    React.useEffect(() => {
        setChartData(data);
    }, [data]);

    return (
        <div className="Chart">
            <ApexChart
                options={{
                    chart: {
                        height: 350,
                        type: "line",
                        zoom: {
                            enabled: false,
                        },
                        dropShadow: {
                            enabled: true,
                            color: "#000",
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    colors: [colorGreen],
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    title: {
                        text: title,
                        align: "left",
                        style: {
                            color: colorLightPurple,
                        },
                    },
                    grid: {
                        row: {
                            colors: ["#f3f3f3", "transparent"],
                            opacity: 0.5,
                        },
                    },
                    xaxis: {
                        categories: dates,
                    },
                }}
                series={[
                    {
                        name: title,
                        data,
                    },
                ]}
                type="line"
                height={350}
            />
        </div>
    );
};

export default Chart;
