define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var TopicItemView = Backbone.Marionette.ItemView.extend({

        template: 'topic-item-template',

        tagName: 'tr'

    });

    return TopicItemView;

});