define([
    'underscore',
    'backbone',
    'views/token-item-view',
    'json!configPath/config.json',
    'marionette',
    'templates',
    'dataTables',
    'dataTablesBootstrap'


], function (_, Backbone, TokenItemView, config) {

    var TokensCompositeView = Backbone.Marionette.CompositeView.extend({

        itemView: TokenItemView,

        template: 'tokens-composite',

        itemViewContainer: 'tbody',

        events: {
            'click #createToken': 'createToken'
        },

        createToken: function () {

            var tokenCollection = this.collection;

            $.ajax({
                url: config.serverUrl + '/requestToken.do'

            }).done(function () {
                tokenCollection.fetch();
            });
        },

        onRender: function() {

            var $tokensTable = this.$el.find('#tokens-table');

            console.log($tokensTable);

            var dataTable = $tokensTable.dataTable({
                'sPaginationType': 'bootstrap'
            });

            $('.datatable').each(function(){
                var datatable = $(this);

                // SEARCH - Add the placeholder for Search and Turn this into in-line formcontrol
                var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
                search_input.attr('placeholder', 'Search');
                search_input.addClass('form-control input-small');
                search_input.css('width', '250px');

                // SEARCH CLEAR - Use an Icon
                var clear_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] a');
                clear_input.html('<i class="icon-remove-circle icon-large"></i>');
                clear_input.css('margin-left', '5px');

                // LENGTH - Inline-Form control
                var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
                length_sel.addClass('form-control input-small');
                length_sel.css('width', '75px');

                // LENGTH - Info adjust location
                var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_info]');
                length_sel.css('margin-top', '18px');
            });

            //dataTable.extend;
        }

    });

    return TokensCompositeView;

});