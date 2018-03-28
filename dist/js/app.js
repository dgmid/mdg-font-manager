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
	
	var {activePath, disabledPath} = store.get('fontDirectories')
	
		$('#active-menu').html(activePath)
		$('#disabled-menu').html(disabledPath)
	
	addItemsToList(	activePath, disabledPath, 'active' )
	addItemsToList( disabledPath, activePath, 'disabled' )
	
	$('.left-panel ul, .right-panel ul').fadeIn('fast')
}



//note(@duncanmid): update lists

function updateLists() {

	$('#active-list li, #disabled-list li').remove()
	$('#update-all').prop('disabled', true)
	
	populateFontLists()
}



//note(@duncanmid): add items to lists

function addItemsToList( oldPath, newPath, list) {
	
	fs.readdir( oldPath, ( err, files ) => {

		if ( err ) throw  err

		for ( let file of files ) {
			
			var item
			
			fs.stat( oldPath + file,( err,stats ) => {
				
				if( err ) {

					if( err.code ) {
											
						dialog.showErrorBox(
							'An error occured whilst updating the font lists', err.code
						)
					}
					
					return
				}
				
				if( stats.isDirectory() ) {
					
					item = 'folder'
					
				} else {
					
					item = 'file'
				}
				
				if( !file.startsWith('.') ) {
						
					$('#' + list + '-list').append('<li class="' + item + '" data-name="' + file + '" data-oldpath="' + oldPath + file + '" data-newpath="' + newPath + file + '"><div>' + file + '</div></li>')
				}
			})
		}
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

	if( $('#active-list li.selected, #disabled-list li.selected').length > 0 ) {
		
		$('#update-all').prop('disabled', false)
	
	} else {
		
		$('#update-all').prop('disabled', true)
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
	
	$('.left-panel ul, .right-panel ul').fadeOut('fast')
	
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
	
	$('.left-panel ul, .right-panel ul').fadeOut('fast')
	
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

$('#active-menu').click( (e) => {
	
	e.preventDefault()
	ipcRenderer.send('show-folder-menu', 'active')
})

$('#disabled-menu').click( (e) => {
	
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

ipcRenderer.on('update-path', () => {
	
	$('#active-list li, #disabled-list li').remove()
	$('#update-all').prop('disabled', true)
	populateFontLists()
})



//note(@duncanmid): show / hide bezel

ipcRenderer.on('display-bezel', (event, message) => {
	
	$('#overlay').html('<div class="bezel"><div class="inner"><img src="../assets/svg/loader.svg" width="75" height="75"><span>installing</span><span>' + message + '</span></div></div>').fadeIn('fast')
})

ipcRenderer.on('remove-bezel', (event, message) => {

	if( message !== 'font-not-installed' ) {
		
		$('#active-list li, #disabled-list li').remove()
		$('#update-all').prop('disabled', true)
		populateFontLists()
		$('#overlay').fadeOut('fast').empty()
			
		let dir = store.get('fontDirectories.activePath')
		
		let fontInstalled = new Notification('Installation Complete', {
			body: 'The font '+ message + ' has been installed to ' + dir
		})
	
	} else {
		
		$('#overlay').fadeOut('fast').empty()
	}
})
