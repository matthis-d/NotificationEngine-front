/*global define*/

define([
    'underscore',
    'backbone',
    'app',
    'models/statsForDate-model'
], function (_, Backbone, App, StatsForDateModel) {
    'use strict';

    var StatsForDaysCollection = Backbone.Collection.extend({
        model: StatsForDateModel,

        name: 'Created Row Notifications',

        countCreatedRawNotifications: function() {

            this.url = App.apiUrl + '/countCreatedRawNotificationsForLastDays.do?days=30';
            this.name = 'Created Row Notifications';
            return this;

        },

        countProcessedRawNotifications: function() {

            this.url = App.apiUrl + '/countProcessedRawNotificationsForLastDays.do?days=30';
            this.name = 'Processed Row Notifications';
            return this;

        },

        countRawNotificationsForLastDaysWithTopic: function(topic) {

            this.url = App.apiUrl + '/countRawNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Created Raw Notifications'
            return this;

        },

        countProcessedRawNotificationsForLastDaysWithTopic: function(topic) {

            this.url = App.apiUrl + '/countProcessedRawNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Processed Raw Notifications'
            return this;

        },

        countCreatedDecoratedNotifications: function() {

            this.url = App.apiUrl + '/countCreatedDecoratedNotificationsForLastDays.do?days=30';
            this.name = 'Created Decorated Notifications';
            return this;

        },

        countSentDecoratedNotifications: function() {

            this.url = App.apiUrl + '/countSentDecoratedNotificationsForLastDays.do?days=30';
            this.name = 'Sent Decorated Notifications';
            return this;

        },

        countCreatedDecoratedNotificationsForLastDaysWithTopic: function(topic) {

            this.url = App.apiUrl + '/countCreatedDecoratedNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Created Decorated Notifications'
            return this;

        },

        countSentDecoratedNotificationsForLastDaysWithTopic: function(topic) {

            this.url = App.apiUrl + '/countSentDecoratedNotificationsForLastDaysWithTopic.do?days=30&topic=' + topic;
            this.name = 'Sent Decorated Notifications'
            return this;

        },

        comparator: function(model) {
            return model.getDate();
        }
    });

    return StatsForDaysCollection;
});