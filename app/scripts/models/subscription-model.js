/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var SubscriptionModel = Backbone.Model.extend({

        defaults: {
            displayName : 'John Doe',
            email: 'john@doe.com',
            topic: 'topicName',
            selectorType: 'mongoDbSelector'
        },

        getDisplayName: function () {
            return this.get('displayName');
        },

        getEmail: function () {
            return this.get('email');
        },

        getTopicName: function () {
            return this.get('topic');
        },

        getSelectorType: function () {
            return this.get('selectorType');
        }

    });

    return SubscriptionModel;
});