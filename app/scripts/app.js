define([
    'underscore',
    'backbone',
    'marionette'

], function (_, Backbone) {

    var App = new Backbone.Marionette.Application();

    App.addRegions({
        counts: '#counts',
        topics: '#topics',
        charts: '#charts'
    });

    return App;

});