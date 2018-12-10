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

const fontSizes = [9,10,11,12,13,14,18,24,36,48,64,72,96,144]



ipcRenderer.on('selected-font', (event, message) => {
	
	let name = message[0],
		path = message[1]
	
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
						
						if( count == 0 ) {
							
							injectGlyphs( fontName( file, 1 ), 'letters' )
						}
						
						count++
					}
				}
			})

		} else {
			
			injectCSS( fontName( name, 1 ), name, path, 1 )
			listItem( 'file', 'selected', fontName( name, 1 ), name, fontName( name, 0 ) )
			addPreview( name )
			injectGlyphs( name, 'letters' )
		}
	})
})



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



function listItem( type, selected, data, name, font ) {
		
	$('#font-list ul').append(
		
		`<li class="${type} ${selected}" data-font="${data}" title="${name}">
			<div>${font}</div>
		</li>`
	)
}



function addPreview( name ) {
	
	let font 	= fontName( name, 0 ),
		family 	= fontName( name, 1 ),
		color 	= store.get('fontPreview.color'),
		val 	= store.get('fontPreview.size'),
		size 	= fontSizes[val]
	
	$('#preview-list').append(
	
	`<article class="preview-item" data-target="${family}">
		<h2>${font}</h2>
		<div class="preview-text" style="font-family: \'${family}\'; color: ${color}; font-size: ${size}px;">
			<p>ABCDEFGHIJKLM<br class="break">NOPQRSTUVWXYZ<br>
			abcdefghijklm<br class="break">nopqrstuvwxyz<br>
			1234567890</p>
		</div>
	</article>`
	)
	
	if( val > 8 ) {
		
		$('.break').hide()
	}
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



function injectGlyphs( name, set ) {
	
	$('#glyph-list').empty()
	
	loadJsonFile( path.join(__dirname, `../json/${set}-chars.json`) ).then(json => {
		
		let category = 'maths'
		
		$('#glyph-list').append(`<div id="${category}"><h2>${category}</h2>`)
		
		json.forEach(function(glyph) {
			
			let entity = ''
			
			if( glyph.e ) {
				
				entity = `<tr>
				<th>html entity</th>
				<td>&amp;${glyph.e}</td>
			</tr>
			`		
			}
			
			$('#glyph-list').append(
				
`<div class="glyph">
	<figure class="glyph-sample" title="${glyph.n}" data-glyph='${JSON.stringify(glyph)}'>
		&${glyph.x}
	</figure>
	
	<table>
		<tbody>
			<tr>
				<th>description</th>
				<td><span>${glyph.n}</span></td>
			</tr>
			<tr>
				<th>unicode</th>
				<td>${glyph.u}</td>
			</tr>
			<tr>
				<th>hex code</th>
				<td>&amp;${glyph.x}</td>
			</tr>
			<tr>
				<th>html code</th>
				<td>&amp;${glyph.h}</td>
			</tr>
			${entity}
		</tbody>
	</table>
</div>
`
			)
		})
		
		$('#glyph-list').append(`</div>`)
		
		styleGlyphs( name )
	})	
}



function styleGlyphs( name ) {
	
	console.log('name: ' + name)
	
	let family 	= fontName( name, 1 ),
		color 	= store.get('fontPreview.color'),
		size 	= fontSizes[store.get('fontPreview.size')]
	
	console.log('family: ' + family)
	
	$('.glyph-sample').css({	'font-family': family })
	$('.glyph-sample').css({	'font-size': `${size}px`})
	$('.glyph-sample').css({	'color': color })
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



$('body').on('mouseup', '.glyph-sample', function() {
	
	let glyph = $(this).data('glyph')
	ipcRenderer.send('show-glyph-menu', glyph )
})



$('#show-fonts').click( function() {
	
	$('#show-glyphs').removeClass('selected')
	
	$('#glyph-list, #glyph-types').fadeOut().promise().done( function() {
		
		$('#show-fonts').addClass('selected')
		$('#preview-list').fadeIn('fast')
	})
})



$('#show-glyphs').click( function() {
	
	$('#show-fonts').removeClass('selected')
	
	$('#preview-list').fadeOut().promise().done( function() {
		
		$('#show-glyphs').addClass('selected')
		$('#glyph-list, #glyph-types').fadeIn('fast')
	})
})



$('#font-size').change( function() {
	
	let val		= parseInt( $(this).val() ),
		size 	= fontSizes[val]
	
	if( val > 8 ) {
		
		$('.break').hide()
	
	} else {
		
		$('.break').show()
	}
	
	$('.preview-text, .glyph-sample').css({'font-size': `${size}px`})
	$('#font-size-val').html(size)
	store.set('fontPreview.size', val)
})



$('#font-color').change( function() {
	
	let val = $(this).val()
	
	$('.preview-text, .glyph-sample').css({'color': val})
	$('#font-color-swatch').css({'background-color': val})
	store.set('fontPreview.color', val)
})



$('#glyph-types').change( function() {
	
	let name 	= $('#font-list li.selected').data('font'),
		set 	= $('#glyph-types').val()
	
	if( name == 'show-all' ) {
		
		name = $('#font-list li.selected').next().data('font')
	}
	
	injectGlyphs( name, set )
})


function setPrefs() {
	
	let {size, color} = store.get('fontPreview')
	
	$('#font-size').val(size)
	$('#font-size-val').html(fontSizes[size])
	$('#font-color').val(color)
	$('#font-color-swatch').css({'background-color': color})
}



$(document).ready(function() {
	
	setPrefs()	
})
