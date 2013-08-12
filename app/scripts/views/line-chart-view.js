define([
    'underscore',
    'backbone',
    'async!https://www.google.com/jsapi',
    'goog!visualization,1.0,packages:[corechart]'

], function (_, Backbone) {

    var LineChartView = Backbone.View.extend({

        zoneId: 'charts',

        //List of collections that will be displayed in the graph
        collections: [],

        createRow: function(index) {

            var row = new Array();

            //The first line of a row is the i-th (index-th) date
            row.push(this.collections[0].at(index).getDateToString());

            var size = this.collections.length;

            // Add in the row the i-th value of each collection (that corresponds to the i-th date)
            for(var i = 0; i < size; i++) {

                row.push(this.collections[i].at(index).getCount());
            }

            return row;

        },

        getData: function() {

            var array = new Array(),
                header = new Array();

            //We first create a row that is the header
            header.push('Date');

            var size = this.collections.length;
            for(var i = 0; i < size; i++ ) {

                //Add names of the collection for an understandable legend
                header.push(this.collections[i].name);
            }

            // Add it to the data that has to be returned
            array.push(header);

            // Then add datas for all the dates, it uses the method createRow of this view.
            var numberOfDays = this.collections[0].length;
            for(var j = 0; j < numberOfDays; j++) {

                array.push(this.createRow(j));
            }

            //Converts the array for the chart
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