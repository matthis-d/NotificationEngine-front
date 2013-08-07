/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CountModel = Backbone.Model.extend({

        defaults: {
            count: 0,
            apiUrl: '',
            objectName: 'Raw Notification',
            requestType: 'all',
            topicName: 'none'
        },

        getCount: function() {
            return this.get('count');
        },

        setCount: function(count) {
            this.set('count', count);
        },

        getApiUrl: function() {
            return this.get('apiUrl');
        },

        setApiUrl: function(apiUrl) {
            this.set('apiUrl', apiUrl);
        },

        getTopicName: function() {
            return this.get('topicName');
        },

        setTopicName: function(topicName) {
            this.set('topicName', topicName);
        },

        getRequestType: function() {
            return this.get('requestType');
        },

        setRequestType: function(requestType) {
            this.set('requestType', requestType);
        },

        getObjectName: function() {
            return this.get('objectName');
        },

        setObjectName: function(objectName) {
            this.set('objectName', objectName);
        },

        countAllRawNotifications: function() {

            this.url = this.getApiUrl() + '/countAllRawNotifications.do';

            this.setObjectName('Raw Notification');
            this.setRequestType('all');
            this.setTopicName('none');

            return this;

        },

        countNotProcessedRawNotifications: function() {

            this.url = this.getApiUrl() + '/countNotProcessedRawNotifications.do';

            this.setObjectName('Raw Notification');
            this.setRequestType('not processed');
            this.setTopicName('none');

            return this;

        },

        countRawNotificationsForTopic: function(topic) {

            this.url = this.getApiUrl() + '/countRawNotificationsForTopic.do';
            this.url += '?topic=' + topic;

            this.setObjectName('Raw Notification');
            this.setRequestType('for topic');
            this.setTopicName(topic);

            return this;

        },

        countNotProcessedRawNotificationsForTopic: function(topic) {

            this.url = this.getApiUrl() + '/countNotProcessedRawNotificationsForTopic.do';
            this.url += '?topic=' + topic;

            this.setObjectName('Raw Notification');
            this.setRequestType('not processed for topic');
            this.setTopicName(topic);

            return this;

        },

        countAllDecoratedNotifications: function() {

            this.url = this.getApiUrl() + '/countAllDecoratedNotifications.do';

            this.setObjectName('Decorated Notification');
            this.setRequestType('all');
            this.setTopicName('none');

            return this;

        },

        countNotSentDecoratedNotifications: function() {

            this.url = this.getApiUrl() + '/countNotSentDecoratedNotifications.do';

            this.setObjectName('Decorated Notification');
            this.setRequestType('not sent');
            this.setTopicName('none');

            return this;
        },

        countDecoratedNotificationsForTopic: function(topic) {

            this.url = this.getApiUrl() + '/countAllDecoratedNotificationsForTopic.do';
            this.url += '?topic=' + topic;

            this.setObjectName('Decorated Notification');
            this.setRequestType('for topic');
            this.setTopicName(topic);

            return this;

        },

        countNotSentDecoratedNotificationsForTopic: function(topic) {

            this.url = this.getApiUrl() + '/countNotSentDecoratedNotifications.do';
            this.url += '?topic=' + topic;

            this.setObjectName('Decorated Notification');
            this.setRequestType('not sent for topic');
            this.setTopicName(topic);

            return this;

        },

        countDeletedDecoratedNotifications: function() {

            this.url = this.getApiUrl() + '/countDeletedDecoratedNotifications.do';

            this.setObjectName('Deleted Decorated Notification');
            this.setRequestType('all');
            this.setTopicName('none');

            return this;
        }



    });

    return CountModel;
});