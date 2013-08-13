/*global define*/

define([
    'underscore',
    'backbone',
    'models/statsForDate-model',
    'json!configPath/config.json'
    
], function (_, Backbone, StatsForDateModel, config) {
    'use strict';

    var StatsForDaysCollection = Backbone.Collection.extend({
        model: StatsForDateModel,

        name: 'Created Row Notifications',

        countCreatedRawNotifications: function() {

            this.url = config.serverUrl + '/countCreatedRawNotificationsForLastDays.do?days=30';
            this.name = 'Created Row Notifications';
            return this;

        },

        countProcessedRawNotifications: function() {

            this.url = config.serverUrl + '/countProcessedRawNotificationsForLastDays.do?days=30';
            this.name = 'Processed Row Notifications';
            return this;

        },

        countRawNotificationsForLastDaysWithTopic: function(topic) {

            this.url = config.serverUrl + '/countRawNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Created Raw Notifications'
            return this;

        },

        countProcessedRawNotificationsForLastDaysWithTopic: function(topic) {

            this.url = config.serverUrl + '/countProcessedRawNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Processed Raw Notifications'
            return this;

        },

        countCreatedDecoratedNotifications: function() {

            this.url = config.serverUrl + '/countCreatedDecoratedNotificationsForLastDays.do?days=30';
            this.name = 'Created Decorated Notifications';
            return this;

        },

        countSentDecoratedNotifications: function() {

            this.url = config.serverUrl + '/countSentDecoratedNotificationsForLastDays.do?days=30';
            this.name = 'Sent Decorated Notifications';
            return this;

        },

        countCreatedDecoratedNotificationsForLastDaysWithTopic: function(topic) {

            this.url = config.serverUrl + '/countCreatedDecoratedNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Created Decorated Notifications'
            return this;

        },

        countSentDecoratedNotificationsForLastDaysWithTopic: function(topic) {

            this.url = config.serverUrl + '/countSentDecoratedNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Sent Decorated Notifications'
            return this;

        },

        comparator: function(model) {
            return model.getDate();
        }
    });

    return StatsForDaysCollection;
});