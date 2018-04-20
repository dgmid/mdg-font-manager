'use strict'

window.$ = window.jQuery = require( 'jquery' )
const fs = require( 'fs-extra' )
const {ipcRenderer} = require( 'electron' )
const electron = require("electron")
const remote = electron.remote
const dialog = remote.dialog
const path = require('path')
const loadJsonFile = require('load-json-file')
const Store = require( 'electron-store' )
const store = new Store()



ipcRenderer.on('selected-font', (event, message) => {
	
	let name = message[0],
		path = message[1]	
	
	injectGlyphs()
	
	fs.stat( path, ( err,stats ) => {
		
		if( err ) {

			if( err.code ) {
									
				dialog.showErrorBox(
					`An error occured whilst previewing the font: ${name}`, err.code
				)
			}
			
			return
		}
		
		if( stats.isDirectory() ) {
			
			let count = 0;
			
			listItem( 'folder', 'selected', 'show-all', name, fontName( name, 0 ) )
			
			fs.readdir( path, ( err, files ) => {

				if ( err ) throw  err

				for ( let file of files ) {
				
					if( !file.startsWith('.') ) {
						
						injectCSS( fontName( file, 1 ), file, path, 0 )
						listItem( 'file', '', fontName( file, 1 ), file, fontName( file, 0 ) )
						addPreview( file )
						
						if( count == 0 ) { styleGlyphs( fontName( file, 1 ) ) }
						
						count++
					}
				}
			})

		} else {
			
			injectCSS( fontName( name, 1 ), name, path, 1 )
			listItem( 'file', 'selected', fontName( name, 1 ), name, fontName( name, 0 ) )
			addPreview( name )
			styleGlyphs( fontName( name, 1 ) )
		}
	})
})



function listItem( type, selected, data, name, font ) {
	
	
	
	$('#font-list ul').append(
		
		`<li class="${type} ${selected}" data-font="${data}" title="${name}">
			<div>${font}</div>
		</li>`
	)
}


function injectCSS( family, name, path, type ) {
		
	let url
	
	//note(@duncanmid): 0 = folder, 1 = file
	
	if( type == 0) {
		
		url = `${path}/${name}`
	
	} else {
		
		url = path
	}
	
	let div = $('<div />', {
	
		html: `<style>
				@font-face {
					font-family: "${family}";
					src:url("file://${url}");
				}
			</style>`
	
	}).appendTo("body")
}



function addPreview( name ) {
	
	let font 	= fontName( name, 0 ),
		family 	= fontName( name, 1 ),
		color 	= store.get('fontPreview.color'),
		size 	= store.get('fontPreview.size')
	
	$('#preview-list').append(
	
	`<article class="preview-item" data-target="${family}">
		<h2>${font}</h2>
		<div class="preview-text" style="font-family: \'${family}\'; color: ${color}; font-size: ${size}px;">
			<p>ABCDEFGHIJKLM<br>NOPQRSTUVWXYZ<br>
			abcdefghijklm<br>nopqrstuvwxyz<br>
			1234567890</p>
		</div>
	</article>`
	)
}



function fontName( name, type ) {
	
	//note(@duncanmid): 0 = font name, 1 = font-family
	
	let font = name.split('.'),
		result
	
	if( type == 0) {
		
		result = font[0].replace( /(-|_)/g, ' ' )
	
	} else {
		
		result = font[0]
	}
	
	return result
}



function injectGlyphs() {
	
	
	
	loadJsonFile( path.join(__dirname, '../json/unicode-chars.json') ).then(json => {
    
		for (let i = 0, len = json.length; i < len; i++) {
			
			$('#glyph-list').append(
				
				`<div class="glyph-item" title="${json[i]['n']}">&${json[i]['h']}</div>`
			);
		}
	})	
}



function styleGlyphs( name ) {
	
	let {size, color} = store.get('fontPreview')
	
	$('#glyph-list').css({	'font-family': name,
							'color': color,
							'font-size': size + 'px'
						})
}



$('body').on('click', '#font-list ul li', function(event) {
	
	let target,
		item = $(this).data('font')
	
	if( item !== 'show-all' ) { styleGlyphs( item ) }
	
	item == 'show-all' ? target = $('#preview-list article') : target = $(`#preview-list article[data-target="${item}"]`)
	
	$('#font-list ul li').removeClass('selected')
	$(this).toggleClass('selected')
	
	$('#preview-list article').fadeOut().promise().done( function() {
		
		target.fadeIn('fast')
	})
})



$('#show-fonts').click( function() {
	
	$('#glyph-list').fadeOut().promise().done( function() {
		
		$('#preview-list').fadeIn('fast')
	})
})



$('#show-glyphs').click( function() {
	
	$('#preview-list').fadeOut().promise().done( function() {
		
		$('#glyph-list').fadeIn('fast')
	})
})



$('#font-size').change( function() {
	
	let val = $(this).val()
	
	$('.preview-text, #glyph-list').css({'font-size': `${val}px`})
	$('#font-size-val').html(val)
	store.set('fontPreview.size', val)
})



$('#font-color').change( function() {
	
	let val = $(this).val()
	
	$('.preview-text, #glyph-list').css({'color': val})
	$('#font-color-swatch').css({'background-color': val})
	store.set('fontPreview.color', val)
})



function setPrefs() {
	
	let {size, color} = store.get('fontPreview')
	
	$('#font-size').val(size)
	$('#font-size-val').html(size)
	$('#font-color').val(color)
	$('#font-color-swatch').css({'background-color': color})
}



$(document).ready(function() {
	
	setPrefs()	
})
