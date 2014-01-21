define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/count-model',
    'collections/count-collection',
    'marionette'

], function ($, _, Backbone, App, CountModel, CountCollection) {
    'use strict';

    /**     
     * Funtion to get different counts for a topic
     * @param {String} topic The topic name     
     * @param {Function} callback a callback function called when all counts were given
     */
    var getCountsForTopicCallback = function getCountsForTopicCallback(topic, callback) {

        var rawNotifs = new CountModel({apiUrl: App.apiUrl}).countRawNotificationsForTopic(topic),

            decoratedNotifs = new CountModel({apiUrl: App.apiUrl}).countDecoratedNotificationsForTopic(topic),

            notProcessedRawNotifs = new CountModel({apiUrl: App.apiUrl}).countNotProcessedRawNotificationsForTopic(topic),

            notSentDecoratedNotifs = new CountModel({apiUrl: App.apiUrl}).countNotSentDecoratedNotificationsForTopic(topic);

        $.when(rawNotifs.fetch(), decoratedNotifs.fetch(),
            notProcessedRawNotifs.fetch(), notSentDecoratedNotifs.fetch()).done(function () {

            var countCollection = new CountCollection([rawNotifs, notProcessedRawNotifs, decoratedNotifs, notSentDecoratedNotifs]);

            callback(countCollection);
    
        });

    };

    return getCountsForTopicCallback;


});