# MetricsCatalog.Dashboard

`metrics-catalog-dashboard` is a simple React app for visualizing analytics data such as TTFB, FCP etc. which is provided by [metrics-catalog-api](https://metrics-catalog-api.herokuapp.com/metrics/).

## Features
- Written using React with TypeScript.
- Responsive layout.
- Gets data from `metrics-catalog-api`.
- It shows last 30 minute's performance data from a given host on default.
- User can change date range filter to take a look at any given time range.

## Get Started
You should provide a valid `host` parameter for url, such as `https://metrics-catalog-dashboard.now.sh/doganozturk.dev`. That parameter comes from defined host in `metrics-catalog-js` library init action. So if your site is `blabla.com` and you want to use this project, you should init `metrics-catalog-js` lib. in `blabla.com` like that:

```javascript
const metricsCatalog = new MetricsCatalog({
    host: 'blabla.com',
});

metricsCatalog.init();
```

Then you should access this dashboard through `https://metrics-catalog-dashboard.now.sh/blabla.com`

## Local development setup
1. Download the repository.
2. Get Node.js v12.16.3 and install it if you haven't already.
3. Use ```yarn``` to install the necessary dependencies.
4. The source code is written in TypeScript in the `src` directory.
5. Run ```yarn build``` to build the library.
6. Run ```yarn test``` to run the tests.

## Contribution
Pull requests and feature requests are welcome!

## Author
* **Doğan Öztürk** - [Github](https://github.com/doganozturk)
