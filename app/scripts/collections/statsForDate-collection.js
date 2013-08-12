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

        comparator: function(model) {
            return model.getDate();
        }
    });

    return StatsForDaysCollection;
});