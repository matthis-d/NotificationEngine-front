/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'app',
    'models/count-model',
    'bootstrap'
    
], function ($, Backbone, App, CountModel) {
    Backbone.history.start();

    console.log('hello');

    var apiUrl = 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT';

    $('.left-menu').affix({
        offset: {
            top: 200,
            bottom: 10
        }
    });

    var countModel = new CountModel({
        apiUrl: apiUrl
    });

    countModel = countModel.countDecoratedNotificationsForTopic('facturation');

    console.log(countModel);

    $.when(countModel.fetch()).done(function() {
        console.log('count:'  + countModel.getCount());
        console.log('topicName: ' + countModel.getTopicName());
    });



});