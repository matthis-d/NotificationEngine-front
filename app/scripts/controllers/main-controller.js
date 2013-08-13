define([
    'backbone',
    'marionette'

], function (Backbone) {

    var MainController = Backbone.Marionette.Controller.extend({

        stats: function() {

            console.log('show stats');
        },

        createRawNotification: function() {

            console.log('new-raw');
        }

    });

    return MainController;

});