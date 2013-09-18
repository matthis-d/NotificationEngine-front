define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var RealNotificationDetailView = Backbone.Marionette.ItemView.extend({

        template: 'real-notification-detail',

        className: 'modal fade',

        attributes: function() {
            return {
                id: this.model.get('id'),
                tabindex: -1,
                role: 'dialog',
                'aria-labelledby': this.model.get('id'),
                'aria-hidden': true
            }
        }

    });

    return RealNotificationDetailView;

});