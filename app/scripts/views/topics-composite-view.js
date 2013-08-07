define([
    'underscore',
    'backbone',
    'views/topic-item-view',
    'marionette',
    'templates'


], function (_, Backbone, TopicItemView) {

    var TopicsCompositeView = Backbone.Marionette.CompositeView.extend({

        itemView: TopicItemView,

        template: 'topics-composite-template',

        itemViewContainer: 'ul'

    });

    return TopicsCompositeView;

});