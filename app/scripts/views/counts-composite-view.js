define([
    'underscore',
    'backbone',
    'views/count-item-view',
    'marionette',
    'templates'


], function (_, Backbone, CountItemView) {
    'use strict';

    var CountsCompositeView = Backbone.Marionette.CompositeView.extend({

        itemView: CountItemView,

        template: 'counts-composite-template',

        itemViewContainer: 'tbody'

    });

    return CountsCompositeView;

});