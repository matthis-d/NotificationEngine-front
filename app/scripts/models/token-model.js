/*global define*/

define([
    'underscore',
    'backbone',
    'moment'
], function (_, Backbone, moment) {
    'use strict';

    var TokenModel = Backbone.Model.extend({

        parse: function (tokenModel) {

            var endOfLife = tokenModel.endOfLife,
                creationDate = tokenModel.creationDate,
                displayCreationDate = moment(creationDate).format('YYYY-MM-D HH:mm:ss'),
                displayEndOfLife = moment(endOfLife).format('YYYY-MM-D HH:mm:ss');

            tokenModel.displayCreationDate = displayCreationDate;
            tokenModel.displayEndOfLife = displayEndOfLife;

            return tokenModel;
        },

        getToken: function () {
            return this.get('token');
        }

    });

    return TokenModel;
});