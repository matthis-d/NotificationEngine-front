define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var ErrorModel = Backbone.Model.extend({

        defaults: {
            message: 'You need an internet connection to use this app'
        },

        getMessage: function() {
            return this.get('message');
        },

        setMessage: function(message) {
            this.set('message', message);
        }


    });

    return ErrorModel;
});