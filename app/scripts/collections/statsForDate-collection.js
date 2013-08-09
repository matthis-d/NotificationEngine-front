/*global define*/

define([
    'underscore',
    'backbone',
    'models/statsForDays-model'
], function (_, Backbone, StatsForDateModel) {
    'use strict';

    var StatsForDaysCollection = Backbone.Collection.extend({
        model: StatsForDateModel
    });

    return StatsForDaysCollection;
});