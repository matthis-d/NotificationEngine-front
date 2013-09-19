/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var DecoratedNotificationModel = Backbone.Model.extend({

        defaults: {
            sentAt : new Date()
        }

    });

    return DecoratedNotificationModel;
});