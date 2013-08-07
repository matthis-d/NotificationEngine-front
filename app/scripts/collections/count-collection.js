/*global define*/

define([
    'underscore',
    'backbone',
    'models/count-model'

], function (_, Backbone, CountModel) {
    'use strict';

    var CountCollection = Backbone.Collection.extend({

        model: CountModel
    });

    return CountCollection;
});