define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'views/all-stats-layout',
    'models/count-model',
    'collections/count-collection',
    'collections/statsForDate-collection',
    'collections/topic-collection',
    'models/error-model',
    'views/error-view',
    'views/pie-view',
    'views/line-chart-view',
    'views/topic-search-view',
    'views/topics-composite-view',
    'views/topic-stats-layout',
    'callbacks/show-stats-callback',
    'callbacks/show-charts-callback',
    'callbacks/get-counts-for-topic-callback',
    'callbacks/get-counts-for-topic-date-callback',
    'marionette',
    'templates'

], function ($, _, Backbone, App, AllStatsLayout,
             CountModel, CountCollection,
             StatsForDateCollection, TopicCollection,
             ErrorModel, ErrorView,
             PieView, LineChartView,
             TopicSearchView, TopicsCompositeView, TopicStatsLayout,
             showStatsCallback, showChartsCallback, getCountsForTopicCallback, getCountsForTopicAndDateCallback
    ) {

    var MainController = Backbone.Marionette.Controller.extend({


        //Functions associated to a route
        stats: function() {

            var allStatsLayout = new AllStatsLayout();

            App.content.show(allStatsLayout);

            this.showGlobalStatsAndCharts(allStatsLayout);

            this.showTimeChart();

            this.showTopicsAndRepartition(allStatsLayout);

        },

        createRawNotification: function() {

            App.content.show(new Backbone.Marionette.View());
        },

        //Other functions
        showGlobalStatsAndCharts: function(layout) {

            var allRawNotifs = new CountModel().countAllRawNotifications();

            var allDecoratedNotifs = new CountModel().countAllDecoratedNotifications();

            var notProcessedRawNotifs = new CountModel().countNotProcessedRawNotifications();

            var notSentDecoratedNotifs = new CountModel().countNotSentDecoratedNotifications();

            var deletedDecoratedNotifs = new CountModel().countDeletedDecoratedNotifications();

            var countCollection = new CountCollection(
                [allRawNotifs, notProcessedRawNotifs,
                    allDecoratedNotifs, notSentDecoratedNotifs,
                    deletedDecoratedNotifs]
            );

            $.when.apply($, countCollection.fetchAllModels())
                .done(function () {

                    var countProcessedNotifs = allRawNotifs.getCount() - notProcessedRawNotifs.getCount();

                    var processedRawNotifs = new CountModel({
                        count: countProcessedNotifs,
                        objectName: 'Processed Raw Notifs'
                    });

                    var rawNotifsForChart = new CountCollection([processedRawNotifs, notProcessedRawNotifs]);

                    var rawNotifsChartView = new PieView();
                    rawNotifsChartView.drawPie(rawNotifsForChart, 'charts', 'Processed / Not Processed Raw Notifs');


                    var countSentDecoratedNotifs = allDecoratedNotifs.getCount() - notSentDecoratedNotifs.getCount();

                    var sentDecoratedNotifs = new CountModel({
                        count: countSentDecoratedNotifs,
                        objectName: 'Sent Decorated Notifs'
                    });

                    var decoratedNotifsForChart = new CountCollection([sentDecoratedNotifs, notSentDecoratedNotifs, deletedDecoratedNotifs]);
                    var decoratedNotifsChartView = new PieView();
                    decoratedNotifsChartView.drawPie(decoratedNotifsForChart, 'charts2', 'Sent/Not Sent/Deleted Decorated Notifs');

                    showStatsCallback(layout,'counts',countCollection);

                })
                .fail(this.showErrorMessage);

        },

        showErrorMessage: function() {

            var errorModel = new ErrorModel();
            errorModel.setMessage('The server is not available');

            var errorView = new ErrorView({
                model: errorModel
            });

            App.content.show(errorView);

        },

        showTimeChart: function() {

            var createdRowNotifsFor30days = new StatsForDateCollection().countCreatedRawNotifications();
            var processedRowNotifsFor30days = new StatsForDateCollection().countProcessedRawNotifications();
            var createdDecoratedNotifsFor30days = new StatsForDateCollection().countCreatedDecoratedNotifications();
            var sentDecoratedNotifsFor30days = new StatsForDateCollection().countSentDecoratedNotifications();

            $.when(createdRowNotifsFor30days.fetch(),
                    processedRowNotifsFor30days.fetch(),
                    createdDecoratedNotifsFor30days.fetch(),
                    sentDecoratedNotifsFor30days.fetch()
                ).done(function() {

                    var data = [createdRowNotifsFor30days, processedRowNotifsFor30days,
                        createdDecoratedNotifsFor30days, sentDecoratedNotifsFor30days];

                    var lineChartView = new LineChartView();
                    lineChartView.drawLineChart(data, 'charts5', 'Stats for last 30 days');

                });

        },

        showTopicsAndRepartition: function(layout) {
            var topics = new TopicCollection();
            topics.fetch();

            var self = this;

            topics.on('sync', function () {

                var mainTopics = topics.getMainTopicNames();

                var allRawNotifsFromTopics = new CountCollection();

                _.each(mainTopics, function(topic) {

                    var rawNotifs = new CountModel().countRawNotificationsForTopic(topic);

                    allRawNotifsFromTopics.add(rawNotifs);

                });

                $.when.apply($, allRawNotifsFromTopics.fetchAllModels()).done(function() {

                    var topicsPieChartView = new PieView();
                    topicsPieChartView.drawPie(allRawNotifsFromTopics, 'topics-repartition', 'Topics repartition');
                });

                self.showTopicSearch(layout, topics);

            });
        },

        showTopicSearch: function(layout, topics) {

            var topicStatsLayout = new TopicStatsLayout();

            var topicSearchView = new TopicSearchView({
                collection: topics
            });

            layout.topicStats.show(topicStatsLayout);

            topicStatsLayout.search.show(topicSearchView);

            var topicsCompositeView = new TopicsCompositeView({
                collection: topics
            });

            layout.topics.show(topicsCompositeView);

            topicSearchView.on('topic-search:ok', function(args) {

                var view = args.view;

                var topic = view.$el.find('#topics-input').val();

                getCountsForTopicCallback(topic, function(results) {

                    showStatsCallback(topicStatsLayout, 'results', results);
                });

                getCountsForTopicAndDateCallback(topic, function(collections){

                    showChartsCallback(topicStatsLayout, 'charts', collections);
                });

            });

        }



    });

    return MainController;

});