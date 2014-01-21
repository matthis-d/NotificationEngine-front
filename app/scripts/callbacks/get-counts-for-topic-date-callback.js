define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'collections/statsForDate-collection',
    'marionette'

], function ($, _, Backbone, App, StatsForDateCollection) {
    'use strict';

    /**
     * Function to get counts a given topic for each last 30 days
     * @param {String} topic The topic name
     * @param {Function} callback A callback called once all once were retrieved
     */
    var getCountsForTopicAndDateCallback = function getCountsForTopicAndDateCallback(topic, callback) {

        var rawNotifs = new StatsForDateCollection().countRawNotificationsForLastDaysWithTopic(topic),
            
            decoratedNotifs = new StatsForDateCollection().countCreatedDecoratedNotificationsForLastDaysWithTopic(topic),
            
            processedRawNotifs = new StatsForDateCollection().countProcessedRawNotificationsForLastDaysWithTopic(topic),
            
            sentDecoratedNotifs = new StatsForDateCollection().countSentDecoratedNotificationsForLastDaysWithTopic(topic);

        $.when(rawNotifs.fetch(), decoratedNotifs.fetch(),
            processedRawNotifs.fetch(), sentDecoratedNotifs.fetch()).done(function () {

            var countsArray = [rawNotifs, processedRawNotifs, decoratedNotifs, sentDecoratedNotifs];

            callback(countsArray);

        });

    };

    return getCountsForTopicAndDateCallback;


});