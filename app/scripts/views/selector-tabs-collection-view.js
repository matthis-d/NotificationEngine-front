define([
    'jquery',
    'underscore',
    'backbone',
    'views/selector-tab-title-item-view',
    'marionette'

], function ($, _, Backbone, SelectorTabTitleItemView) {

    var SelectorTabsCollectionView = Backbone.Marionette.CollectionView.extend({

        itemView: SelectorTabTitleItemView,

        tagName: 'ul',

        className: 'nav nav-tabs',

        events: {
            'click li a': 'selectTab'
        },

        selectTab: function(e) {

            var $target = $(e.currentTarget);

            this.$el.find('li').removeClass('active');

            $target.parent().addClass('active');

        }

    });

    return SelectorTabsCollectionView;


});