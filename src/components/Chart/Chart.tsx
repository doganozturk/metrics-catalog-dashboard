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

function apexChartOptionsFactory(title: string, dates: Date[]) {
    return {
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
            drophadow: {
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
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: false,
                    speed: 350,
                },
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
            labels: {
                formatter: (date: Date): string =>
                    new Date(date).toLocaleString(),
            },
        },
        yaxis: {
            labels: {
                formatter: (time: number): string => time.toFixed(2),
            },
        },
        markers: {
            size: 0,
        },
    };
}

function apexChartSeriesFactory(title: string, series: number[]) {
    return [
        {
            name: title,
            data: series,
        },
    ];
}

const Chart: React.FC<IProps> = ({ title, data, dates }) => {
    const [options] = React.useState(apexChartOptionsFactory(title, dates));
    const [series] = React.useState(apexChartSeriesFactory(title, data));

    return (
        <div className="Chart">
            <ApexChart
                options={options}
                series={series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default Chart;
