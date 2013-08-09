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
    'views/topic-stats-layout',
    'views/topic-search-view',
    'callbacks/show-stats-callback',
    'mustache',
    'bootstrap',
    'typeahead',
    'marionette',
    'templates'

], function ($, Backbone, App, CountModel, CountCollection, TopicCollection, CountsCompositeView, TopicsCompositeView, ChartView, TopicStatsLayout, TopicSearchView, showStatsCallback, Mustache) {
    Backbone.history.start();

    App.apiUrl = 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT';

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
        apiUrl: App.apiUrl
    }).countAllRawNotifications();

    var allDecoratedNotifs = new CountModel({
        apiUrl: App.apiUrl
    }).countAllDecoratedNotifications();

    var notProcessedRawNotifs = new CountModel({
        apiUrl: App.apiUrl
    }).countNotProcessedRawNotifications();

    var notSentDecoratedNotifs = new CountModel({
        apiUrl: App.apiUrl
    }).countNotSentDecoratedNotifications();

    var deletedDecoratedNotifs = new CountModel({
        apiUrl: App.apiUrl
    }).countDeletedDecoratedNotifications();


    $.when(allRawNotifs.fetch(),
            allDecoratedNotifs.fetch(),
            notProcessedRawNotifs.fetch(),
            notSentDecoratedNotifs.fetch(),
            deletedDecoratedNotifs.fetch()
        ).done(function () {

            var countCollection = new CountCollection(
                [allRawNotifs, notProcessedRawNotifs,
                    allDecoratedNotifs, notSentDecoratedNotifs,
                    deletedDecoratedNotifs]
            );

            var countProcessedNotifs = allRawNotifs.getCount() - notProcessedRawNotifs.getCount();

            var processedRawNotifs = new CountModel({
                count: countProcessedNotifs,
                objectName: 'Processed Raw Notifs'
            });

            var rawNotifsForChart = new CountCollection([processedRawNotifs, notProcessedRawNotifs]);

            /*var countsCompositeView = new CountsCompositeView({
                collection: countCollection
            });*/

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

            //App.counts.show(countsCompositeView);

            showStatsCallback(App,'counts',countCollection);

        });

    var topics = new TopicCollection();
    topics.fetch();

    topics.on('sync', function () {

        App.topicStatsLayout = new TopicStatsLayout();

        var topicSearchView = new TopicSearchView({
            collection: topics
        });

        App.topicStats.show(App.topicStatsLayout);

        App.topicStatsLayout.search.show(topicSearchView);

        var topicsCompositeView = new TopicsCompositeView({
            collection: topics
        });

        App.topics.show(topicsCompositeView);

    });

});