'use strict';

require.config({

    deps: ['main'],

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        typeahead: {
            deps: ['jquery', 'bootstrap']
        },
        parsley: {
            deps: ['jquery']
        },
        dataTables: {
            deps: ['jquery']
        },
        dataTablesBootstrap: {
            deps: ['jquery', 'dataTables']
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone-min',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        marionette: '../bower_components/marionette/lib/backbone.marionette.min',
        mustache: '../bower_components/mustache/mustache',
        async: '../bower_components/requirejs-plugins/src/async',
        goog: '../bower_components/requirejs-plugins/src/goog',
        text: '../bower_components/requirejs-text/text',
        json: '../bower_components/requirejs-plugins/src/json',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        typeahead: '../bower_components/typeahead.js/dist/typeahead.min',
        configPath: '..',
        parsley: '../bower_components/parsleyjs/parsley',
        dataTables: '../bower_components/datatables/media/js/jquery.dataTables',
        dataTablesBootstrap: '../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap'
    }
});