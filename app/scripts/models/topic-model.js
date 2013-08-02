/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TopicModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return TopicModel;
});