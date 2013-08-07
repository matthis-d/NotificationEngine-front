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
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        marionette: '../bower_components/marionette/lib/backbone.marionette.min',
        mustache: '../bower_components/mustache/mustache'
    }
});