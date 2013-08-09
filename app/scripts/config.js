'use strict';

require.config({

    waitSeconds : 15,

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
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        marionette: '../bower_components/marionette/lib/backbone.marionette.min',
        mustache: '../bower_components/mustache/mustache',
        async: '../bower_components/requirejs-plugins/src/async',
        goog: '../bower_components/requirejs-plugins/src/goog',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        typeahead: '../bower_components/typeahead.js/dist/typeahead.min'
    }
});