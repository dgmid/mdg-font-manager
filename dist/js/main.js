'use strict'

const {app, BrowserWindow, shell, ipcMain} = require('electron')
const url = require('url') 
const path = require('path')
const dialog = require('electron').dialog
const Store = require('electron-store')
const fs = require( 'fs-extra' )

let win



let store = new Store({
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
		backgroundColor: '#132635',
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
	
	win.once('ready-to-show', () => {
		win.show()
	})
	
	win.on('resize', saveWindowBounds)
	win.on('move', saveWindowBounds)
	
	win.on('closed', () => {
		app.quit();
	})
	
	require('./app-menu')
	require('./list-menus')
	require('./font-menu')
	require('./install-font')
}

app.on('ready', createWindow) 



app.on('open-folder', (message) => {
	
	shell.openExternal('file://' + store.get('fontDirectories.' + message ))
})



app.on('choose-folder', (message) => {
	
	let currentPath = store.get('fontDirectories.' + message ),
		label = 'Active'
	
	if( message === 'disabledPath' ) label = 'Disabled'
	
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
			
			store.set('fontDirectories.' + message, filename[0] + '/')
			win.webContents.send('update-path')
		}
	}
})



app.on('export-single', (message) => { exportFonts( [message] ) })
ipcMain.on('export-list', (event, message) => { exportFonts( message) })

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
			
			for(i = 0; i < fonts.length; i++ ) {
				
				fs.copy( fonts[i][1], filename + '/' + fonts[i][0], err => {
					
					if (err.code) {
						
						dialog.showErrorBox(
							'An error occured whilst exporting the fonts', err.code
						)
					}
				})
			}	
		}
	}
}
