define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'collections/statsForDate-collection',
    'marionette'

], function ($, _, Backbone, App, StatsForDateCollection) {

    var getCountsForTopicAndDateCallback = function(topic, callback) {

        var rawNotifs = new StatsForDateCollection().countRawNotificationsForLastDaysWithTopic(topic);

        var decoratedNotifs = new StatsForDateCollection().countCreatedDecoratedNotificationsForLastDaysWithTopic(topic);

        var processedRawNotifs = new StatsForDateCollection().countProcessedRawNotificationsForLastDaysWithTopic(topic);

        var sentDecoratedNotifs = new StatsForDateCollection().countSentDecoratedNotificationsForLastDaysWithTopic(topic);

        $.when(rawNotifs.fetch(), decoratedNotifs.fetch(),
                processedRawNotifs.fetch(), sentDecoratedNotifs.fetch()
            ).done(function() {

                var countsArray = [rawNotifs, processedRawNotifs, decoratedNotifs, sentDecoratedNotifs];

                callback(countsArray);

            });

    };

    return getCountsForTopicAndDateCallback;


});