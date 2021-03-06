requirejs.config({

	paths: {
		'jquery': '../../../bower_components/jquery/dist/jquery',
		'd3': '../../../bower_components/d3/d3',
		'simple-statistics': '../../../bower_components/simple-statistics/dist/simple_statistics',
		'synaptic': '../../../bower_components/synaptic/dist/synaptic'
	},
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        d3: {
            exports: 'd3'
        }
    }
});