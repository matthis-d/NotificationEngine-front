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

        selectTabFromType: function(selectorType) {

            var $aToActivate = this.$el.find('a[href="#/subscriptions/' + selectorType + '"]').slice(0,1);

            this.$el.find('li').removeClass('active');

            $aToActivate.parent().addClass('active');

        }

    });

    return SelectorTabsCollectionView;


});