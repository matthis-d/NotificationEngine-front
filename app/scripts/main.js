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
    'routers/login-router',
    'controllers/login-controller',
    'mustache',
    'bootstrap',
    'marionette',
    'templates'

], function ($, Backbone, App, MainController, MainRouter, SubscriptionRouter, SubscriptionController,
             LoginRouter, LoginController, Mustache) {

    //Button to reload page
    $('#reload').click(function (e) {
        e.preventDefault();
        window.location.reload();
    });

    //Define a renderer with Mustache
    Backbone.Marionette.Renderer.render = function (template, data) {
        //Use JST
        if (!JST[template]) {
            throw "Template '" + template + "' not found!";
        }
        return Mustache.render(JST[template], data);
    };

    //Initialize the main controller and the main view
    var mainController = new MainController(),
        subscriptionController = new SubscriptionController(),
        loginController = new LoginController();

    //Define the main router
    new MainRouter({controller: mainController});

    //Define a specific router for the subscriptions
    new SubscriptionRouter({controller: subscriptionController});

    //Define the login controller
    new LoginRouter({controller: loginController});

    //Lauch Backbone history to be able to go back
    Backbone.history.start();

    // Add an header in each request made to the server
    $(document).ajaxSend(function (event, request) {
        var token = App.getAuthToken();
        if (token) {
            request.setRequestHeader("token", token);
        }
    });

    // Add a default error handling
    $(document).ajaxError(function () {
        Backbone.history.navigate('#/login');
    });

    //Use affix to have a static menu on the left
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

        //define the renderer with 
        Backbone.Marionette.Renderer.render = function (template, data) {
            //Use JST
            if (!JST[template]) {
                throw "Template '" + template + "' not found!";
            }
            return Mustache.render(JST[template], data);
        };

        var errorModel = new ErrorModel(),
            errorView = new ErrorView({model: errorModel});

        App.content.show(errorView);

    });

});