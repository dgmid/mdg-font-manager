'use strict'

const electron = require('electron')
const {shell, app} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain

const Store = require( 'electron-store' )
const store = new Store()



ipc.on('show-folder-menu', (event, message) => {

	const win = BrowserWindow.fromWebContents(event.sender)
	
    let capitalized = message.charAt(0).toUpperCase() + message.slice(1),
		a_z = ( store.get( `fontOrder.${message}` ) == 0 ) ? true : false,
		z_a = ( store.get( `fontOrder.${message}` ) == 0 ) ? false : true
	
	let listMenuTemplate = [
		{
			label: 'Select All',
			click() { BrowserWindow.getFocusedWindow().webContents.send('select-all', message) }
		},
		{
			label: 'Deselect All',
			click() { BrowserWindow.getFocusedWindow().webContents.send('deselect-all', message) }
		},
		{
			label: 'Toggle Selection',
			click() { BrowserWindow.getFocusedWindow().webContents.send('toggle-selection', message) }
		},
		{
			type: 'separator'
		},
		{
			label: `Order ${capitalized} Fonts A–Z`,
			type: 'checkbox',
			checked: a_z,
			click() { BrowserWindow.getFocusedWindow().webContents.send('reorder', [message, 1]) }
		},
		{
			label: `Order ${capitalized} Fonts Z–A`,
			type: 'checkbox',
			checked: z_a,
			click() { BrowserWindow.getFocusedWindow().webContents.send('reorder', [message, 0]) }
		},
		{
			type: 'separator'
		},
		{
			label: `Show ${capitalized} Fonts Folder in Finder`,
			click() { app.emit('open-folder', message) }
		},
		{
			label: `Choose ${capitalized} Fonts Folder…`,
			click() { app.emit('choose-folder', message) }
		}
	]
	
	const listMenu = Menu.buildFromTemplate(listMenuTemplate)
			
	listMenu.popup(win)
})
