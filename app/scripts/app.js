define([
    'underscore',
    'backbone',
    'marionette'

], function (_, Backbone) {
    'use strict';

    //Create a new Marionette App
    var App = new Backbone.Marionette.Application();

    //Ad create regions
    App.addRegions({
        content: '#main-content',
        modals: '#modals'
    });

    App.getAuthToken = function getAuthToken() {
        var token = sessionStorage.getItem('token');

        return token;
    };

    return App;

});