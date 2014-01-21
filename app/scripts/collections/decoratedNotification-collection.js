/*global define*/

define([
    'underscore',
    'backbone',
    'models/decoratedNotification-model',
    'json!configPath/config.json'

], function (_, Backbone, DecoratedNotificationModel, config) {
    'use strict';

    /**
     * A collection to retrieve and store decorated notifications sent
     * It allows to retrieve all decorated notifications for an email,
     * to get an amount of decorated notifications for an email,
     * and to get an amount of decorated notifications
     */
    var DecoratedNotificationCollection = Backbone.Collection.extend({

        model: DecoratedNotificationModel,

        url: function () {
            return config.serverUrl + '/getDecoratedNotifications.do';
        },

        getNotificationsForEmail: function (email) {

            this.url = function () {
                return config.serverUrl + '/getDecoratedNotifications.do?email=' + email;
            };

            return this;
        },

        getLimitedNumberNotificationsForEmail: function (number, email) {

            this.url = function () {
                return config.serverUrl + '/getDecoratedNotifications.do?email=' + email + '&number=' + number;
            };

            return this;
        },

        getLimitedNumberNotifications: function (number) {

            this.url = function () {
                return config.serverUrl + '/getDecoratedNotifications.do?number=' + number;
            };

            return this;
        }
        
    });

    return DecoratedNotificationCollection;
});