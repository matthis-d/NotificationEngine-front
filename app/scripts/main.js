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
    'mustache',
    'bootstrap',
    'marionette',
    'templates'
    
], function ($, Backbone, App, CountModel, CountCollection, TopicCollection, CountsCompositeView, TopicsCompositeView, Mustache) {
    Backbone.history.start();

    console.log('hello');

    var apiUrl = 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT';

    $('.left-menu').affix({
        offset: {
            top: 200,
            bottom: 10
        }
    });

    Backbone.Marionette.Renderer.render = function(template, data){
        //Use JST
        if (!JST[template]) throw "Template '" + template + "' not found!";
        return Mustache.render(JST[template],data);
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
        ).done(function() {

        var countCollection = new CountCollection(
            [allRawNotifs, notProcessedRawNotifs,
            allDecoratedNotifs, notSentDecoratedNotifs,
            facturationRawNotifs, facturationDecoratedNotifs,
            helpdeskRawNotifs, helpdeskDecoratedNotifs,
            deletedDecoratedNotifs]
        );

        var countsCompositeView = new CountsCompositeView({
            collection: countCollection
        });

        App.counts.show(countsCompositeView);


    });

    var topics = new TopicCollection();
    topics.fetch();

    topics.on('sync', function() {

        var topicsCompositeView = new TopicsCompositeView({
            collection: topics
        });

        App.topics.show(topicsCompositeView);

    });



});