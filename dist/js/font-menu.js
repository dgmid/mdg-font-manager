const electron = require('electron')
const {shell, app} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain



ipc.on('show-font-menu', (event, message) => {
	
	const fontMenuTemplate = [
		/* {
			label: 'Preview ' + message[0],
			click() { console.log(message[1]) }
		},
		{
			type: 'separator'
		}, */
		{
			label: 'Export ' + message[0],
			click() { app.emit('export-single', message)  }
		},
		{
			label: 'Delete ' + message[0],
			click (item, focusedWindow) { if(focusedWindow) focusedWindow.webContents.send('delete-single', message[1]) }
		},
	]
	
	const fontMenu = Menu.buildFromTemplate(fontMenuTemplate)
	
	const win = BrowserWindow.fromWebContents(event.sender)
	fontMenu.popup(win)
})
