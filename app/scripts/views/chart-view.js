define([
    'underscore',
    'backbone',
    'async!https://www.google.com/jsapi',
    'goog!visualization,1.0,packages:[corechart]'

], function (_, Backbone) {

    var ChartView = Backbone.View.extend({

        zoneId: 'charts',

        getData: function() {

            var array = new Array();

            array.push(['Object Type', 'Count']);

            this.collection.each(function(countModel){
                array.push(countModel.getObjectAndCount());
            });

            var data = google.visualization.arrayToDataTable(array);

            return data;

        },

        setZoneId: function(id) {
            this.zoneId = id;
        },

        getZoneId: function() {
            return this.zoneId;
        },

        setOptions: function(options) {

            this.options = options;
        },

        getOptions: function() {
            return this.options;
        },

        render: function() {

            var zoneId = this.getZoneId();

            var chart = new google.visualization.PieChart(document.getElementById(zoneId));

            chart.draw(this.getData(), this.getOptions());
        },

        drawChart: function(collection, zoneId, title) {

            this.collection = collection;
            var options = {
                title: title,
                height: 300
            };
            this.setOptions(options);
            this.setZoneId(zoneId);
            this.render();
        }


    });

    return ChartView;

});