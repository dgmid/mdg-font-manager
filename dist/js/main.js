const {app, BrowserWindow, shell} = require('electron')
const url = require('url') 
const path = require('path') 
var dialog = require('electron').dialog
const Store = require('electron-store')
let win



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
		}
	}
})



function createWindow() {
	
	let { x, y, width, height } = store.get('windowBounds')
	
	win = new BrowserWindow({
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
		
		pathname: path.join(__dirname, '../../index.html'), 
		protocol: 'file:', 
		slashes: true 
	}))
	
	win.on('resize', saveWindowBounds)
	win.on('move', saveWindowBounds)
	
	win.on('closed', function () {
		app.quit();
	})
	
	require('./app-menu')
	require('./list-menus')
	require('./install-font')
}



app.on('ready', createWindow) 



app.on('open-folder', function(message) {
	
	shell.openExternal('file://' + store.get('fontDirectories.' + message ))
})



app.on('choose-folder', function(message) {
	
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

