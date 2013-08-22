define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var SelectorTabTitleItemView = Backbone.Marionette.ItemView.extend({

        template: 'selector-tab-title',

        tagName: 'li'

    });

    return SelectorTabTitleItemView;

});