define([
    'underscore',
    'backbone',
    'marionette'

], function (_, Backbone) {
    
    'use strict';

    var App = new Backbone.Marionette.Application();

    App.addRegions({
        content: '#main-content'
    });

    return App;

});