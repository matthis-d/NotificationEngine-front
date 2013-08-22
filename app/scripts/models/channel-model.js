/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var ChannelModel = Backbone.Model.extend({

        defaults: {
            selectorType : 'mongoDbSelector',
            topic: 'facturation'
        },

        getSelectorType: function() {
            return this.get('selectorType');
        },

        getTopic: function() {
            return this.get('topic');
        }

    });

    return ChannelModel;
});