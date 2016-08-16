/**
 * Holds all of our cell field models.
 * 
 * @package Ninja Forms Layouts
 * @subpackage Fields
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function( ) {
	var collection = Backbone.Collection.extend( {
		comparator: 'order',

		initialize: function( models, options ) {
			// We've been passed the cellModel to which this collection belongs.
			this.cellModel = options.cellModel;
			_.each( models, function( model ) {
				model.set( 'cellcid', this.cellModel.cid, { silent: true } );
			}, this );

			this.listenTo( this.cellModel.collection.rowModel.collection, 'validate:modelData', this.validateModelData );
		},

		validateFields: function() {
			_.each( this.models, function( fieldModel ) {
				nfRadio.channel( 'submit' ).trigger( 'validate:field', fieldModel );
			}, this );
		}

	} );
	return collection;
} );