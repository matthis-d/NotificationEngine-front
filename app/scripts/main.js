/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'app',
    'controllers/main-controller',
    'routers/main-router',
    'routers/subscription-router',
    'controllers/subscription-controller',
    'mustache',
    'bootstrap',
    'marionette',
    'templates'

], function ($, Backbone, App, MainController, MainRouter, SubscriptionRouter, SubscriptionController, Mustache) {

    $('#reload').click( function(e){
        e.preventDefault();
        window.location.reload();
    });

    Backbone.Marionette.Renderer.render = function (template, data) {
        //Use JST
        if (!JST[template]) throw "Template '" + template + "' not found!";
        return Mustache.render(JST[template], data);
    };

    var mainController = new MainController();

    var mainRouter = new MainRouter({controller: mainController});

    var subscriptionController = new SubscriptionController();

    new SubscriptionRouter({controller: subscriptionController});

    Backbone.history.start();

    $('.left-menu').affix({
        offset: {
            top: 200,
            bottom: 10
        }
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