/*global define*/

define([
    'underscore',
    'backbone',
    'models/decoratedNotification-model',
    'json!configPath/config.json'

], function (_, Backbone, DecoratedNotificationModel, config) {
    'use strict';

    var DecoratedNotificationCollection = Backbone.Collection.extend({

        model: DecoratedNotificationModel,

        url: function() {
            return config.serverUrl + '/getDecoratedNotifications.do';
        },

        getNotificationsForEmail: function(email) {

            this.url = function() {
                return config.serverUrl + '/getDecoratedNotifications.do?email=' + email;
            };

            return this;
        },

        getLimitedNumberNotificationsForEmail: function(number, email) {

            this.url = function() {
                return config.serverUrl + '/getDecoratedNotifications.do?email=' + email + '&number=' + number;
            };

            return this;
        },

        getLimitedNumberNotifications: function(number) {

            this.url = function() {
                return config.serverUrl + '/getDecoratedNotifications.do?number=' + number;
            };

            return this;
        }
        
    });

    return DecoratedNotificationCollection;
});