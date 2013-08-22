/*global define*/

define([
    'underscore',
    'backbone',
    'models/selector-model',
    'json!configPath/config.json'

], function (_, Backbone, SelectorModel, config) {
    'use strict';

    var SelectorCollection = Backbone.Collection.extend({

        model: SelectorModel,

        url: function() {
            return config.serverUrl + '/getSelectors.do';
        },

        getWriteEnabledSelectors: function() {
            return this.where({isSelectorWriteEnabled: true});
        }
        
    });

    return SelectorCollection;
});