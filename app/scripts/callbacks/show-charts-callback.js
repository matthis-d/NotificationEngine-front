define([
    'views/line-chart-view'

], function (LineChartView) {
    'use strict';

    /**
     * A callback function to be called in order to draw charts
     * @param {Object} statsLayout A marionnette layout in which the chart has to be drown
     * @param {String} region The region name
     * @param {Object} collections Backbone collections to draw on the chart
     */
    var showChartsCallback = function showChartsCallback(statsLayout, region, collections) {

        var lineChartView = new LineChartView();

        lineChartView.drawLineChart(collections, 'topic-charts', 'last 30 days');

    };

    return showChartsCallback;
});