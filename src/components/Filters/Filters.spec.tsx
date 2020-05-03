import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

afterEach(cleanup);

const LAST_30_MINUTES_CHECKBOX = "last30MinutesCheckbox";

test("renders Filters component with valid props", () => {
    const { getByText, getByTestId, getByDisplayValue } = render(
        <Filters
            dateMin={new Date("2020-05-03T13:21:05.952Z")}
            dateMax={new Date("2020-05-03T13:51:05.952Z")}
            setDateMin={jest.fn()}
            setDateMax={jest.fn()}
        />
    );
    const checkbox: HTMLInputElement = getByTestId(
        LAST_30_MINUTES_CHECKBOX
    ) as HTMLInputElement;

    expect(getByText("Last 30 minutes")).toBeInTheDocument();
    expect(getByDisplayValue("May 3, 2020 4:21 PM")).toBeInTheDocument();
    expect(getByDisplayValue("May 3, 2020 4:51 PM")).toBeInTheDocument();
    expect(checkbox.checked).toEqual(true);
});

test('checking "Last 30 Minutes" checkbox behaves correctly', () => {
    const { getByText, getByTestId, getByDisplayValue } = render(
        <Filters
            dateMin={new Date("2020-05-03T13:00:05.952Z")}
            dateMax={new Date("2020-05-03T13:50:05.952Z")}
            setDateMin={jest.fn()}
            setDateMax={jest.fn()}
        />
    );
    const checkbox: HTMLInputElement = getByTestId(
        LAST_30_MINUTES_CHECKBOX
    ) as HTMLInputElement;

    expect(getByDisplayValue("May 3, 2020 4:00 PM")).toBeInTheDocument();
    expect(getByDisplayValue("May 3, 2020 4:50 PM")).toBeInTheDocument();
    expect(checkbox.checked).toEqual(true);

    fireEvent.click(getByText("Last 30 minutes"));

    expect(checkbox.checked).toEqual(false);
    expect(getByDisplayValue("May 3, 2020 4:00 PM")).toBeInTheDocument();
    expect(getByDisplayValue("May 3, 2020 4:50 PM")).toBeInTheDocument();

    fireEvent.click(getByText("Last 30 minutes"));

    expect(checkbox.checked).toEqual(true);
    expect(getByDisplayValue("May 3, 2020 4:00 PM")).toBeInTheDocument();
    expect(getByDisplayValue("May 3, 2020 4:50 PM")).toBeInTheDocument();
});
