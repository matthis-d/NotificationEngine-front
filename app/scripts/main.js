/*global require*/
'use strict';

require.config({
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
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'
    }
});

require([
    'backbone',
    'bootstrap'
    
], function (Backbone) {
    Backbone.history.start();

    console.log('hello');

    $('.left-menu').affix({
        offset: {
            top: 200,
            bottom: 10
        }
    });

});