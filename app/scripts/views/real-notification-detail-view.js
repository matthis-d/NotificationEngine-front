define([
    'underscore',
    'backbone',
    'json!configPath/config.json',
    'marionette',
    'templates'

], function (_, Backbone, config) {

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
        },

        onBeforeRender: function() {

            this.model.set('serverUrl', config.serverUrl);

        }

    });

    return RealNotificationDetailView;

});