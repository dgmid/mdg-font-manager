const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const dialog = require('electron').dialog
const extract = require('extract-zip')
const fs = require( 'fs-extra' )
const Store = require('electron-store')
const store = new Store()
const tempPath = app.getPath('temp')
var Download, dl

Download = require('./download').Download



//note(@duncanmid): download and unzip font

function downloadFont(id, name, zip) {
	
	dl = new Download('https://google-webfonts-helper.herokuapp.com/api/fonts/' + id + '?download=zip&subsets=latin&formats=ttf', zip)
	
	dl.on('progress', (progress) => {
		
		console.log( name + " - download: " + progress + "%" )
	})
	
	dl.on('end', (code) => {
		
		if (code === 0) {
			
			console.log("finished successfully")
			
			extract( zip , {dir: tempPath + '/com.midwinter-dg.mdg-font-manager/' + name + '/'}, function (err) {
				
				if( err ) {
					
					dialog.showErrorBox(
						'An error occured whilst extracting: ' + name, err.code
					)
				
				} else {
					
					fs.removeSync( zip )
					
					fs.moveSync( tempPath + '/com.midwinter-dg.mdg-font-manager/' + name, store.get('fontDirectories.activePath') + name)
					
					BrowserWindow.getFocusedWindow().webContents.send('remove-bezel', name)
				}
			})
		
		} else {
			
			dialog.showErrorBox(
				'An error occured whilst downloading',
				'The font ' + name + 'was not downloaded'
			)
		}
	})
		
	dl.start()
}



app.on('install-font', (event) => {
	
	var { id, name } = event
	var zip = tempPath + '/com.midwinter-dg.mdg-font-manager/' + id + '.zip'
	
	BrowserWindow.getFocusedWindow().webContents.send('display-bezel', name)
	downloadFont( id, name, zip )
})
