import React from "react";
import { render } from "@testing-library/react";
import Resource from "./Resource";

const DUMMY_METRIC = {
    _id: "5eadca402aad2a0017484ab0",
    host: "doganozturk.dev",
    date: new Date("2020-05-02T19:30:03.304Z"),
    fcp: 838.1999999983236,
    resources: [
        {
            _id: "5eadca402aad2a0017484ab1",
            name:
                "https://fonts.gstatic.com/s/firacode/v8/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7MOzlojwUKQ.woff",
            requestStart: 783.3000000100583,
            responseEnd: 805.5000000167638,
            startTime: 782.0000000065193,
        },
        {
            _id: "5eadca402aad2a0017484ab2",
            name: "https://doganozturk.dev/site.webmanifest",
            requestStart: 1093.4999999590218,
            responseEnd: 1100.3000000491738,
            startTime: 1080.19999996759,
        },
    ],
    ttfb: 556.8000000203028,
    domContentLoaded: 0,
    windowLoaded: 0.800000037997961,
    __v: 0,
};

test("renders Resource component with valid props", () => {
    const { getByText } = render(<Resource metric={DUMMY_METRIC} />);

    expect(
        getByText(
            "https://fonts.gstatic.com/s/firacode/v8/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7MOzlojwUKQ.woff"
        )
    ).toBeInTheDocument();
    expect(getByText((783.3000000100583).toFixed(2))).toBeInTheDocument();
});
