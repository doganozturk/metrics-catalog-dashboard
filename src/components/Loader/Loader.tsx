import * as React from "react";
import "./Loader.css";

const Loader: React.FC = () => (
    <div className="Loader">
        <div data-testid="loader_1" />
        <div data-testid="loader_2" />
    </div>
);

export default Loader;
