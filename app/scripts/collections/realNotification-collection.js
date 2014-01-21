/*global define*/

define([
    'underscore',
    'backbone',
    'models/realNotification-model',
    'json!configPath/config.json'

], function (_, Backbone, RealNotificationModel, config) {
    'use strict';

    var RealNotificationCollection = Backbone.Collection.extend({

        model: RealNotificationModel,

        url: function () {
            return config.serverUrl + '/physicalNotifications.do';
        },

        getNotificationsForEmail: function (email) {

            this.url = function () {
                return config.serverUrl + '/physicalNotifications.do?email=' + email;
            };

            return this;
        }
        
    });

    return RealNotificationCollection;
});