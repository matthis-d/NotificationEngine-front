/*global define*/

define([
    'underscore',
    'backbone',
    'models/topic-model'
], function (_, Backbone, TopicModel) {
    'use strict';

    var TopicCollection = Backbone.Collection.extend({
        model: TopicModel,

        url: 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT/topics.do'

    });

    return TopicCollection;
});