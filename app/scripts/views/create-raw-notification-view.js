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
            'click #submit': 'createRawNotification',
            'click #add-file': 'showOtherFileInput'
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

                var json = {};
                json.topic = topic;
                json.context = context;

                json = JSON.stringify(json);

                var data = new FormData();
                data.append('json', json);

                data = this.getAllFiles(data);

                $.ajax({

                    url: config.serverUrl + '/rawNotificationWithAttach.do',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false

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

        getAllFiles: function(dataForm) {

            var $fileInputs = this.$el.find('input:file');

            $fileInputs.each(function(index, input) {

                var file = input.files[0];
                //In order to remove fake path
                var fileName = $(input).val().split('\\').pop();

                if(file) {

                    dataForm.append('files[]', file, fileName);
                }

            });

            return dataForm;

        },

        showOtherFileInput: function(e) {

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            var fileInputsNumber = this.$el.find('input[type=file]').length;
            
            var $lastFileInput = this.$el.find('input[type=file]').last();
            
            var $lastFileFormGroup = $lastFileInput.parent().parent();

            var elToAdd = '<div class="form-group">' +
                '<label for="inputFile'+ fileInputsNumber +'" class="col-md-2 control-label">File ' + (fileInputsNumber+1) +'</label>' +
                '<div class="col-md-10">' +
                    '<input type="file" id="inputFile' + fileInputsNumber + '">' +
                    '</div>' +
                '</div>';

            $lastFileFormGroup.after(elToAdd);
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