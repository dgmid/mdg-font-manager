const electron = require('electron')
const {shell, app} = require( 'electron' )
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain



/* @group active menu */

const activeMenu = new Menu()

activeMenu.append(new MenuItem({
	label: 'Select All',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('select-active')
	}
}))

activeMenu.append(new MenuItem({
	label: 'Deselect All',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('deselect-active')
	}
}))

activeMenu.append(new MenuItem({
	label: 'Toggle Selection',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('toggle-active')
	}
}))

activeMenu.append(new MenuItem({ type: 'separator' }))

activeMenu.append(new MenuItem({
	label: 'Show Active Fonts Folder in Finder',
	click() { app.emit('open-folder', 'activePath') }
}))

activeMenu.append(new MenuItem({
	label: 'Choose Active Fonts Folder…',
	click: function() {
		app.emit('choose-folder', 'activePath')
	}
}))

/* @end */



/* @group disabled menu */

const disabledMenu = new Menu()

disabledMenu.append(new MenuItem({
	label: 'Select All',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('select-disabled')
	}
}))

disabledMenu.append(new MenuItem({
	label: 'Deselect All',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('deselect-disabled')
	}
}))

disabledMenu.append(new MenuItem({
	label: 'Toggle Selection',
	click: function() {
		BrowserWindow.getFocusedWindow().webContents.send('toggle-disabled')
	}
}))

disabledMenu.append(new MenuItem({ type: 'separator' }))

disabledMenu.append(new MenuItem({
	label: 'Show Disabled Fonts Folder in Finder',
	click() { app.emit('open-folder', 'disabledPath') }
}))

disabledMenu.append(new MenuItem({
	label: 'Choose Disabled Fonts Folder…',
	click: function() {
		app.emit('choose-folder', 'disabledPath')
	}
}))

/* @end */



app.on('browser-window-created', function (event, win) {

	win.webContents.on('context-menu', function (e, params) {
		activeMenu.popup(win, params.x, params.y)
	})

	win.webContents.on('context-menu', function (e, params) {
		disabledMenu.popup(win, params.x, params.y)
	})
})


ipc.on('show-active-menu', function (event) {

	const win = BrowserWindow.fromWebContents(event.sender)
	activeMenu.popup(win)
})


ipc.on('show-disabled-menu', function (event) {

	const win = BrowserWindow.fromWebContents(event.sender)
	disabledMenu.popup(win)
})
