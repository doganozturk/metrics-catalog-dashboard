import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

const LOADER_1 = "loader_1";
const LOADER_2 = "loader_2";

test("renders Loader component", () => {
    const { getByTestId } = render(<Loader />);
    const div_1: HTMLDivElement = getByTestId(LOADER_1) as HTMLDivElement;
    const div_2: HTMLDivElement = getByTestId(LOADER_2) as HTMLDivElement;

    expect(div_1).toBeInTheDocument();
    expect(div_2).toBeInTheDocument();
});
