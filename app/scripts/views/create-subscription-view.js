define([
    'jquery',
    'underscore',
    'backbone',
    'json!configPath/config.json',
    'marionette',
    'typeahead',
    'parsley'

], function($, _, Backbone, config) {

    var CreateRawNotificationView = Backbone.Marionette.ItemView.extend({

        template: 'create-subscription',

        events: {
            'click #submit': 'createSubscription'
        },

        createSubscription: function(e) {

            e.preventDefault();

            var $form = this.$el.find('form');

            $form.parsley();

            if($form.parsley('isValid')) {

                var topic = $form.find('#inputTopic').val();
                var recipient = $form.find('#inputEmail').val();
                var displayName = $form.find('#inputName').val();

                var selectorType = this.model.getSelectorType();

                var data = {
                    topic: topic,
                    recipient: recipient,
                    displayName: displayName
                };

                data = JSON.stringify(data);

                var url = config.serverUrl + '/subscription.do?selector=' + selectorType;

                $.ajax({
                    type: 'PUT',
                    contentType: 'application/json',
                    url: url,
                    data: data

                }).done(function() {
                    alert('Your subscription has been registered');

                    Backbone.history.navigate('#/subscriptions/' + selectorType, true);

                }).fail(function() {
                    alert('An issue occurred when saving the subscription');
                });

            } else {

                alert('you have to fill all fields');

            }

        },

        clearForm: function() {

            var inputs = this.$el.find('input');

            _.each(inputs, function(input) {
                $(input).val('');
            });

        },

        onRender: function() {

            var allTopics = new Array();

            for(var i = 0; i<5; i++) {
                this.collection.each(function(topic){
                    allTopics.push(topic.getParentLevel(i));
                });
            }
            //We use this to remove double identical values
            allTopics = _.uniq(allTopics);

            this.$el.find('#inputTopic').typeahead({
                name: 'topics',
                local: allTopics
            });

        }


    });

    return CreateRawNotificationView;

});