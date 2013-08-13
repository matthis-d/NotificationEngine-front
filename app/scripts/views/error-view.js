define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var ErrorView = Backbone.Marionette.ItemView.extend({

        template: 'error'

    });

    return ErrorView;
});