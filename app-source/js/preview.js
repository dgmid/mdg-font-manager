'use strict'

const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const url = require('url')
const path = require('path')
const ipc = electron.ipcMain

let preview = null



exports.createPreview = ( message ) => {
	
	preview = new BrowserWindow({
		show: false,
		titleBarStyle: 'hidden',
		width: 800,
		height: 600,
		minWidth: 800,
		minHeight: 300,
		backgroundColor: '#031320',
		webPreferences: { devTools: true }
	})
	
	preview.loadURL(url.format ({ 
		
		pathname: path.join(__dirname, '../html/preview.html'), 
		protocol: 'file:', 
		slashes: true 
	}))
	
	preview.once('ready-to-show', () => {
		
		preview.show()
		preview.webContents.send('selected-font', message)
	})
	
	preview.on('close', () => {
		preview = null
	})
}
