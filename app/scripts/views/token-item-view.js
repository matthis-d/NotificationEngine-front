define([
    'underscore',
    'backbone',
    'json!configPath/config.json',
    'marionette',
    'templates'

], function (_, Backbone, config) {

    var TokenItemView = Backbone.Marionette.ItemView.extend({

        template: 'token-item',

        tagName: 'tr',

        events: {
            'click icon': 'deleteToken'
        },

        deleteToken: function(e) {

            e.preventDefault();

            var wantToDelete = confirm('Do you really want to delete this token ? ');

            if(wantToDelete) {

                var token = this.model.getToken();

                var url = config.serverUrl + '/token.do?';
                url += 'token=' + token;

                $.ajax({
                    type: 'DELETE',
                    url: url

                }).done( function() {
                    Backbone.history.navigate('#/tokens', true);
                })
                .fail( function() {
                    alert('There was a mistake while deleting the token');
                });

            }

        }

    });

    return TokenItemView;

});