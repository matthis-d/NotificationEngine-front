define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/count-model',
    'collections/count-collection',
    'marionette'

], function ($, _, Backbone, App, CountModel, CountCollection) {

    var getCountsForTopicCallback = function(topic, callback) {

        var rawNotifs = new CountModel({
            apiUrl: App.apiUrl
        }).countRawNotificationsForTopic(topic);

        var decoratedNotifs = new CountModel({
            apiUrl: App.apiUrl
        }).countDecoratedNotificationsForTopic(topic);

        var notProcessedRawNotifs = new CountModel({
            apiUrl: App.apiUrl
        }).countNotProcessedRawNotificationsForTopic(topic);

        var notSentDecoratedNotifs = new CountModel({
            apiUrl: App.apiUrl
        }).countNotSentDecoratedNotificationsForTopic(topic);

        $.when(rawNotifs.fetch(), decoratedNotifs.fetch(),
            notProcessedRawNotifs.fetch(), notSentDecoratedNotifs.fetch()
        ).done(function() {

            var countCollection = new CountCollection([rawNotifs, notProcessedRawNotifs, decoratedNotifs, notSentDecoratedNotifs]);

            callback(countCollection);

        });

    };

    return getCountsForTopicCallback;


});