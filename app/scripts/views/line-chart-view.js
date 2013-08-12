define([
    'underscore',
    'backbone',
    'async!https://www.google.com/jsapi',
    'goog!visualization,1.0,packages:[corechart]'

], function (_, Backbone) {

    var LineChartView = Backbone.View.extend({

        zoneId: 'charts',

        collections: [],

        createRow: function(index) {

            var row = new Array();

            row.push(this.collections[0].at(index).getDateToString());

            var size = this.collections.length;

            for(var i = 0; i < size; i++) {

                row.push(this.collections[i].at(index).getCount());
            }

            return row;

        },

        getData: function() {

            var array = new Array(),
                header = new Array();

            header.push('Date');

            var size = this.collections.length;
            for(var i = 0; i < size; i++ ) {

                header.push(this.collections[i].name);
            }

            array.push(header);

            var numberOfDays = this.collections[0].length;
            for(var j = 0; j < numberOfDays; j++) {

                array.push(this.createRow(j));
            }


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

            var chart = new google.visualization.LineChart(document.getElementById(zoneId));

            chart.draw(this.getData(), this.getOptions());
        },

        drawLineChart: function (collections, zoneId, title) {

            this.collections = collections;
            var options = {
                title: title,
                height: 300
            };
            this.setOptions(options);
            this.setZoneId(zoneId);
            this.render();
        }


    });

    return LineChartView;

});