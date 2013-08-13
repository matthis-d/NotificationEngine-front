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

        template: 'create-raw-notification',

        className: 'col-12 col-lm-12 col-sm-12',

        events: {
            'submit form': 'createRawNotification'
        },

        createRawNotification: function(e) {

            e.preventDefault();

            var $form = this.$el.find('form');

            $form.parsley();

            if($form.parsley('isValid')) {

                var topic = $form.find('#inputTopic').val();
                var subject = $form.find('#inputSubject').val();
                var content = $form.find('#inputContent').val();
                var date = new Date();

                var stringDate = this.dateToString(date);

                var context = {};
                context.subject = subject;
                context.content = content;
                context.date = stringDate;

                var data = {};
                data.topic = topic;
                data.context = context;

                data = JSON.stringify(data);

                $.ajax({

                    url: config.serverUrl + '/rawNotification.do',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: data

                }).done(function() {

                    Backbone.history.navigate('#/stats');

                })
                .fail(function() {
                    alert('There was a mistake while sending data');
                });

            } else {

                alert('you have to fill all fields');

            }

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

        },

        dateToString: function(date) {

            var result = '';

            result += date.getDate();
            result += '/';
            result += (date.getMonth() + 1);
            result += '/';
            result += date.getFullYear();

            return result;

        }


    });

    return CreateRawNotificationView;

});