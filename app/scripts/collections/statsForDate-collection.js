/*global define*/

define([
    'underscore',
    'backbone',
    'models/statsForDate-model'
], function (_, Backbone, StatsfordateModel) {
    'use strict';

    var StatsfordateCollection = Backbone.Collection.extend({
        model: StatsfordateModel
    });

    return StatsfordateCollection;
});