define([
    'views/counts-composite-view'

], function (CountsCompositeView) {

    var showStatsCallback = function(statsLayout, region, countCollection) {

        var countsCompositeView = new CountsCompositeView({
            collection: countCollection
        });

        statsLayout[region].show(countsCompositeView);

    };

    return showStatsCallback;
});