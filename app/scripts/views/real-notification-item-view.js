define([
    'underscore',
    'backbone',
    'marionette',
    'bootstrap',
    'templates'

], function (_, Backbone) {

    var RealNotificationItemView = Backbone.Marionette.ItemView.extend({

        template: 'real-notification-item',

        tagName: 'tr',

        events: {
            'click button': 'showModal'
        },

        showModal: function(e) {
            e.preventDefault();

            $('#' + this.model.get('id')).modal();
        }

    });

    return RealNotificationItemView;

});