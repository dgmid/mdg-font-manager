'use strict'

window.$ = window.jQuery = require( 'jquery' )
const fs = require( 'fs-extra' )
const {ipcRenderer} = require( 'electron' )
const electron = require("electron")
const remote = electron.remote
const dialog = remote.dialog
const Store = require( 'electron-store' )
const store = new Store()

populateFontLists()



//note(@duncanmid): populate font lists

function populateFontLists() {
	
	let {activePath, disabledPath} = store.get('fontDirectories')
	
	$('#active-menu').html(activePath)
	$('#disabled-menu').html(disabledPath)
	
	addItemsToList(	activePath, disabledPath, 'active' )
	addItemsToList( disabledPath, activePath, 'disabled' )
	
	$('#left-panel ul, #right-panel ul').fadeIn('fast')
}



//note(@duncanmid): update lists

function updateLists() {
	
	$('#active-count, #disabled-count').html('').hide()
	$('#active-list li, #disabled-list li').remove()
	$('#update-all').prop('disabled', true)
	
	populateFontLists()
	
}



//note(@duncanmid): add items to lists

function addItemsToList( oldPath, newPath, list) {
	
	fs.readdir( oldPath, ( err, files ) => {
		
		if ( err ) throw  err
		
		let total = 0
		
		
		if( store.get( `fontOrder.${list}` ) == 1 ) { 
		
			files.reverse()
		}
		
		for ( let file of files ) {
			
			let item
			let stats = fs.statSync( oldPath + file )
			
			if( stats.isDirectory() ) {
					
					item = 'folder'
					
				} else {
					
					item = 'file'
				}
				
				if( !file.startsWith('.') ) {
						
					$(`#${list}-list`).append(`<li class="${item}" data-name="${file}" data-oldpath="${oldPath}${file}" data-newpath="${newPath}${file}" data-type="${item}" title="${file}"><div>${file}</div></li>`)
					
					total++
				}
		}
		
		$(`#${list}-total`).html( total )
		
	})
}



//note(@duncanmid): move selected files or folders

function move( oldPath, newPath, count, total, callback ) {	
	
	fs.rename(oldPath, newPath, function (err) {
		
		if (err) {
			
			switch( err.code ) {
				
				case 'ENOTEMPTY':
					
					dialog.showErrorBox(
						'An error occured whilst moving the fonts',
						'Some items could not be moved - you may have duplicate items in your Active and Disabled folders.'
					)
					
				break;
				
				case 'ENOENT':
					
					dialog.showErrorBox(
						'An error occured whilst moving the fonts',
						'Make sure the paths for the Active and Disabled directories are correctly set. If you don\'t have a "Fonts Disabled" folder in your home Library, you may need to create one.'
					)
					
				break;
				
				default:
				
				dialog.showErrorBox(
					'An error occured whilst moving the fonts', err.code
				)
			}
		}
		
		if( (count + 1) === total ) {
			
			callback()
		}
	})
}



//note(@duncanmid): delete items

function deleteItems( oldPath, count, total, callback ) {
	
	fs.remove(oldPath, function (err) {
		
		if (err) {
			
			if (err.code) {
				
				dialog.showErrorBox(
					'An error occured whilst deleting the fonts', err.code
				)
			}
		}
		
		if( (count + 1) === total ) {
			
			callback()
		}
	})
}



//note(@duncanmid): update fonts button state

function updateButtonState() {
	
	$('#search').val('')
	$('ul li').show()
	
	let active		= $('#active-list li.selected').length,
		disabled 	= $('#disabled-list li.selected').length
	
	if( active + disabled > 0 ) {
		
		$('#update-all').prop('disabled', false)
	
	} else {
		
		$('#update-all').prop('disabled', true)
	}
	
	if( active > 0 ) {
		
		$('#active-count').html( active ).show()
	
	} else {
		
		$('#active-count').html('').hide()
	}
	
	if( disabled > 0 ) {
		
		$('#disabled-count').html( disabled ).show()
	
	} else {
		
		$('#disabled-count').html('').hide()
	}
}



//note(@duncanmid): on click list item

$('body').on('mouseup', '#active-list li, #disabled-list li', function(event) {
	
	if( event.which === 3 ) {

		
		var name = $(this).data('name'),
			path = $(this).data('oldpath')
		
		ipcRenderer.send('show-font-menu', [name, path] )
		
	} else {
		
		$(this).toggleClass('selected')
		updateButtonState()
	}
})



//note(@duncanmid): delete selected

function deleteSelected() {
	
	$('#left-panel ul, #right-panel ul').fadeOut('fast')
	
	var counter = 0,
		items = $('#active-list li.selected, #disabled-list li.selected')
	
	items.each(function (index, value) {
		
		var oldPath = $(this).data('oldpath')
		
		deleteItems( oldPath, counter++, items.length, updateLists )
	})
}



//note(@duncanmid): export selected

function exportSelected() {
	
	var selected = $('#active-list li.selected, #disabled-list li.selected'),
		message = []
	
	selected.each( function() {
		
		var $this = $(this)
		message.push( [ $this.data('name') ,$this.data('oldpath') ] )
	})
	
	ipcRenderer.send('export-list', message)
}



//note(@duncanmid): update all

function updateAll() {
	
	$('#left-panel ul, #right-panel ul').fadeOut('fast')
	
	var counter = 0,
		items = $('#active-list li.selected, #disabled-list li.selected')
		
	items.each(function (index, value) {
		
		var oldPath = $(this).data('oldpath'),
			newPath = $(this).data('newpath')
		
		move( oldPath, newPath, counter++, items.length, updateLists )
	})
}


$('#update-all').click( () => {
	
	updateAll()
})



//note(@duncanmid): open font folder menus

$('#active-menu').mouseup( (e) => {
	
	e.preventDefault()
	ipcRenderer.send('show-folder-menu', 'active')
})

$('#disabled-menu').mouseup( (e) => {
	
	e.preventDefault()
	ipcRenderer.send('show-folder-menu', 'disabled')
})



//note(@duncanmid): list-menu commands

ipcRenderer.on('select-all', (event, message) => {
	
	$('#' + message + '-list li').addClass('selected')
	updateButtonState()
})

ipcRenderer.on('deselect-all', (event, message) => {
	
	$('#' + message + '-list li').removeClass('selected')
	updateButtonState()
})

ipcRenderer.on('toggle-selection', (event, message) => {
	
	$('#' + message + '-list li').toggleClass('selected')
	updateButtonState()
})

ipcRenderer.on('find', () => {
	
	$('#search').focus()
})

ipcRenderer.on('update-lists', () => {
	
	if( $('#update-all').prop('disabled') ) {
	
		dialog.showErrorBox(
			'No fonts are selected',
			'Select the fonts you would like to activate or disable.'
		)
	
	} else {
	
		updateAll()
	}
})

ipcRenderer.on('delete-fonts', () => {

	var selected = $('#active-list li.selected, #disabled-list li.selected')
	
	if( selected.length > 0 ) {
		
		var response = dialog.showMessageBox({	
						message: 'Are you sure you want to delete the selected fonts?',
						detail: 'This operation is not reversable.',
						buttons: ['OK','Cancel']
					})
		
		if( response === 0 ) {
		
			deleteSelected()
		}
	
	} else {
		
		dialog.showErrorBox(
			'No fonts are selected',
			'Select fonts from the Active and Disabled lists to delete them from your system.'
		)
	}
})

ipcRenderer.on('delete-single', (event, message) => {
	
	deleteItems( message, 0, 1, updateLists );
})

ipcRenderer.on('export-fonts', () => {
	
	var selected = $('#active-list li.selected, #disabled-list li.selected')
	
	if( selected.length > 0 ) {
		
		exportSelected()
	
	} else {
		
		dialog.showErrorBox(
			'No fonts are selected',
			'Select fonts from the Active and Disabled lists to export them to the Desktop.'
		)
	}
})

ipcRenderer.on('export-ok', (event, message) => {
	
	let fontExportOk = new Notification('MDG Font Manager', {
		body: `The selected fonts have been exported to: ${message}`
	})
})


ipcRenderer.on('export-failed', () => {
	
	let fontExportError = new Notification('MDG Font Manager', {
		body: `An error occured whilst exporting the fonts.`
	})
})

ipcRenderer.on('import-ok', (event, message) => {
	
	updateLists()
	
	let fontExportOk = new Notification('MDG Font Manager', {
		body: `The fonts have been installed to: ${message}`
	})
})


ipcRenderer.on('import-failed', () => {
	
	updateLists()
	
	let fontExportError = new Notification('MDG Font Manager', {
		body: `An error occured whilst importing the fonts.`
	})
})

ipcRenderer.on('update-path', () => {
	
	$('#active-list li, #disabled-list li').remove()
	$('#update-all').prop('disabled', true)
	populateFontLists()
})

ipcRenderer.on('reload', () => {
	
	updateLists()
})

ipcRenderer.on('reorder', (event, message) => {
	
	if( message[1] == 2 ) {
		
		message[1] = store.get( `fontOrder.${message[0]}` )
	}
	
	
	if( store.get( `fontOrder.${message[0]}` ) == message[1] ) {
	
		let list = $(`#${message[0]}-list`),
			listItems = list.children('li')
		
		list.append(listItems.get().reverse())
		
		store.set( `fontOrder.${message[0]}`, (1 - message[1] )  )
	}
})



//note(@duncanmid): show / hide bezel

ipcRenderer.on('display-bezel', (event, message) => {
	
	$('#overlay').html(`<div class="bezel"><div class="inner"><img src="../assets/svg/loader.svg" width="75" height="75"><span>installing</span><span>${message}</span></div></div>`).fadeIn('fast')
})

ipcRenderer.on('remove-bezel', (event, message) => {

	if( message !== 'font-not-installed' ) {
		
		$('#active-list li, #disabled-list li').remove()
		$('#update-all').prop('disabled', true)
		populateFontLists()
		$('#overlay').fadeOut('fast').empty()
			
		let dir = store.get('fontDirectories.activePath')
		
		let fontInstalled = new Notification('MDG Font Manager', {
			body: `The font ${message} has been installed to ${dir}`
		})
	
	} else {
		
		$('#overlay').fadeOut('fast').empty()
	}
})



//note(@duncanmid): drag items in to window

function setDragArea( id ) {

	let dragArea = document.getElementById( id )
	
	let draggedItems = {
		'location': id,
		'list': []
	}
	
	dragArea.ondragover = () => {
		
		$( dragArea ).addClass('dragover')
		return false
	}
	
	dragArea.ondragleave = () => {
		
		$( dragArea ).removeClass('dragover')
		return false
	}
	
	dragArea.ondragend = () => {
		
		$( dragArea ).removeClass('dragover')
		return false
	}
	
	dragArea.ondrop = (event) => {
		
		event.preventDefault()
		$( dragArea ).removeClass('dragover')
		
		let files = []
		
		for (let item of event.dataTransfer.files) {
			
			draggedItems.list.push( item.path )
		}
		
		ipcRenderer.send('import', draggedItems )
		draggedItems.list = []
	}
}

setDragArea( 'left-panel' )
setDragArea( 'right-panel' )



//note(@duncanmid): search field

// based on https://gist.github.com/dennysfredericci/ca99b08648649b545dfd

$('#search').bind('keyup', function() {

	let searchString = $(this).val()
	
	$('ul li').each(function(index, value) {
	
	let currentName = $(value).text()
	if( currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
			
			$(value).show()
	
		} else {
			
			if(!$(value).hasClass('selected')) {
					
				$(value).hide()
			}
		}
	})
})
