/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var SelectorModel = Backbone.Model.extend({

        defaults: {
            selectorType : 'mongoDbSelector',
            isSelectorWriteEnabled: false
        },

        getSelectorType: function () {
            return this.get('selectorType');
        },

        getIsSelectorWriteEnabled: function () {
            return this.get('isSelectorWriteEnabled');
        }

    });

    return SelectorModel;
});