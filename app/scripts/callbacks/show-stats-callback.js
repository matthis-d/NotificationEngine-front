define([
    'views/counts-composite-view'

], function (CountsCompositeView) {

    /**
     * A callback function in order to draw stats for a collection that contains counts
     * @param {Object} statsLayout A Marionnette layout in which to draw the chart
     * @param {String} region The region name in which to draw the chart
     * @param {Object} countCollection A backbone collection in order to draw charts
     */
    var showStatsCallback = function(statsLayout, region, countCollection) {

        var countsCompositeView = new CountsCompositeView({
            collection: countCollection
        });

        statsLayout[region].show(countsCompositeView);

    };

    return showStatsCallback;
});