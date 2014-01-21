/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var RealNotificationModel = Backbone.Model.extend({

        defaults: {
            sentAt : new Date(),
            recipient: {
                displayName: 'John Doe',
                email: 'john@doe.com'
            },
            subject: 'Default notification',
            notificationContent: 'This is a default notification',
            filesAttached: []
        },

        parse: function (response) {

            var model = response,
                sentAtTime = model.sentAt,
                sentAtDate = new Date(sentAtTime),
                sentAtString = sentAtDate.toLocaleDateString();

            model.sentAt = sentAtString;

            return model;

        },

        getRecipient: function () {
            return this.get('recipient');
        },

        getDisplayName: function () {
            return this.getRecipient().displayName;
        },

        getEmail: function () {
            return this.getRecipient().email;
        },

        getSentAt: function () {
            return this.get('sentAt');
        },

        getSubject: function () {
            return this.get('subject');
        },

        getNotificationContent: function () {
            return this.get('notificationContent');
        },

        getFilesAttached: function () {
            return this.get('filesAttached');
        }

    });

    return RealNotificationModel;
});