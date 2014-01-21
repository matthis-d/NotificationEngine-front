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
    'collections/selector-collection',
    'collections/channel-collection',
    'collections/realNotification-collection',
    'collections/decoratedNotification-collection',
    'collections/token-collection',
    'models/error-model',
    'models/selector-model',
    'views/error-view',
    'views/pie-view',
    'views/line-chart-view',
    'views/topic-search-view',
    'views/topics-composite-view',
    'views/topic-stats-layout',
    'views/create-raw-notification-view',
    'views/subscriptions-layout',
    'views/selector-tabs-collection-view',
    'views/real-notifications-composite-view',
    'views/real-notifications-collection-view',
    'views/decorated-notifications-composite-view',
    'views/tokens-composite-view',
    'callbacks/show-stats-callback',
    'callbacks/show-charts-callback',
    'callbacks/get-counts-for-topic-callback',
    'callbacks/get-counts-for-topic-date-callback',
    'marionette',
    'templates'

], function ($, _, Backbone, App, AllStatsLayout,
             CountModel, CountCollection,
             StatsForDateCollection, TopicCollection,
             SelectorCollection, ChannelCollection, RealNotificationCollection, DecoratedNotificationCollection, TokenCollection,
             ErrorModel, SelectorModel, ErrorView,
             PieView, LineChartView,
             TopicSearchView, TopicsCompositeView, TopicStatsLayout,
             CreateRawNotificationView,
             SubscriptionsLayout, SelectorTabsCollectionView,
             RealNotificationCompositeView, RealNotificationsCollectionView,
             DecoratedNotificationCompositeView,
             TokenCompositeView,
             showStatsCallback, showChartsCallback, getCountsForTopicCallback, getCountsForTopicAndDateCallback
    ) {
    'use strict';

    var MainController = Backbone.Marionette.Controller.extend({


        //Functions associated to a route
        stats: function () {

            this.activateLink('stats');

            var allStatsLayout = new AllStatsLayout();

            App.content.show(allStatsLayout);

            this.showGlobalStatsAndCharts(allStatsLayout);

            this.showTimeChart();

            this.showTopicsAndRepartition(allStatsLayout);

        },

        createRawNotification: function () {

            this.activateLink('new-raw');

            var topics = new TopicCollection();
            topics.fetch();

            topics.on('sync', function () {

                var createRawNotificationView = new CreateRawNotificationView({
                    collection: topics
                });

                App.content.show(createRawNotificationView);
            });

        },

        subscriptions: function () {

            this.activateLink('subscriptions');

            var subscriptionsLayout = new SubscriptionsLayout(),
                selectors = new SelectorCollection();

            App.content.show(subscriptionsLayout);

            selectors.fetch();

            selectors.on('sync', function () {

                var selectorTabs = new SelectorTabsCollectionView({
                    collection: selectors
                });

                subscriptionsLayout.tabTitles.show(selectorTabs);

            });

        },

        sentNotifications: function () {

            this.activateLink('sent-notifications');

            var realNotifications = new RealNotificationCollection();

            $.when(realNotifications.fetch()).done(function () {

                var realNotificationsListView = new RealNotificationCompositeView({
                    collection: realNotifications
                }),
                    realNotificationsDetailsView = new RealNotificationsCollectionView({
                        collection: realNotifications
                    });

                App.content.show(realNotificationsListView);

                App.modals.show(realNotificationsDetailsView);

            });

        },

        decoratedNotifications: function () {

            this.activateLink('decorated-notifications');

            var decoratedNotifications = new DecoratedNotificationCollection();

            $.when(decoratedNotifications.fetch()).done(function () {

                var decoratedNotificationsListView = new DecoratedNotificationCompositeView({
                    collection: decoratedNotifications
                });

                App.content.show(decoratedNotificationsListView);

            });

        },

        tokens: function() {

            this.activateLink('tokens');

            var tokens = new TokenCollection();

            $.when(tokens.fetch()).done(function () {

                var tokenCompositeView = new TokenCompositeView({
                    collection: tokens
                });

                App.content.show(tokenCompositeView);

            });

        },

        //Other functions
        showGlobalStatsAndCharts: function (layout) {

            var allRawNotifs = new CountModel().countAllRawNotifications(),
                allDecoratedNotifs = new CountModel().countAllDecoratedNotifications(),
                notProcessedRawNotifs = new CountModel().countNotProcessedRawNotifications(),
                notSentDecoratedNotifs = new CountModel().countNotSentDecoratedNotifications(),
                deletedDecoratedNotifs = new CountModel().countDeletedDecoratedNotifications(),
                countCollection = new CountCollection(
                    [allRawNotifs, notProcessedRawNotifs,
                        allDecoratedNotifs, notSentDecoratedNotifs,
                        deletedDecoratedNotifs]
                );

            $.when.apply($, countCollection.fetchAllModels())
                .done(function () {

                    var countProcessedNotifs = allRawNotifs.getCount() - notProcessedRawNotifs.getCount(),
                        processedRawNotifs = new CountModel({
                            count: countProcessedNotifs,
                            objectName: 'Processed Raw Notifs'
                        }),
                        rawNotifsForChart = new CountCollection([processedRawNotifs, notProcessedRawNotifs]),
                        rawNotifsChartView = new PieView(),
                        countSentDecoratedNotifs = allDecoratedNotifs.getCount() - notSentDecoratedNotifs.getCount(),
                        sentDecoratedNotifs = new CountModel({
                            count: countSentDecoratedNotifs,
                            objectName: 'Sent Decorated Notifs'
                        }),
                        decoratedNotifsForChart = new CountCollection([sentDecoratedNotifs, notSentDecoratedNotifs, deletedDecoratedNotifs]),
                        decoratedNotifsChartView = new PieView();
                    
                    rawNotifsChartView.drawPie(rawNotifsForChart, 'charts', 'Processed / Not Processed Raw Notifs');

                    decoratedNotifsChartView.drawPie(decoratedNotifsForChart, 'charts2', 'Sent/Not Sent/Deleted Decorated Notifs');

                    showStatsCallback(layout, 'counts', countCollection);

                })
                .fail(this.showErrorMessage);

        },

        showErrorMessage: function () {

            var errorModel = new ErrorModel(),
                errorView = new ErrorView({
                    model: errorModel
                });
            
            errorModel.setMessage('The server is not available');

            App.content.show(errorView);

        },

        showTimeChart: function () {

            var createdRowNotifsFor30days = new StatsForDateCollection().countCreatedRawNotifications(),
                processedRowNotifsFor30days = new StatsForDateCollection().countProcessedRawNotifications(),
                createdDecoratedNotifsFor30days = new StatsForDateCollection().countCreatedDecoratedNotifications(),
                sentDecoratedNotifsFor30days = new StatsForDateCollection().countSentDecoratedNotifications();

            $.when(createdRowNotifsFor30days.fetch(),
                    processedRowNotifsFor30days.fetch(),
                    createdDecoratedNotifsFor30days.fetch(),
                    sentDecoratedNotifsFor30days.fetch()).done(function () {

                var data = [createdRowNotifsFor30days, processedRowNotifsFor30days,
                    createdDecoratedNotifsFor30days, sentDecoratedNotifsFor30days],
                    
                    lineChartView = new LineChartView();
                
                lineChartView.drawLineChart(data, 'charts5', 'Stats for last 30 days');

            });

        },

        showTopicsAndRepartition: function (layout) {
            var topics = new TopicCollection(),
                self = this;
            
            topics.fetch();

            topics.on('sync', function () {

                var mainTopics = topics.getMainTopicNames(),
                    allRawNotifsFromTopics = new CountCollection();

                _.each(mainTopics, function (topic) {

                    var rawNotifs = new CountModel().countRawNotificationsForTopic(topic);

                    allRawNotifsFromTopics.add(rawNotifs);

                });

                $.when.apply($, allRawNotifsFromTopics.fetchAllModels()).done(function () {

                    var topicsPieChartView = new PieView();
                    topicsPieChartView.drawPie(allRawNotifsFromTopics, 'topics-repartition', 'Topics repartition');
                });

                self.showTopicSearch(layout, topics);

            });
        },

        showTopicSearch: function (layout, topics) {

            var topicStatsLayout = new TopicStatsLayout(),
                topicSearchView = new TopicSearchView({
                    collection: topics
                }),
                topicsCompositeView = new TopicsCompositeView({
                    collection: topics
                });

            layout.topicStats.show(topicStatsLayout);

            topicStatsLayout.search.show(topicSearchView);

            layout.topics.show(topicsCompositeView);

            // An event is triggered when the user clicks on "OK" new to topic-search
            topicSearchView.on('topic-search:ok', function (args) {

                //args contains the view, its collection and its model
                var view = args.view,

                //we get the value of the input
                    topic = view.$el.find('#topics-input').val();

                //we get stats about this topic
                getCountsForTopicCallback(topic, function (results) {

                    showStatsCallback(topicStatsLayout, 'results', results);
                });

                //display charts from this topic
                getCountsForTopicAndDateCallback(topic, function (collections) {

                    showChartsCallback(topicStatsLayout, 'charts', collections);
                });

            });

        },

        activateLink: function (route) {

            var listElements = $.find('.nav li'),
                link = $.find('.nav a[href="#/' + route + '"]');
            
            _.each(listElements, function (element) {
                $(element).removeClass('active');
            });

            $(link[0]).parent().slice(0, 1).addClass('active');

        }

    });

    return MainController;

});