define([
    'underscore',
    'backbone',
    'json!configPath/config.json',
    'marionette',
    'templates'

], function (_, Backbone, config) {

    var LoginView = Backbone.Marionette.ItemView.extend({

        template: 'login',

        events: {
            'submit form': 'doLogin'
        },

        doLogin: function (e) {

            e.preventDefault();

            var $form = this.$el.find('form');

            var username = $form.find('#username').val(),
                password = $form.find('#password').val(),
                url = config.serverUrl + '/login.do',
                data = {
                    username: username,
                    password: password
                };


            data = JSON.stringify(data);

            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                contentType: 'application/json'

            }).done(function (token) {

                sessionStorage.setItem('token', token);

                Backbone.history.navigate('#/');

            }).fail(function () {

                alert('Mauvais login et/ou mot de passe');

                Backbone.history.navigate('#/login');
            });
        }
    });

    return LoginView;
});