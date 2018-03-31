'use strict'

const electron = require('electron')
const {Menu, shell} = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const loadJsonFile = require('load-json-file')
const name = app.getName()
var about = require('./about')



const template = [
	{
		label: name,
		submenu: [
			{
				label: 'About ' + name,
				click() { about.createAbout() }
			},
			{
				type: 'separator'
			},
			{
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit'
			}
		]
	},
	{
		label: 'Installed Fonts',
		submenu:
		[
			{
				label: 'Select All Acitve Fonts',
				accelerator: 'Command+A',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('select-all', 'active') }
			},
			{
				label: 'Deselect All Active Fonts',
				accelerator: 'Shift+Command+A',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('deselect-all', 'active') }
			},
			{
				label: 'Toggle Active Fonts',
				accelerator: 'Control+Command+A',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('toggle-selection', 'active') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Select All Disabled Fonts',
				accelerator: 'Command+D',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('select-all', 'disabled') }
			},
			{
				label: 'Deselect All Disabled Fonts',
				accelerator: 'Shift+Command+D',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('deselect-all', 'disabled') }
			},
			{
				label: 'Toggle Disabled Fonts',
				accelerator: 'Control+Command+D',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('toggle-selection', 'disabled') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Update Font Lists',
				accelerator: 'Command+U',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('update-lists') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Export Selected Fonts',
				accelerator: 'Command+E',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('export-fonts') }
			},
			{
				label: 'Delete Selected Fonts',
				accelerator: 'Command+X',
				click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('delete-fonts') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Show Active Fonts Folder in Finder…',
				accelerator: 'Command+1',
				click() { app.emit('open-folder', 'activePath')  }
			},
			{
				label: 'Show Disabled Fonts Folder in Finder…',
				accelerator: 'Command+2',
				click() { app.emit('open-folder', 'disabledPath') }
			},
			{
				label: 'Choose Active Fonts Folder…',
				accelerator: 'Command+3',
				click() { app.emit('choose-folder', 'activePath') }
			},
			{
				label: 'Choose Disabled Fonts Folder…',
				accelerator: 'Command+4',
				click() { app.emit('choose-folder', 'disabledPath') }
			}
		]  
	},
	{
		label: 'Tools',
		submenu:
		[
			{
				label: 'Open Font Book…',
				accelerator: 'Alt+Cmd+F',
				click () { require('electron').shell.openItem('/Applications/Font\ Book.app/') }  
			},
			{
				type: 'separator'
			},
			{
				label: 'Browse Google Webfonts Helper…',
				accelerator: 'Ctrl+Alt+Cmd+G',
				click () { require('electron').shell.openExternal('https://google-webfonts-helper.herokuapp.com/fonts') }  
			},
			{
				label: 'Browse fonts.google.com…',
				accelerator: 'Alt+Cmd+G',
				click () { require('electron').shell.openExternal('https://fonts.google.com') }  
			},
			{
				type: 'separator'
			},
			{
				label: 'Install Google Font',
				accelerator: 'Cmd+G',
				submenu: [], 
			},
		]
	},
	{
		label: 'View',
		submenu:
		[
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click (item, focusedWindow) {
					if (focusedWindow) focusedWindow.reload()
				}
			},
			{
				label: 'Toggle Developer Tools',
				accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
				click (item, focusedWindow) {
					if (focusedWindow) focusedWindow.webContents.toggleDevTools()
				}
			},
			{
				type: 'separator'
			},
			{
				role: 'resetzoom'
			},
			{
				role: 'zoomin'
			},
			{
				role: 'zoomout'
			},
			{
				type: 'separator'
			},
			{
				role: 'togglefullscreen'
			}
		]
	},
	{
		role: 'window',
		submenu:
		[
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Zoom',
				role: 'zoom'
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		]
	},
	{
		role: 'help',
		submenu:
		[
			{
				label: 'midwinter-dg.com',
				click () { require('electron').shell.openExternal('https://www.midwinter-dg.com') }
			}
		]
	}
]



loadJsonFile( path.join(__dirname, '../json/google-font-list.json') ).then(json => {
    
	for (let i = 0, len = json.length; i < len; i++) {
		
		template[2].submenu[5].submenu.push({
				label: json[i]['name'],
				click () { app.emit('install-font', json[i]) }
			}
		)
	}
		
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
})
