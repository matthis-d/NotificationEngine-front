/*global define*/

define([
    'underscore',
    'backbone',
    'app'

], function (_, Backbone, App) {
    'use strict';

    var StatsForDaysModel = Backbone.Model.extend({
        defaults: {
            date: new Date(),
            count: 0
        },

        parse: function(response) {

            var result = response;

            var stringDate = response.date;
            var arrayDate = stringDate.split('-');

            //In the month, because of JavaScript date month, we have to put -1 to get the real month
            result.date = new Date(arrayDate[0], arrayDate[1]-1, arrayDate[2]);

            return result;
        },

        getDate: function() {
            return this.get('date');
        },

        getDateToString: function() {

            return this.getDate().toLocaleDateString();

        },

        getCount: function() {

            return this.get('count');
        }


    });

    return StatsForDaysModel;
});