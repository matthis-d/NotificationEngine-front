define([
    'views/line-chart-view'

], function (LineChartView) {

    var showChartsCallback = function(statsLayout, region, collections) {

        var lineChartView = new LineChartView();

        lineChartView.drawLineChart(collections, 'topic-charts' ,'last 30 days');

    };

    return showChartsCallback;
});