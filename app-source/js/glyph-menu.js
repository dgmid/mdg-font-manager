'use strict'

const electron = require('electron')
const {shell, app, clipboard} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
var preview = require('./preview.min')



ipc.on('show-glyph-menu', (event, message) => {
	
	const glyphMenuTemplate = [
		{
			label: `Copy ${message.n} as Unicode`,
			click() { clipboard.writeText(message.u) }
		},
		{
			label: `Copy ${message.n} as Hex code`,
			click() { clipboard.writeText(`&${message.x}`) }
		},
		{
			label: `Copy ${message.n} as HTML code`,
			click() { clipboard.writeText(`&${message.h}`) }
		}
	]
	
	if( message.e ) {
		
		glyphMenuTemplate.push({
			label: `Copy ${message.n} as HTML entity`,
			click() { clipboard.writeText(`&${message.e}`) }
		})
	}
	
	const glyphMenu = Menu.buildFromTemplate(glyphMenuTemplate)
	
	const win = BrowserWindow.fromWebContents(event.sender)
	glyphMenu.popup(win)
})
