import * as React from "react";
import "./Resource.css";
import { IMetric } from "../../models/metric.model";

interface IProps {
    metric: IMetric;
}

const Resource: React.FC<IProps> = ({ metric }) => (
    <div className="Resource">
        <h3 className="title">{new Date(metric.date).toLocaleString()}</h3>
        {metric.resources.map((resource) => (
            <div className="info" key={resource.name}>
                <p className="info__content">
                    <span className="info__content__title">Name:</span>{" "}
                    <a
                        href={resource.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {resource.name}
                    </a>
                </p>
                <p className="info__content">
                    <span className="info__content__title">Start Time:</span>{" "}
                    {resource.startTime.toFixed(2)}
                </p>
                <p className="info__content">
                    <span className="info__content__title">Request Start:</span>{" "}
                    {resource.requestStart.toFixed(2)}
                </p>
                <p className="info__content">
                    <span className="info__content__title">Response End:</span>{" "}
                    {resource.responseEnd.toFixed(2)}
                </p>
            </div>
        ))}
    </div>
);

export default Resource;
