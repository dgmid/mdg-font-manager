const electron = require('electron')
const {shell, app} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain


//note(@duncanmid): active fonts menu

const activeTemplate = [
	{
		label: 'Select All',
		click() { BrowserWindow.getFocusedWindow().webContents.send('select-all', 'active') }
	},
	{
		label: 'Deselect All',
		click() { BrowserWindow.getFocusedWindow().webContents.send('deselect-all', 'active') }
	},
	{
		label: 'Toggle Selection',
		click() { BrowserWindow.getFocusedWindow().webContents.send('toggle-selection', 'active') }
	},
	{
		type: 'separator'
	},
	{
		label: 'Show Active Fonts Folder in Finder',
		click() { app.emit('open-folder', 'activePath') }
	},
	{
		label: 'Choose Active Fonts Folder…',
		click() { app.emit('choose-folder', 'activePath') }
	}
]

const activeMenu = Menu.buildFromTemplate(activeTemplate)



//note(@duncanmid): disabled fonts menu

const disabledTemplate = [
	{
		label: 'Select All',
		click() { BrowserWindow.getFocusedWindow().webContents.send('select-all', 'disabled') }
	},
	{
		label: 'Deselect All',
		click() { BrowserWindow.getFocusedWindow().webContents.send('deselect-all', 'disabled') }
	},
	{
		label: 'Toggle Selection',
		click() { BrowserWindow.getFocusedWindow().webContents.send('toggle-selection', 'disabled') }
	},
	{
		type: 'separator'
	},
	{
		label: 'Show Disabled Fonts Folder in Finder',
		click() { app.emit('open-folder', 'disabledPath') }
	},
	{
		label: 'Choose Disabled Fonts Folder…',
		click() { app.emit('choose-folder', 'disabledPath') }
	}
]

const disabledMenu = Menu.buildFromTemplate(disabledTemplate)



ipc.on('show-folder-menu', (event, message) => {
	
	const win = BrowserWindow.fromWebContents(event.sender)
	
	if( message === 'active' ) {
			
		activeMenu.popup(win)
	
	} else {
		
		disabledMenu.popup(win)
	}
})
