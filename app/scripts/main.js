/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'app',
    'models/count-model',
    'models/statsForDays-model',
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

], function ($, Backbone, App,
             CountModel, StatsForDaysModel, CountCollection, TopicCollection,
             CountsCompositeView, TopicsCompositeView, ChartView,
             TopicStatsLayout, TopicSearchView,
             showStatsCallback, Mustache) {


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

            showStatsCallback(App,'counts',countCollection);

        });


    var statsForDays = new StatsForDaysModel().countCreatedRawNotifications();

    $.when(statsForDays.fetch()).done(function() {


        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004',  1000,      400],
            ['2005',  1170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      540]
        ]);

        var options = {
            title: 'Company Performance'
        };

        var chart = new google.visualization.LineChart(document.getElementById('charts5'));
        chart.draw(data, options);

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