/*global require*/
'use strict';

// TODO : do some refactoring with the "fetchAllModels" from countCollection

require([
    'jquery',
    'backbone',
    'app',
    'controllers/main-controller',
    'routers/main-router',
    'models/count-model',
    'models/statsForDate-model',
    'collections/count-collection',
    'collections/topic-collection',
    'collections/statsForDate-collection',
    'views/counts-composite-view',
    'views/topics-composite-view',
    'views/pie-view',
    'views/line-chart-view',
    'views/topic-stats-layout',
    'views/topic-search-view',
    'callbacks/show-stats-callback',
    'mustache',
    'models/error-model',
    'views/error-view',
    'bootstrap',
    'typeahead',
    'marionette',
    'templates'

], function ($, Backbone, App, MainController, MainRouter,
             CountModel, StatsForDateModel, CountCollection, TopicCollection, StatsForDateCollection,
             CountsCompositeView, TopicsCompositeView, PieView, LineChartView,
             TopicStatsLayout, TopicSearchView,
             showStatsCallback, Mustache,
             ErrorModel, ErrorView) {

    var mainController = new MainController();

    var mainRouter = new MainRouter({controller: mainController});

    Backbone.history.start();

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

    var allRawNotifs = new CountModel().countAllRawNotifications();

    var allDecoratedNotifs = new CountModel().countAllDecoratedNotifications();

    var notProcessedRawNotifs = new CountModel().countNotProcessedRawNotifications();

    var notSentDecoratedNotifs = new CountModel().countNotSentDecoratedNotifications();

    var deletedDecoratedNotifs = new CountModel().countDeletedDecoratedNotifications();


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

            showStatsCallback(App,'counts',countCollection);

        })
        .fail(function() {

            var errorModel = new ErrorModel();
            errorModel.setMessage('The server is not available');

            var errorView = new ErrorView({
                model: errorModel
            });

            App.content.show(errorView);
        });

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


    var topics = new TopicCollection();
    topics.fetch();

    topics.on('sync', function () {

        //TODO : refactor this part with in a callback
        
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

        // END OF TO-DO



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

}, function () {


    //Function called when there was an error while loading a dependency
    require([
        'jquery',
        'backbone',
        'app',
        'models/error-model',
        'views/error-view',
        'mustache',
        'marionette'

    ], function ($, Backbone, App, ErrorModel, ErrorView, Mustache) {

        Backbone.Marionette.Renderer.render = function (template, data) {
            //Use JST
            if (!JST[template]) throw "Template '" + template + "' not found!";
            return Mustache.render(JST[template], data);
        };

        var errorModel = new ErrorModel();

        var errorView = new ErrorView({
            model: errorModel
        });

        App.content.show(errorView);

    });

});