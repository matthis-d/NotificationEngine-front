/*global define*/

define([
    'underscore',
    'backbone',
    'models/topic-model'
], function (_, Backbone, TopicModel) {
    'use strict';

    var TopicCollection = Backbone.Collection.extend({
        model: TopicModel
    });

    return TopicCollection;
});