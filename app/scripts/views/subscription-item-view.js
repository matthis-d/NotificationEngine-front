define([
    'underscore',
    'backbone',
    'json!configPath/config.json',
    'marionette',
    'templates'

], function (_, Backbone, config) {

    var SubscriptionItemView = Backbone.Marionette.ItemView.extend({

        template: 'subscription-item',

        tagName: 'tr',

        events: {
            'click icon': 'deleteSubscription'
        },

        deleteSubscription: function(e) {

            e.preventDefault();

            var wantToDelete = confirm('Do you really want to delete this subscription ? ');

            if(wantToDelete) {

                var email = this.model.getEmail();
                var topic = this.model.getTopicName();
                var selectorType = this.model.getSelectorType();

                var url = config.serverUrl + '/subscription.do?';
                url += 'topic=' + topic;
                url += '&email=' + email;
                url += '&selector=' + selectorType;


                $.ajax({
                    type: 'DELETE',
                    url: url

                }).done( function() {
                    Backbone.history.navigate('#/subscriptions/' + selectorType, true);
                })
                .fail( function() {
                    alert('There was a mistake while deleting the subscription');
                });

            }

        }

    });

    return SubscriptionItemView;

});