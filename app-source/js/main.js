'use strict'

const {app, BrowserWindow, shell, ipcMain} = require('electron')
const url = require('url') 
const path = require('path')
const dialog = require('electron').dialog
const Store = require('electron-store')
const fs = require( 'fs-extra' )
const chokidar = require( 'chokidar' )

let win,
	watcher,
	store = new Store({
	defaults: {
		
		windowBounds: {
			width: 800,
			height: 600,
			x: 0,
			y: 0
		},
		
		fontDirectories: {
			activePath: app.getPath('home') + '/Library/Fonts/',
			disabledPath: app.getPath('home') + '/Library/Fonts Disabled/'
		},
		
		fontOrder: {
			active: 0,
			disabled: 0	
		},
		
		fontPreview: {
			size: 8,
			color: '#000000'
		},
		
		appPrefs: {
			dividers: false,
			extensions: true
		}
	}
})



function createWindow() {
	
	let { x, y, width, height } = store.get('windowBounds')
	
	win = new BrowserWindow({
		show: false,
		titleBarStyle: 'hidden',
		x: x,
		y: y,
		width: width,
		height: height,
		minWidth: 400,
		minHeight: 300,
		backgroundColor: '#031320',
		icon: path.join(__dirname, '../assets/icon/Icon.icns')
	})
	
	win.setSheetOffset(24)
	
	function saveWindowBounds() {
		store.set('windowBounds', win.getBounds())
	}
	
	win.loadURL(url.format ({ 
		
		pathname: path.join(__dirname, '../html/app.html'), 
		protocol: 'file:', 
		slashes: true 
	}))
	
	win.once('ready-to-show', win.show)
	
	win.on('show', () => {
		
		checkPaths( 'active' )
		checkPaths( 'disabled' )
	})
	
	win.on('resize', saveWindowBounds)
	win.on('move', saveWindowBounds)
	
	win.on('focus', () => {
		
		if( typeof watcher != 'undefined' ) watcher.close()
	})
	
	win.on('blur', watchOnce)
	win.on('closed', app.quit)
	
	require('./app-menu.min')
	require('./list-menus.min')
	require('./font-menu.min')
	require('./glyph-menu.min')
	require('./install-font.min')
}

app.on('ready', createWindow)



app.on('open-folder', (message) => {
	
	shell.openExternal('file://' + store.get(`fontDirectories.${message}` ))
})



app.on('choose-folder', (message) => {
	
	chooseFolder( message )
})



function chooseFolder(message) {
	
	let currentPath = store.get('fontDirectories.' + `${message}Path` ),
	label = capitalize( message )
	
	dialog.showOpenDialog(win, {
			
			defaultPath: currentPath,
			buttonLabel: 'Choose ' + label + ' Fonts Folder',
			properties: [	'openDirectory',
							'showHiddenFiles',
							'createDirectory'
						]
		},		
		
		setFontDirectories
	)
	
	
	function setFontDirectories(filename) {
		
		if( filename ) {
			
			store.set('fontDirectories.' + `${message}Path`, filename[0] + '/')
			win.webContents.send('update-path')
		}
	}
}



app.on('export-single', (message) => { exportFonts( [message] ) })
ipcMain.on('export-list', (event, message) => { exportFonts( message) })



ipcMain.on('set-prefs', (event, message) => {
	
	win.webContents.send('reload')
})



function exportFonts(fonts) {
	
	dialog.showSaveDialog(win, {
			
			defaultPath: app.getPath('desktop') + '/Exported Fonts',
			buttonLabel: 'Export Fonts'
		},		
		
		exportList
	)
	
	function exportList( filename ) {
		
		if ( filename === undefined ) {
			
			return
		
		} else {
			
			let error = 0
			
			for( let i = 0, length = fonts.length; i < length; i++ ) {
				
				try {
					
					fs.copySync( fonts[i][1], filename + '/' + fonts[i][0] )
					
				} catch (err) {
					
					error++
					console.log( err )	
				
				} finally {
					
					if( i+1 == length ) {
						
						if( error > 1 ) {
							
							win.webContents.send('export-failed')
							
						} else {
							
							win.webContents.send('export-ok', filename)
						}
					}
				}
			}		
		}
	}
}



ipcMain.on('import', (event, message) => {
	
	let installPath = ( message.location == 'left-panel' )? store.get('fontDirectories.activePath') : store.get('fontDirectories.disabledPath')
	
	let error = 0
	
	for( let i = 0, length = message.list.length; i < length; i++ ) {
		
		let file = message.list[i].split('/').pop()
		
		try {
			
			fs.moveSync(message.list[i], installPath + file, { overwrite: true })
		
		} catch (err) {
			
			error++
			console.log( err )
			
		} finally {
			
			if( i+1 == length ) {
				
				if( error > 1 ) {
					
					win.webContents.send('import-failed')
					
				} else {
					
					win.webContents.send('import-ok', installPath)
				}
			}			
		}
	}
})



function capitalize( word ) {
	
	return word.charAt(0).toUpperCase() + word.slice(1)
}



function checkPaths( folder ) {
	
	let capitalized = capitalize( folder ),
		message 	= `The ${capitalized} Folder is not yet set.`,
		response
	
	let details = (folder === 'disabled') ? 
		`Please choose or create a folder to store disabled fonts in:` :
		`Please set it to: ${app.getPath('home')}/Library/Fonts/`
		
	
	if( !fs.existsSync( store.get(`fontDirectories.${folder}Path`) ) ) {
		
		switch ( folder ) {
			
			case 'active':
				
				response = dialog.showErrorBox( message, details )
				
				store.set( 'fontDirectories.activePath', `${app.getPath('home')}/Library/Fonts/` )
				
				win.webContents.send('update-path')
				
			break
			
			case 'disabled':
				
				response = dialog.showMessageBox({	
							message: message,
							detail: details,
							buttons: [`Choose ${capitalized} Fonts Folder`,'Cancel']
						})
				
				if( response === 0 ) chooseFolder( `${folder}`)
			
			break
		}
	}
}



function watchOnce() {
	
	watcher = chokidar.watch(
		[
			store.get('fontDirectories.activePath'),
			store.get('fontDirectories.disabledPath')
		],
		{
			ignored: /(^|[\/\\])\../,
			ignoreInitial: true,
			persistent: true,
			depth: 0
		}
	).on('all', (event, path) => {
		
		watcher.close()		
		
		function reloadApp() {
			
			win.webContents.send('reload')
		}
		
		setTimeout(reloadApp, 1000)
		setTimeout(watchOnce, 1000)			
	})
}
