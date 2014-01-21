/*global define*/

define([
    'underscore',
    'backbone',
    'models/subscription-model',
    'json!configPath/config.json'

], function (_, Backbone, SubscriptionModel, config) {
    'use strict';

    var SubscriptionCollection = Backbone.Collection.extend({

        model: SubscriptionModel,

        getSubscriptionsForSelector: function (selectorType) {

            this.url = config.serverUrl + '/getSubscriptions.do?selector=' + selectorType;

            return this;
        }
        
    });

    return SubscriptionCollection;
});