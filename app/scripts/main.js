/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'app',
    'models/count-model',
    'collections/count-collection',
    'collections/topic-collection',
    'views/counts-composite-view',
    'views/topics-composite-view',
    'views/chart-view',
    'mustache',
    'bootstrap',
    'marionette',
    'templates'

], function ($, Backbone, App, CountModel, CountCollection, TopicCollection, CountsCompositeView, TopicsCompositeView, ChartView, Mustache) {
    Backbone.history.start();

    var apiUrl = 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT';

    $('.left-menu').affix({
        offset: {
            top: 200,
            bottom: 10
        }
    });

    Backbone.Marionette.Renderer.render = function (template, data) {
        //Use JST
        if (!JST[template]) throw "Template '" + template + "' not found!";
        return Mustache.render(JST[template], data);
    };

    var allRawNotifs = new CountModel({
        apiUrl: apiUrl
    }).countAllRawNotifications();

    var allDecoratedNotifs = new CountModel({
        apiUrl: apiUrl
    }).countAllDecoratedNotifications();

    var facturationRawNotifs = new CountModel({
        apiUrl: apiUrl
    }).countRawNotificationsForTopic('facturation');

    var facturationDecoratedNotifs = new CountModel({
        apiUrl: apiUrl
    }).countDecoratedNotificationsForTopic('facturation');

    var helpdeskRawNotifs = new CountModel({
        apiUrl: apiUrl
    }).countRawNotificationsForTopic('helpdesk');

    var helpdeskDecoratedNotifs = new CountModel({
        apiUrl: apiUrl
    }).countDecoratedNotificationsForTopic('helpdesk');

    var notProcessedRawNotifs = new CountModel({
        apiUrl: apiUrl
    }).countNotProcessedRawNotifications();

    var notSentDecoratedNotifs = new CountModel({
        apiUrl: apiUrl
    }).countNotSentDecoratedNotifications();

    var deletedDecoratedNotifs = new CountModel({
        apiUrl: apiUrl
    }).countDeletedDecoratedNotifications();


    $.when(allRawNotifs.fetch(),
            allDecoratedNotifs.fetch(),
            facturationRawNotifs.fetch(),
            facturationDecoratedNotifs.fetch(),
            helpdeskRawNotifs.fetch(),
            helpdeskDecoratedNotifs.fetch(),
            notProcessedRawNotifs.fetch(),
            notSentDecoratedNotifs.fetch(),
            deletedDecoratedNotifs.fetch()
        ).done(function () {

            var countCollection = new CountCollection(
                [allRawNotifs, notProcessedRawNotifs,
                    allDecoratedNotifs, notSentDecoratedNotifs,
                    facturationRawNotifs, facturationDecoratedNotifs,
                    helpdeskRawNotifs, helpdeskDecoratedNotifs,
                    deletedDecoratedNotifs]
            );

            var countProcessedNotifs = allRawNotifs.getCount() - notProcessedRawNotifs.getCount();

            var processedRawNotifs = new CountModel({
                count: countProcessedNotifs,
                objectName: 'Processed Raw Notifs'
            });

            var rawNotifsForChart = new CountCollection([processedRawNotifs, notProcessedRawNotifs]);

            var countsCompositeView = new CountsCompositeView({
                collection: countCollection
            });

            var rawNotifsChartView = new ChartView();
            rawNotifsChartView.drawChart(rawNotifsForChart, 'charts', 'Processed / Not Processed Raw Notifs');


            var countSentDecoratedNotifs = allDecoratedNotifs.getCount() - notSentDecoratedNotifs.getCount();

            var sentDecoratedNotifs = new CountModel({
                count: countSentDecoratedNotifs,
                objectName: 'Sent Decorated Notifs'
            });

            var decoratedNotifsForChart = new CountCollection([sentDecoratedNotifs, notSentDecoratedNotifs, deletedDecoratedNotifs]);
            var decoratedNotifsChartView = new ChartView();
            decoratedNotifsChartView.drawChart(decoratedNotifsForChart, 'charts2', 'Sent/Not Sent/Deleted Decorated Notifs');

            var rawNotifsByTopicForChart = new CountCollection([helpdeskRawNotifs, facturationRawNotifs]);
            var rawNotifsByTopicChartView = new ChartView();
            rawNotifsByTopicChartView.drawChart(rawNotifsByTopicForChart, 'charts3', 'Facturation / Helpdesk raw notifs');

            var decoratedNotifsByTopicForChart = new CountCollection([helpdeskDecoratedNotifs, facturationDecoratedNotifs]);
            var decoratedNotifsByTopicChartView = new ChartView();
            decoratedNotifsByTopicChartView.drawChart(decoratedNotifsByTopicForChart, 'charts4', 'Facturation / Helpdesk decorated notifs');

            App.counts.show(countsCompositeView);

        });

    var topics = new TopicCollection();
    topics.fetch();

    topics.on('sync', function () {

        var topicsCompositeView = new TopicsCompositeView({
            collection: topics
        });

        App.topics.show(topicsCompositeView);

    });

});