/*global define*/

define([
    'underscore',
    'backbone',
    'models/count-model'

], function (_, Backbone, CountModel) {
    'use strict';

    var CountCollection = Backbone.Collection.extend({

        model: CountModel,

        fetchAllModels: function() {

            //We fetch all models from the collection and return an array of Deferred Objects

            var fetches = [];

            this.each(function(countModel) {

                fetches.push(countModel.fetch());

            });

            return fetches;

        }
        
    });

    return CountCollection;
});