define([
    'underscore',
    'backbone',
    'views/real-notification-detail-view',
    'marionette'

], function (_, Backbone, RealNotificationDetailView) {

    var RealNotificationsCollectionView = Backbone.Marionette.CollectionView.extend({

        itemView: RealNotificationDetailView

    });

    return RealNotificationsCollectionView;

});