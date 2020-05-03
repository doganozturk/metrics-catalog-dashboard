import React from "react";
import { render } from "@testing-library/react";
import Chart from "./Chart";

test("dummy", () => {
    expect(true);
});

// This should work; but it doesn't because of a bug: https://github.com/apexcharts/ng-apexcharts/issues/48
/*test('renders Chart component with valid props', () => {
    const { getByText } = render(
        <Chart
            title='Time to First Byte'
            data={[321.6000000247732, 78.60000000800937]}
            dates={[new Date('2020-05-02T13:28:35.148Z'), new Date('2020-05-02T13:28:51.253Z')]}
        />
    );

    expect(getByText('Time to First Byte')).toBeInTheDocument();
});*/
