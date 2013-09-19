define([
    'underscore',
    'backbone',
    'config',
    'marionette',
    'bootstrap',
    'templates'

], function (_, Backbone) {

    var DecoratedNotificationItemView = Backbone.Marionette.ItemView.extend({

        template: 'decorated-notification-item',

        tagName: 'tr'

    });

    return DecoratedNotificationItemView;

});