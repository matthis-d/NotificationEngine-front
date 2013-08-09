/*global define*/

define([
    'underscore',
    'backbone',
    'app'

], function (_, Backbone, App) {
    'use strict';

    var StatsForDaysModel = Backbone.Model.extend({
        defaults: {
        },

        url: App.apiUrl + '/countCreatedRawNotificationsForLastDays.do?days=30',

        countCreatedRawNotifications: function() {

            this.url = App.apiUrl + '/countCreatedRawNotificationsForLastDays.do?days=30';
            return this;

        },

        countNotProcessedRawNotifications: function() {

            this.url = App.apiUrl + '/countProcessedRawNotificationsForLastDays.do?days=30';
            return this;

        },

        countCreatedDecoratedNotifications: function() {

            this.url = App.apiUrl + '/countCreatedDecoratedNotificationsForLastDays.do?days=30';
            return this;

        },

        countSentDecoratedNotifications: function() {

            this.url = App.apiUrl + '/countSentDecoratedNotificationsForLastDays.do?days=30';
            return this;

        }
    });

    return StatsForDaysModel;
});