define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/count-model',
    'collections/count-collection',
    'collections/topic-collection',
    'collections/selector-collection',
    'collections/channel-collection',
    'models/selector-model',
    'views/pie-view',
    'views/topics-composite-view',
    'views/counts-composite-view',
    'views/subscriptions-layout',
    'views/selector-tabs-collection-view',
    'views/create-subscription-view',
    'marionette',
    'templates'

], function ($, _, Backbone, App,
             CountModel, CountCollection,
             TopicCollection,
             SelectorCollection, ChannelCollection,
             SelectorModel,
             PieView,
             TopicsCompositeView, CountsCompositeView,
             SubscriptionsLayout, SelectorTabsCollectionView, CreateSubscriptionView
    ) {

    var SubscriptionController = Backbone.Marionette.Controller.extend({

        subscriptionsForSelector: function(selectorType) {

            var subscriptionsLayout = new SubscriptionsLayout();

            App.content.show(subscriptionsLayout);

            var selectors = new SelectorCollection();

            var channels = new ChannelCollection();

            var allTopics = new TopicCollection();

            $.when(selectors.fetch(), channels.fetch(), allTopics.fetch()).done(function() {

                var thisSelector = selectors.findWhere({
                    selectorType: selectorType
                });

                //Show list of selectors
                var selectorTabs = new SelectorTabsCollectionView({
                    collection: selectors
                });
                subscriptionsLayout.tabTitles.show(selectorTabs);
                selectorTabs.selectTabFromType(selectorType);

                //Show topics for this selector
                var topicsForSelector = channels.getTopicsForSelector(thisSelector);

                var subTopics = new TopicCollection();
                topicsForSelector.each(function(topic) {
                    var topicName = topic.getName();

                    var topicsToAdd = allTopics.getChildTopics(topicName);
                    topicsToAdd.each(function(topicToAdd){
                        subTopics.add(topicToAdd);
                    });
                });

                subTopics.each(function(subTopic) {
                    topicsForSelector.add(subTopic);
                });

                var topicsView = new TopicsCompositeView({
                    collection: topicsForSelector
                });
                subscriptionsLayout.topicsForSelector.show(topicsView);


                //Show subscriptions stats for this selector (per topic)
                var countCollection = new CountCollection();

                topicsForSelector.each(function(topic) {

                    var topicName = topic.getName();
                    var count = new CountModel().countSubscriptionsForTopicAndSelector(topicName, selectorType);
                    countCollection.add(count);

                });

                $.when.apply($, countCollection.fetchAllModels()).done(function() {

                    var statsTable = new CountsCompositeView({
                        collection: countCollection
                    });

                    subscriptionsLayout.countsByTopic.show(statsTable);

                    // show repartition
                    var title = 'Topics repartition',
                        zoneId = $(subscriptionsLayout.topicRepartition.el).attr('id');
                    
                    var repartitionView = new PieView();
                    repartitionView.drawPie(countCollection, zoneId, title);

                });

                //Show form if selector is write enabled
                if(thisSelector.getIsSelectorWriteEnabled()) {

                    var createSubscriptionView = new CreateSubscriptionView({
                        collection: topicsForSelector,
                        model: thisSelector
                    });

                    subscriptionsLayout.createSubscriptionForm.show(createSubscriptionView);

                }

            });

        }

    });

    return SubscriptionController;

});