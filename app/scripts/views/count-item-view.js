define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var CountItemView = Backbone.Marionette.ItemView.extend({

        template: 'count-item-template',

        tagName: 'tr'

    });

    return CountItemView;

});