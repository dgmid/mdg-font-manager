'use strict'

const electron = require('electron')
const {shell, app} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
var preview = require('./preview.min')

//todo(@duncanmid): get array of font-names from json file

ipc.on('show-font-menu', (event, message) => {
	
	const fontMenuTemplate = [
		{
			label: `Preview ${message[0]}…`,
			click() { preview.createPreview( message ) }
		},
		{
			type: 'separator'
		},
		{
			label: `Export ${message[0]}…`,
			click() { app.emit('export-single', message)  }
		},
		{
			label: `Delete ${message[0]}`,
			click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('delete-single', message[1]) }
		},
	]
	
	//todo(@duncanmid): if message[0] is in font names, add webfont menu
	
	const fontMenu = Menu.buildFromTemplate(fontMenuTemplate)
	
	const win = BrowserWindow.fromWebContents(event.sender)
	fontMenu.popup(win)
})
