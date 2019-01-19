'use strict'

const {ipcRenderer} = require( 'electron' )
const remote = require( 'electron' ).remote
const Store = require( 'electron-store' )
const store = new Store()

const $ = require( 'jquery' )



//note(@duncanmid): xxx



//note(@duncanmid): close modal

function closeModal() {
	
	const modal = remote.getCurrentWindow()
	modal.close()
}



$(document).ready(function() {
	
	$('#dividers').prop('checked', store.get('appPrefs.dividers') )
	$('#extensions').prop('checked', store.get('appPrefs.extensions') )
	
	
	$('input').on('change', function() {
		
		let name = $(this).attr('name'),
			checked = $(`#${name}`).is(':checked')
		
		store.set( `appPrefs.${name}`, checked )
		ipcRenderer.send('set-prefs', '' )
	})
	
	
	//note(@duncanmid): cancel modal
	
	$('#close').click( function() {
		
		closeModal()
	})
})
