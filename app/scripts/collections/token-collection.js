/*global define*/

define([
    'underscore',
    'backbone',
    'models/token-model',
    'json!configPath/config.json'

], function (_, Backbone, TokenModel, config) {
    'use strict';

    var TokenCollection = Backbone.Collection.extend({
        model: TokenModel,

        url: function () {
            return config.serverUrl + '/tokens.do';
        }
    });

    return TokenCollection;

});