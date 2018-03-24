const {Menu, shell} = require('electron')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const name = app.getName()
var about = require('./about');


//todo(@duncanmid): dynamic updatable google font menu

const template = [
	{
		label: name,
		submenu: [
			{
				label: 'About MDG Font Manager',
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
		label: 'Google Fonts',
		submenu:
		[
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
				label: 'Install Google Font…',
				accelerator: 'Cmd+G',
				submenu:
				[
					{
						label: 'ABeeZee',
						click () { app.emit('install-font', { id: "abeezee", name: "ABeeZee" }) }
					},
					{
						label: 'Abel',
						click () { app.emit('install-font', { id: "abel", name: "Abel" }) }
					},
					{
						label: 'Abhaya Libre',
						click () { app.emit('install-font', { id: "abhaya-libre", name: "Abhaya Libre" }) }
					},
					{
						label: 'Abril Fatface',
						click () { app.emit('install-font', { id: "abril-fatface", name: "Abril Fatface" }) }
					},
					{
						label: 'Aclonica',
						click () { app.emit('install-font', { id: "aclonica", name: "Aclonica" }) }
					},
					{
						label: 'Acme',
						click () { app.emit('install-font', { id: "acme", name: "Acme" }) }
					},
					{
						label: 'Actor',
						click () { app.emit('install-font', { id: "actor", name: "Actor" }) }
					},
					{
						label: 'Adamina',
						click () { app.emit('install-font', { id: "adamina", name: "Adamina" }) }
					},
					{
						label: 'Advent Pro',
						click () { app.emit('install-font', { id: "advent-pro", name: "Advent Pro" }) }
					},
					{
						label: 'Aguafina Script',
						click () { app.emit('install-font', { id: "aguafina-script", name: "Aguafina Script" }) }
					},
					{
						label: 'Akronim',
						click () { app.emit('install-font', { id: "akronim", name: "Akronim" }) }
					},
					{
						label: 'Aladin',
						click () { app.emit('install-font', { id: "aladin", name: "Aladin" }) }
					},
					{
						label: 'Aldrich',
						click () { app.emit('install-font', { id: "aldrich", name: "Aldrich" }) }
					},
					{
						label: 'Alef',
						click () { app.emit('install-font', { id: "alef", name: "Alef" }) }
					},
					{
						label: 'Alegreya',
						click () { app.emit('install-font', { id: "alegreya", name: "Alegreya" }) }
					},
					{
						label: 'Alegreya Sans',
						click () { app.emit('install-font', { id: "alegreya-sans", name: "Alegreya Sans" }) }
					},
					{
						label: 'Alegreya Sans SC',
						click () { app.emit('install-font', { id: "alegreya-sans-sc", name: "Alegreya Sans SC" }) }
					},
					{
						label: 'Alegreya SC',
						click () { app.emit('install-font', { id: "alegreya-sc", name: "Alegreya SC" }) }
					},
					{
						label: 'Alex Brush',
						click () { app.emit('install-font', { id: "alex-brush", name: "Alex Brush" }) }
					},
					{
						label: 'Alfa Slab One',
						click () { app.emit('install-font', { id: "alfa-slab-one", name: "Alfa Slab One" }) }
					},
					{
						label: 'Alice',
						click () { app.emit('install-font', { id: "alice", name: "Alice" }) }
					},
					{
						label: 'Alike',
						click () { app.emit('install-font', { id: "alike", name: "Alike" }) }
					},
					{
						label: 'Alike Angular',
						click () { app.emit('install-font', { id: "alike-angular", name: "Alike Angular" }) }
					},
					{
						label: 'Allan',
						click () { app.emit('install-font', { id: "allan", name: "Allan" }) }
					},
					{
						label: 'Allerta',
						click () { app.emit('install-font', { id: "allerta", name: "Allerta" }) }
					},
					{
						label: 'Allerta Stencil',
						click () { app.emit('install-font', { id: "allerta-stencil", name: "Allerta Stencil" }) }
					},
					{
						label: 'Allura',
						click () { app.emit('install-font', { id: "allura", name: "Allura" }) }
					},
					{
						label: 'Almendra',
						click () { app.emit('install-font', { id: "almendra", name: "Almendra" }) }
					},
					{
						label: 'Almendra Display',
						click () { app.emit('install-font', { id: "almendra-display", name: "Almendra Display" }) }
					},
					{
						label: 'Almendra SC',
						click () { app.emit('install-font', { id: "almendra-sc", name: "Almendra SC" }) }
					},
					{
						label: 'Amarante',
						click () { app.emit('install-font', { id: "amarante", name: "Amarante" }) }
					},
					{
						label: 'Amaranth',
						click () { app.emit('install-font', { id: "amaranth", name: "Amaranth" }) }
					},
					{
						label: 'Amatic SC',
						click () { app.emit('install-font', { id: "amatic-sc", name: "Amatic SC" }) }
					},
					{
						label: 'Amethysta',
						click () { app.emit('install-font', { id: "amethysta", name: "Amethysta" }) }
					},
					{
						label: 'Amiko',
						click () { app.emit('install-font', { id: "amiko", name: "Amiko" }) }
					},
					{
						label: 'Amiri',
						click () { app.emit('install-font', { id: "amiri", name: "Amiri" }) }
					},
					{
						label: 'Amita',
						click () { app.emit('install-font', { id: "amita", name: "Amita" }) }
					},
					{
						label: 'Anaheim',
						click () { app.emit('install-font', { id: "anaheim", name: "Anaheim" }) }
					},
					{
						label: 'Andada',
						click () { app.emit('install-font', { id: "andada", name: "Andada" }) }
					},
					{
						label: 'Andika',
						click () { app.emit('install-font', { id: "andika", name: "Andika" }) }
					},
					{
						label: 'Angkor',
						click () { app.emit('install-font', { id: "angkor", name: "Angkor" }) }
					},
					{
						label: 'Annie Use Your Telescope',
						click () { app.emit('install-font', { id: "annie-use-your-telescope", name: "Annie Use Your Telescope" }) }
					},
					{
						label: 'Anonymous Pro',
						click () { app.emit('install-font', { id: "anonymous-pro", name: "Anonymous Pro" }) }
					},
					{
						label: 'Antic',
						click () { app.emit('install-font', { id: "antic", name: "Antic" }) }
					},
					{
						label: 'Antic Didone',
						click () { app.emit('install-font', { id: "antic-didone", name: "Antic Didone" }) }
					},
					{
						label: 'Antic Slab',
						click () { app.emit('install-font', { id: "antic-slab", name: "Antic Slab" }) }
					},
					{
						label: 'Anton',
						click () { app.emit('install-font', { id: "anton", name: "Anton" }) }
					},
					{
						label: 'Arapey',
						click () { app.emit('install-font', { id: "arapey", name: "Arapey" }) }
					},
					{
						label: 'Arbutus',
						click () { app.emit('install-font', { id: "arbutus", name: "Arbutus" }) }
					},
					{
						label: 'Arbutus Slab',
						click () { app.emit('install-font', { id: "arbutus-slab", name: "Arbutus Slab" }) }
					},
					{
						label: 'Architects Daughter',
						click () { app.emit('install-font', { id: "architects-daughter", name: "Architects Daughter" }) }
					},
					{
						label: 'Archivo',
						click () { app.emit('install-font', { id: "archivo", name: "Archivo" }) }
					},
					{
						label: 'Archivo Black',
						click () { app.emit('install-font', { id: "archivo-black", name: "Archivo Black" }) }
					},
					{
						label: 'Archivo Narrow',
						click () { app.emit('install-font', { id: "archivo-narrow", name: "Archivo Narrow" }) }
					},
					{
						label: 'Aref Ruqaa',
						click () { app.emit('install-font', { id: "aref-ruqaa", name: "Aref Ruqaa" }) }
					},
					{
						label: 'Arima Madurai',
						click () { app.emit('install-font', { id: "arima-madurai", name: "Arima Madurai" }) }
					},
					{
						label: 'Arimo',
						click () { app.emit('install-font', { id: "arimo", name: "Arimo" }) }
					},
					{
						label: 'Arizonia',
						click () { app.emit('install-font', { id: "arizonia", name: "Arizonia" }) }
					},
					{
						label: 'Armata',
						click () { app.emit('install-font', { id: "armata", name: "Armata" }) }
					},
					{
						label: 'Arsenal',
						click () { app.emit('install-font', { id: "arsenal", name: "Arsenal" }) }
					},
					{
						label: 'Artifika',
						click () { app.emit('install-font', { id: "artifika", name: "Artifika" }) }
					},
					{
						label: 'Arvo',
						click () { app.emit('install-font', { id: "arvo", name: "Arvo" }) }
					},
					{
						label: 'Arya',
						click () { app.emit('install-font', { id: "arya", name: "Arya" }) }
					},
					{
						label: 'Asap',
						click () { app.emit('install-font', { id: "asap", name: "Asap" }) }
					},
					{
						label: 'Asap Condensed',
						click () { app.emit('install-font', { id: "asap-condensed", name: "Asap Condensed" }) }
					},
					{
						label: 'Asar',
						click () { app.emit('install-font', { id: "asar", name: "Asar" }) }
					},
					{
						label: 'Asset',
						click () { app.emit('install-font', { id: "asset", name: "Asset" }) }
					},
					{
						label: 'Assistant',
						click () { app.emit('install-font', { id: "assistant", name: "Assistant" }) }
					},
					{
						label: 'Astloch',
						click () { app.emit('install-font', { id: "astloch", name: "Astloch" }) }
					},
					{
						label: 'Asul',
						click () { app.emit('install-font', { id: "asul", name: "Asul" }) }
					},
					{
						label: 'Athiti',
						click () { app.emit('install-font', { id: "athiti", name: "Athiti" }) }
					},
					{
						label: 'Atma',
						click () { app.emit('install-font', { id: "atma", name: "Atma" }) }
					},
					{
						label: 'Atomic Age',
						click () { app.emit('install-font', { id: "atomic-age", name: "Atomic Age" }) }
					},
					{
						label: 'Aubrey',
						click () { app.emit('install-font', { id: "aubrey", name: "Aubrey" }) }
					},
					{
						label: 'Audiowide',
						click () { app.emit('install-font', { id: "audiowide", name: "Audiowide" }) }
					},
					{
						label: 'Autour One',
						click () { app.emit('install-font', { id: "autour-one", name: "Autour One" }) }
					},
					{
						label: 'Average',
						click () { app.emit('install-font', { id: "average", name: "Average" }) }
					},
					{
						label: 'Average Sans',
						click () { app.emit('install-font', { id: "average-sans", name: "Average Sans" }) }
					},
					{
						label: 'Averia Gruesa Libre',
						click () { app.emit('install-font', { id: "averia-gruesa-libre", name: "Averia Gruesa Libre" }) }
					},
					{
						label: 'Averia Libre',
						click () { app.emit('install-font', { id: "averia-libre", name: "Averia Libre" }) }
					},
					{
						label: 'Averia Sans Libre',
						click () { app.emit('install-font', { id: "averia-sans-libre", name: "Averia Sans Libre" }) }
					},
					{
						label: 'Averia Serif Libre',
						click () { app.emit('install-font', { id: "averia-serif-libre", name: "Averia Serif Libre" }) }
					},
					{
						label: 'Bad Script',
						click () { app.emit('install-font', { id: "bad-script", name: "Bad Script" }) }
					},
					{
						label: 'Bahiana',
						click () { app.emit('install-font', { id: "bahiana", name: "Bahiana" }) }
					},
					{
						label: 'Baloo',
						click () { app.emit('install-font', { id: "baloo", name: "Baloo" }) }
					},
					{
						label: 'Baloo Bhai',
						click () { app.emit('install-font', { id: "baloo-bhai", name: "Baloo Bhai" }) }
					},
					{
						label: 'Baloo Bhaijaan',
						click () { app.emit('install-font', { id: "baloo-bhaijaan", name: "Baloo Bhaijaan" }) }
					},
					{
						label: 'Baloo Bhaina',
						click () { app.emit('install-font', { id: "baloo-bhaina", name: "Baloo Bhaina" }) }
					},
					{
						label: 'Baloo Chettan',
						click () { app.emit('install-font', { id: "baloo-chettan", name: "Baloo Chettan" }) }
					},
					{
						label: 'Baloo Da',
						click () { app.emit('install-font', { id: "baloo-da", name: "Baloo Da" }) }
					},
					{
						label: 'Baloo Paaji',
						click () { app.emit('install-font', { id: "baloo-paaji", name: "Baloo Paaji" }) }
					},
					{
						label: 'Baloo Tamma',
						click () { app.emit('install-font', { id: "baloo-tamma", name: "Baloo Tamma" }) }
					},
					{
						label: 'Baloo Tammudu',
						click () { app.emit('install-font', { id: "baloo-tammudu", name: "Baloo Tammudu" }) }
					},
					{
						label: 'Baloo Thambi',
						click () { app.emit('install-font', { id: "baloo-thambi", name: "Baloo Thambi" }) }
					},
					{
						label: 'Balthazar',
						click () { app.emit('install-font', { id: "balthazar", name: "Balthazar" }) }
					},
					{
						label: 'Bangers',
						click () { app.emit('install-font', { id: "bangers", name: "Bangers" }) }
					},
					{
						label: 'Barlow',
						click () { app.emit('install-font', { id: "barlow", name: "Barlow" }) }
					},
					{
						label: 'Barlow Condensed',
						click () { app.emit('install-font', { id: "barlow-condensed", name: "Barlow Condensed" }) }
					},
					{
						label: 'Barlow Semi Condensed',
						click () { app.emit('install-font', { id: "barlow-semi-condensed", name: "Barlow Semi Condensed" }) }
					},
					{
						label: 'Barrio',
						click () { app.emit('install-font', { id: "barrio", name: "Barrio" }) }
					},
					{
						label: 'Basic',
						click () { app.emit('install-font', { id: "basic", name: "Basic" }) }
					},
					{
						label: 'Battambang',
						click () { app.emit('install-font', { id: "battambang", name: "Battambang" }) }
					},
					{
						label: 'Baumans',
						click () { app.emit('install-font', { id: "baumans", name: "Baumans" }) }
					},
					{
						label: 'Bayon',
						click () { app.emit('install-font', { id: "bayon", name: "Bayon" }) }
					},
					{
						label: 'Belgrano',
						click () { app.emit('install-font', { id: "belgrano", name: "Belgrano" }) }
					},
					{
						label: 'Bellefair',
						click () { app.emit('install-font', { id: "bellefair", name: "Bellefair" }) }
					},
					{
						label: 'Belleza',
						click () { app.emit('install-font', { id: "belleza", name: "Belleza" }) }
					},
					{
						label: 'BenchNine',
						click () { app.emit('install-font', { id: "benchnine", name: "BenchNine" }) }
					},
					{
						label: 'Bentham',
						click () { app.emit('install-font', { id: "bentham", name: "Bentham" }) }
					},
					{
						label: 'Berkshire Swash',
						click () { app.emit('install-font', { id: "berkshire-swash", name: "Berkshire Swash" }) }
					},
					{
						label: 'Bevan',
						click () { app.emit('install-font', { id: "bevan", name: "Bevan" }) }
					},
					{
						label: 'Bigelow Rules',
						click () { app.emit('install-font', { id: "bigelow-rules", name: "Bigelow Rules" }) }
					},
					{
						label: 'Bigshot One',
						click () { app.emit('install-font', { id: "bigshot-one", name: "Bigshot One" }) }
					},
					{
						label: 'Bilbo',
						click () { app.emit('install-font', { id: "bilbo", name: "Bilbo" }) }
					},
					{
						label: 'Bilbo Swash Caps',
						click () { app.emit('install-font', { id: "bilbo-swash-caps", name: "Bilbo Swash Caps" }) }
					},
					{
						label: 'BioRhyme',
						click () { app.emit('install-font', { id: "biorhyme", name: "BioRhyme" }) }
					},
					{
						label: 'BioRhyme Expanded',
						click () { app.emit('install-font', { id: "biorhyme-expanded", name: "BioRhyme Expanded" }) }
					},
					{
						label: 'Biryani',
						click () { app.emit('install-font', { id: "biryani", name: "Biryani" }) }
					},
					{
						label: 'Bitter',
						click () { app.emit('install-font', { id: "bitter", name: "Bitter" }) }
					},
					{
						label: 'Black Ops One',
						click () { app.emit('install-font', { id: "black-ops-one", name: "Black Ops One" }) }
					},
					{
						label: 'Bokor',
						click () { app.emit('install-font', { id: "bokor", name: "Bokor" }) }
					},
					{
						label: 'Bonbon',
						click () { app.emit('install-font', { id: "bonbon", name: "Bonbon" }) }
					},
					{
						label: 'Boogaloo',
						click () { app.emit('install-font', { id: "boogaloo", name: "Boogaloo" }) }
					},
					{
						label: 'Bowlby One',
						click () { app.emit('install-font', { id: "bowlby-one", name: "Bowlby One" }) }
					},
					{
						label: 'Bowlby One SC',
						click () { app.emit('install-font', { id: "bowlby-one-sc", name: "Bowlby One SC" }) }
					},
					{
						label: 'Brawler',
						click () { app.emit('install-font', { id: "brawler", name: "Brawler" }) }
					},
					{
						label: 'Bree Serif',
						click () { app.emit('install-font', { id: "bree-serif", name: "Bree Serif" }) }
					},
					{
						label: 'Bubblegum Sans',
						click () { app.emit('install-font', { id: "bubblegum-sans", name: "Bubblegum Sans" }) }
					},
					{
						label: 'Bubbler One',
						click () { app.emit('install-font', { id: "bubbler-one", name: "Bubbler One" }) }
					},
					{
						label: 'Buda',
						click () { app.emit('install-font', { id: "buda", name: "Buda" }) }
					},
					{
						label: 'Buenard',
						click () { app.emit('install-font', { id: "buenard", name: "Buenard" }) }
					},
					{
						label: 'Bungee',
						click () { app.emit('install-font', { id: "bungee", name: "Bungee" }) }
					},
					{
						label: 'Bungee Hairline',
						click () { app.emit('install-font', { id: "bungee-hairline", name: "Bungee Hairline" }) }
					},
					{
						label: 'Bungee Inline',
						click () { app.emit('install-font', { id: "bungee-inline", name: "Bungee Inline" }) }
					},
					{
						label: 'Bungee Outline',
						click () { app.emit('install-font', { id: "bungee-outline", name: "Bungee Outline" }) }
					},
					{
						label: 'Bungee Shade',
						click () { app.emit('install-font', { id: "bungee-shade", name: "Bungee Shade" }) }
					},
					{
						label: 'Butcherman',
						click () { app.emit('install-font', { id: "butcherman", name: "Butcherman" }) }
					},
					{
						label: 'Butterfly Kids',
						click () { app.emit('install-font', { id: "butterfly-kids", name: "Butterfly Kids" }) }
					},
					{
						label: 'Cabin',
						click () { app.emit('install-font', { id: "cabin", name: "Cabin" }) }
					},
					{
						label: 'Cabin Condensed',
						click () { app.emit('install-font', { id: "cabin-condensed", name: "Cabin Condensed" }) }
					},
					{
						label: 'Cabin Sketch',
						click () { app.emit('install-font', { id: "cabin-sketch", name: "Cabin Sketch" }) }
					},
					{
						label: 'Caesar Dressing',
						click () { app.emit('install-font', { id: "caesar-dressing", name: "Caesar Dressing" }) }
					},
					{
						label: 'Cagliostro',
						click () { app.emit('install-font', { id: "cagliostro", name: "Cagliostro" }) }
					},
					{
						label: 'Cairo',
						click () { app.emit('install-font', { id: "cairo", name: "Cairo" }) }
					},
					{
						label: 'Calligraffitti',
						click () { app.emit('install-font', { id: "calligraffitti", name: "Calligraffitti" }) }
					},
					{
						label: 'Cambay',
						click () { app.emit('install-font', { id: "cambay", name: "Cambay" }) }
					},
					{
						label: 'Cambo',
						click () { app.emit('install-font', { id: "cambo", name: "Cambo" }) }
					},
					{
						label: 'Candal',
						click () { app.emit('install-font', { id: "candal", name: "Candal" }) }
					},
					{
						label: 'Cantarell',
						click () { app.emit('install-font', { id: "cantarell", name: "Cantarell" }) }
					},
					{
						label: 'Cantata One',
						click () { app.emit('install-font', { id: "cantata-one", name: "Cantata One" }) }
					},
					{
						label: 'Cantora One',
						click () { app.emit('install-font', { id: "cantora-one", name: "Cantora One" }) }
					},
					{
						label: 'Capriola',
						click () { app.emit('install-font', { id: "capriola", name: "Capriola" }) }
					},
					{
						label: 'Cardo',
						click () { app.emit('install-font', { id: "cardo", name: "Cardo" }) }
					},
					{
						label: 'Carme',
						click () { app.emit('install-font', { id: "carme", name: "Carme" }) }
					},
					{
						label: 'Carrois Gothic',
						click () { app.emit('install-font', { id: "carrois-gothic", name: "Carrois Gothic" }) }
					},
					{
						label: 'Carrois Gothic SC',
						click () { app.emit('install-font', { id: "carrois-gothic-sc", name: "Carrois Gothic SC" }) }
					},
					{
						label: 'Carter One',
						click () { app.emit('install-font', { id: "carter-one", name: "Carter One" }) }
					},
					{
						label: 'Catamaran',
						click () { app.emit('install-font', { id: "catamaran", name: "Catamaran" }) }
					},
					{
						label: 'Caudex',
						click () { app.emit('install-font', { id: "caudex", name: "Caudex" }) }
					},
					{
						label: 'Caveat',
						click () { app.emit('install-font', { id: "caveat", name: "Caveat" }) }
					},
					{
						label: 'Caveat Brush',
						click () { app.emit('install-font', { id: "caveat-brush", name: "Caveat Brush" }) }
					},
					{
						label: 'Cedarville Cursive',
						click () { app.emit('install-font', { id: "cedarville-cursive", name: "Cedarville Cursive" }) }
					},
					{
						label: 'Ceviche One',
						click () { app.emit('install-font', { id: "ceviche-one", name: "Ceviche One" }) }
					},
					{
						label: 'Changa',
						click () { app.emit('install-font', { id: "changa", name: "Changa" }) }
					},
					{
						label: 'Changa One',
						click () { app.emit('install-font', { id: "changa-one", name: "Changa One" }) }
					},
					{
						label: 'Chango',
						click () { app.emit('install-font', { id: "chango", name: "Chango" }) }
					},
					{
						label: 'Chathura',
						click () { app.emit('install-font', { id: "chathura", name: "Chathura" }) }
					},
					{
						label: 'Chau Philomene One',
						click () { app.emit('install-font', { id: "chau-philomene-one", name: "Chau Philomene One" }) }
					},
					{
						label: 'Chela One',
						click () { app.emit('install-font', { id: "chela-one", name: "Chela One" }) }
					},
					{
						label: 'Chelsea Market',
						click () { app.emit('install-font', { id: "chelsea-market", name: "Chelsea Market" }) }
					},
					{
						label: 'Chenla',
						click () { app.emit('install-font', { id: "chenla", name: "Chenla" }) }
					},
					{
						label: 'Cherry Cream Soda',
						click () { app.emit('install-font', { id: "cherry-cream-soda", name: "Cherry Cream Soda" }) }
					},
					{
						label: 'Cherry Swash',
						click () { app.emit('install-font', { id: "cherry-swash", name: "Cherry Swash" }) }
					},
					{
						label: 'Chewy',
						click () { app.emit('install-font', { id: "chewy", name: "Chewy" }) }
					},
					{
						label: 'Chicle',
						click () { app.emit('install-font', { id: "chicle", name: "Chicle" }) }
					},
					{
						label: 'Chivo',
						click () { app.emit('install-font', { id: "chivo", name: "Chivo" }) }
					},
					{
						label: 'Chonburi',
						click () { app.emit('install-font', { id: "chonburi", name: "Chonburi" }) }
					},
					{
						label: 'Cinzel',
						click () { app.emit('install-font', { id: "cinzel", name: "Cinzel" }) }
					},
					{
						label: 'Cinzel Decorative',
						click () { app.emit('install-font', { id: "cinzel-decorative", name: "Cinzel Decorative" }) }
					},
					{
						label: 'Clicker Script',
						click () { app.emit('install-font', { id: "clicker-script", name: "Clicker Script" }) }
					},
					{
						label: 'Coda',
						click () { app.emit('install-font', { id: "coda", name: "Coda" }) }
					},
					{
						label: 'Coda Caption',
						click () { app.emit('install-font', { id: "coda-caption", name: "Coda Caption" }) }
					},
					{
						label: 'Codystar',
						click () { app.emit('install-font', { id: "codystar", name: "Codystar" }) }
					},
					{
						label: 'Coiny',
						click () { app.emit('install-font', { id: "coiny", name: "Coiny" }) }
					},
					{
						label: 'Combo',
						click () { app.emit('install-font', { id: "combo", name: "Combo" }) }
					},
					{
						label: 'Comfortaa',
						click () { app.emit('install-font', { id: "comfortaa", name: "Comfortaa" }) }
					},
					{
						label: 'Coming Soon',
						click () { app.emit('install-font', { id: "coming-soon", name: "Coming Soon" }) }
					},
					{
						label: 'Concert One',
						click () { app.emit('install-font', { id: "concert-one", name: "Concert One" }) }
					},
					{
						label: 'Condiment',
						click () { app.emit('install-font', { id: "condiment", name: "Condiment" }) }
					},
					{
						label: 'Content',
						click () { app.emit('install-font', { id: "content", name: "Content" }) }
					},
					{
						label: 'Contrail One',
						click () { app.emit('install-font', { id: "contrail-one", name: "Contrail One" }) }
					},
					{
						label: 'Convergence',
						click () { app.emit('install-font', { id: "convergence", name: "Convergence" }) }
					},
					{
						label: 'Cookie',
						click () { app.emit('install-font', { id: "cookie", name: "Cookie" }) }
					},
					{
						label: 'Copse',
						click () { app.emit('install-font', { id: "copse", name: "Copse" }) }
					},
					{
						label: 'Corben',
						click () { app.emit('install-font', { id: "corben", name: "Corben" }) }
					},
					{
						label: 'Cormorant',
						click () { app.emit('install-font', { id: "cormorant", name: "Cormorant" }) }
					},
					{
						label: 'Cormorant Garamond',
						click () { app.emit('install-font', { id: "cormorant-garamond", name: "Cormorant Garamond" }) }
					},
					{
						label: 'Cormorant Infant',
						click () { app.emit('install-font', { id: "cormorant-infant", name: "Cormorant Infant" }) }
					},
					{
						label: 'Cormorant SC',
						click () { app.emit('install-font', { id: "cormorant-sc", name: "Cormorant SC" }) }
					},
					{
						label: 'Cormorant Unicase',
						click () { app.emit('install-font', { id: "cormorant-unicase", name: "Cormorant Unicase" }) }
					},
					{
						label: 'Cormorant Upright',
						click () { app.emit('install-font', { id: "cormorant-upright", name: "Cormorant Upright" }) }
					},
					{
						label: 'Courgette',
						click () { app.emit('install-font', { id: "courgette", name: "Courgette" }) }
					},
					{
						label: 'Cousine',
						click () { app.emit('install-font', { id: "cousine", name: "Cousine" }) }
					},
					{
						label: 'Coustard',
						click () { app.emit('install-font', { id: "coustard", name: "Coustard" }) }
					},
					{
						label: 'Covered By Your Grace',
						click () { app.emit('install-font', { id: "covered-by-your-grace", name: "Covered By Your Grace" }) }
					},
					{
						label: 'Crafty Girls',
						click () { app.emit('install-font', { id: "crafty-girls", name: "Crafty Girls" }) }
					},
					{
						label: 'Creepster',
						click () { app.emit('install-font', { id: "creepster", name: "Creepster" }) }
					},
					{
						label: 'Crete Round',
						click () { app.emit('install-font', { id: "crete-round", name: "Crete Round" }) }
					},
					{
						label: 'Crimson Text',
						click () { app.emit('install-font', { id: "crimson-text", name: "Crimson Text" }) }
					},
					{
						label: 'Croissant One',
						click () { app.emit('install-font', { id: "croissant-one", name: "Croissant One" }) }
					},
					{
						label: 'Crushed',
						click () { app.emit('install-font', { id: "crushed", name: "Crushed" }) }
					},
					{
						label: 'Cuprum',
						click () { app.emit('install-font', { id: "cuprum", name: "Cuprum" }) }
					},
					{
						label: 'Cutive',
						click () { app.emit('install-font', { id: "cutive", name: "Cutive" }) }
					},
					{
						label: 'Cutive Mono',
						click () { app.emit('install-font', { id: "cutive-mono", name: "Cutive Mono" }) }
					},
					{
						label: 'Damion',
						click () { app.emit('install-font', { id: "damion", name: "Damion" }) }
					},
					{
						label: 'Dancing Script',
						click () { app.emit('install-font', { id: "dancing-script", name: "Dancing Script" }) }
					},
					{
						label: 'Dangrek',
						click () { app.emit('install-font', { id: "dangrek", name: "Dangrek" }) }
					},
					{
						label: 'David Libre',
						click () { app.emit('install-font', { id: "david-libre", name: "David Libre" }) }
					},
					{
						label: 'Dawning of a New Day',
						click () { app.emit('install-font', { id: "dawning-of-a-new-day", name: "Dawning of a New Day" }) }
					},
					{
						label: 'Days One',
						click () { app.emit('install-font', { id: "days-one", name: "Days One" }) }
					},
					{
						label: 'Dekko',
						click () { app.emit('install-font', { id: "dekko", name: "Dekko" }) }
					},
					{
						label: 'Delius',
						click () { app.emit('install-font', { id: "delius", name: "Delius" }) }
					},
					{
						label: 'Delius Swash Caps',
						click () { app.emit('install-font', { id: "delius-swash-caps", name: "Delius Swash Caps" }) }
					},
					{
						label: 'Delius Unicase',
						click () { app.emit('install-font', { id: "delius-unicase", name: "Delius Unicase" }) }
					},
					{
						label: 'Della Respira',
						click () { app.emit('install-font', { id: "della-respira", name: "Della Respira" }) }
					},
					{
						label: 'Denk One',
						click () { app.emit('install-font', { id: "denk-one", name: "Denk One" }) }
					},
					{
						label: 'Devonshire',
						click () { app.emit('install-font', { id: "devonshire", name: "Devonshire" }) }
					},
					{
						label: 'Dhurjati',
						click () { app.emit('install-font', { id: "dhurjati", name: "Dhurjati" }) }
					},
					{
						label: 'Didact Gothic',
						click () { app.emit('install-font', { id: "didact-gothic", name: "Didact Gothic" }) }
					},
					{
						label: 'Diplomata',
						click () { app.emit('install-font', { id: "diplomata", name: "Diplomata" }) }
					},
					{
						label: 'Diplomata SC',
						click () { app.emit('install-font', { id: "diplomata-sc", name: "Diplomata SC" }) }
					},
					{
						label: 'Domine',
						click () { app.emit('install-font', { id: "domine", name: "Domine" }) }
					},
					{
						label: 'Donegal One',
						click () { app.emit('install-font', { id: "donegal-one", name: "Donegal One" }) }
					},
					{
						label: 'Doppio One',
						click () { app.emit('install-font', { id: "doppio-one", name: "Doppio One" }) }
					},
					{
						label: 'Dorsa',
						click () { app.emit('install-font', { id: "dorsa", name: "Dorsa" }) }
					},
					{
						label: 'Dosis',
						click () { app.emit('install-font', { id: "dosis", name: "Dosis" }) }
					},
					{
						label: 'Dr Sugiyama',
						click () { app.emit('install-font', { id: "dr-sugiyama", name: "Dr Sugiyama" }) }
					},
					{
						label: 'Duru Sans',
						click () { app.emit('install-font', { id: "duru-sans", name: "Duru Sans" }) }
					},
					{
						label: 'Dynalight',
						click () { app.emit('install-font', { id: "dynalight", name: "Dynalight" }) }
					},
					{
						label: 'Eagle Lake',
						click () { app.emit('install-font', { id: "eagle-lake", name: "Eagle Lake" }) }
					},
					{
						label: 'Eater',
						click () { app.emit('install-font', { id: "eater", name: "Eater" }) }
					},
					{
						label: 'EB Garamond',
						click () { app.emit('install-font', { id: "eb-garamond", name: "EB Garamond" }) }
					},
					{
						label: 'Economica',
						click () { app.emit('install-font', { id: "economica", name: "Economica" }) }
					},
					{
						label: 'Eczar',
						click () { app.emit('install-font', { id: "eczar", name: "Eczar" }) }
					},
					{
						label: 'El Messiri',
						click () { app.emit('install-font', { id: "el-messiri", name: "El Messiri" }) }
					},
					{
						label: 'Electrolize',
						click () { app.emit('install-font', { id: "electrolize", name: "Electrolize" }) }
					},
					{
						label: 'Elsie',
						click () { app.emit('install-font', { id: "elsie", name: "Elsie" }) }
					},
					{
						label: 'Elsie Swash Caps',
						click () { app.emit('install-font', { id: "elsie-swash-caps", name: "Elsie Swash Caps" }) }
					},
					{
						label: 'Emblema One',
						click () { app.emit('install-font', { id: "emblema-one", name: "Emblema One" }) }
					},
					{
						label: 'Emilys Candy',
						click () { app.emit('install-font', { id: "emilys-candy", name: "Emilys Candy" }) }
					},
					{
						label: 'Encode Sans',
						click () { app.emit('install-font', { id: "encode-sans", name: "Encode Sans" }) }
					},
					{
						label: 'Encode Sans Condensed',
						click () { app.emit('install-font', { id: "encode-sans-condensed", name: "Encode Sans Condensed" }) }
					},
					{
						label: 'Encode Sans Expanded',
						click () { app.emit('install-font', { id: "encode-sans-expanded", name: "Encode Sans Expanded" }) }
					},
					{
						label: 'Encode Sans Semi Condensed',
						click () { app.emit('install-font', { id: "encode-sans-semi-condensed", name: "Encode Sans Semi Condensed" }) }
					},
					{
						label: 'Encode Sans Semi Expanded',
						click () { app.emit('install-font', { id: "encode-sans-semi-expanded", name: "Encode Sans Semi Expanded" }) }
					},
					{
						label: 'Engagement',
						click () { app.emit('install-font', { id: "engagement", name: "Engagement" }) }
					},
					{
						label: 'Englebert',
						click () { app.emit('install-font', { id: "englebert", name: "Englebert" }) }
					},
					{
						label: 'Enriqueta',
						click () { app.emit('install-font', { id: "enriqueta", name: "Enriqueta" }) }
					},
					{
						label: 'Erica One',
						click () { app.emit('install-font', { id: "erica-one", name: "Erica One" }) }
					},
					{
						label: 'Esteban',
						click () { app.emit('install-font', { id: "esteban", name: "Esteban" }) }
					},
					{
						label: 'Euphoria Script',
						click () { app.emit('install-font', { id: "euphoria-script", name: "Euphoria Script" }) }
					},
					{
						label: 'Ewert',
						click () { app.emit('install-font', { id: "ewert", name: "Ewert" }) }
					},
					{
						label: 'Exo',
						click () { app.emit('install-font', { id: "exo", name: "Exo" }) }
					},
					{
						label: 'Exo 2',
						click () { app.emit('install-font', { id: "exo-2", name: "Exo 2" }) }
					},
					{
						label: 'Expletus Sans',
						click () { app.emit('install-font', { id: "expletus-sans", name: "Expletus Sans" }) }
					},
					{
						label: 'Fanwood Text',
						click () { app.emit('install-font', { id: "fanwood-text", name: "Fanwood Text" }) }
					},
					{
						label: 'Farsan',
						click () { app.emit('install-font', { id: "farsan", name: "Farsan" }) }
					},
					{
						label: 'Fascinate',
						click () { app.emit('install-font', { id: "fascinate", name: "Fascinate" }) }
					},
					{
						label: 'Fascinate Inline',
						click () { app.emit('install-font', { id: "fascinate-inline", name: "Fascinate Inline" }) }
					},
					{
						label: 'Faster One',
						click () { app.emit('install-font', { id: "faster-one", name: "Faster One" }) }
					},
					{
						label: 'Fasthand',
						click () { app.emit('install-font', { id: "fasthand", name: "Fasthand" }) }
					},
					{
						label: 'Fauna One',
						click () { app.emit('install-font', { id: "fauna-one", name: "Fauna One" }) }
					},
					{
						label: 'Faustina',
						click () { app.emit('install-font', { id: "faustina", name: "Faustina" }) }
					},
					{
						label: 'Federant',
						click () { app.emit('install-font', { id: "federant", name: "Federant" }) }
					},
					{
						label: 'Federo',
						click () { app.emit('install-font', { id: "federo", name: "Federo" }) }
					},
					{
						label: 'Felipa',
						click () { app.emit('install-font', { id: "felipa", name: "Felipa" }) }
					},
					{
						label: 'Fenix',
						click () { app.emit('install-font', { id: "fenix", name: "Fenix" }) }
					},
					{
						label: 'Finger Paint',
						click () { app.emit('install-font', { id: "finger-paint", name: "Finger Paint" }) }
					},
					{
						label: 'Fira Mono',
						click () { app.emit('install-font', { id: "fira-mono", name: "Fira Mono" }) }
					},
					{
						label: 'Fira Sans',
						click () { app.emit('install-font', { id: "fira-sans", name: "Fira Sans" }) }
					},
					{
						label: 'Fira Sans Condensed',
						click () { app.emit('install-font', { id: "fira-sans-condensed", name: "Fira Sans Condensed" }) }
					},
					{
						label: 'Fira Sans Extra Condensed',
						click () { app.emit('install-font', { id: "fira-sans-extra-condensed", name: "Fira Sans Extra Condensed" }) }
					},
					{
						label: 'Fjalla One',
						click () { app.emit('install-font', { id: "fjalla-one", name: "Fjalla One" }) }
					},
					{
						label: 'Fjord One',
						click () { app.emit('install-font', { id: "fjord-one", name: "Fjord One" }) }
					},
					{
						label: 'Flamenco',
						click () { app.emit('install-font', { id: "flamenco", name: "Flamenco" }) }
					},
					{
						label: 'Flavors',
						click () { app.emit('install-font', { id: "flavors", name: "Flavors" }) }
					},
					{
						label: 'Fondamento',
						click () { app.emit('install-font', { id: "fondamento", name: "Fondamento" }) }
					},
					{
						label: 'Fontdiner Swanky',
						click () { app.emit('install-font', { id: "fontdiner-swanky", name: "Fontdiner Swanky" }) }
					},
					{
						label: 'Forum',
						click () { app.emit('install-font', { id: "forum", name: "Forum" }) }
					},
					{
						label: 'Francois One',
						click () { app.emit('install-font', { id: "francois-one", name: "Francois One" }) }
					},
					{
						label: 'Frank Ruhl Libre',
						click () { app.emit('install-font', { id: "frank-ruhl-libre", name: "Frank Ruhl Libre" }) }
					},
					{
						label: 'Freckle Face',
						click () { app.emit('install-font', { id: "freckle-face", name: "Freckle Face" }) }
					},
					{
						label: 'Fredericka the Great',
						click () { app.emit('install-font', { id: "fredericka-the-great", name: "Fredericka the Great" }) }
					},
					{
						label: 'Fredoka One',
						click () { app.emit('install-font', { id: "fredoka-one", name: "Fredoka One" }) }
					},
					{
						label: 'Freehand',
						click () { app.emit('install-font', { id: "freehand", name: "Freehand" }) }
					},
					{
						label: 'Fresca',
						click () { app.emit('install-font', { id: "fresca", name: "Fresca" }) }
					},
					{
						label: 'Frijole',
						click () { app.emit('install-font', { id: "frijole", name: "Frijole" }) }
					},
					{
						label: 'Fruktur',
						click () { app.emit('install-font', { id: "fruktur", name: "Fruktur" }) }
					},
					{
						label: 'Fugaz One',
						click () { app.emit('install-font', { id: "fugaz-one", name: "Fugaz One" }) }
					},
					{
						label: 'Gabriela',
						click () { app.emit('install-font', { id: "gabriela", name: "Gabriela" }) }
					},
					{
						label: 'Gafata',
						click () { app.emit('install-font', { id: "gafata", name: "Gafata" }) }
					},
					{
						label: 'Galada',
						click () { app.emit('install-font', { id: "galada", name: "Galada" }) }
					},
					{
						label: 'Galdeano',
						click () { app.emit('install-font', { id: "galdeano", name: "Galdeano" }) }
					},
					{
						label: 'Galindo',
						click () { app.emit('install-font', { id: "galindo", name: "Galindo" }) }
					},
					{
						label: 'Gentium Basic',
						click () { app.emit('install-font', { id: "gentium-basic", name: "Gentium Basic" }) }
					},
					{
						label: 'Gentium Book Basic',
						click () { app.emit('install-font', { id: "gentium-book-basic", name: "Gentium Book Basic" }) }
					},
					{
						label: 'Geo',
						click () { app.emit('install-font', { id: "geo", name: "Geo" }) }
					},
					{
						label: 'Geostar',
						click () { app.emit('install-font', { id: "geostar", name: "Geostar" }) }
					},
					{
						label: 'Geostar Fill',
						click () { app.emit('install-font', { id: "geostar-fill", name: "Geostar Fill" }) }
					},
					{
						label: 'Germania One',
						click () { app.emit('install-font', { id: "germania-one", name: "Germania One" }) }
					},
					{
						label: 'GFS Didot',
						click () { app.emit('install-font', { id: "gfs-didot", name: "GFS Didot" }) }
					},
					{
						label: 'GFS Neohellenic',
						click () { app.emit('install-font', { id: "gfs-neohellenic", name: "GFS Neohellenic" }) }
					},
					{
						label: 'Gidugu',
						click () { app.emit('install-font', { id: "gidugu", name: "Gidugu" }) }
					},
					{
						label: 'Gilda Display',
						click () { app.emit('install-font', { id: "gilda-display", name: "Gilda Display" }) }
					},
					{
						label: 'Give You Glory',
						click () { app.emit('install-font', { id: "give-you-glory", name: "Give You Glory" }) }
					},
					{
						label: 'Glass Antiqua',
						click () { app.emit('install-font', { id: "glass-antiqua", name: "Glass Antiqua" }) }
					},
					{
						label: 'Glegoo',
						click () { app.emit('install-font', { id: "glegoo", name: "Glegoo" }) }
					},
					{
						label: 'Gloria Hallelujah',
						click () { app.emit('install-font', { id: "gloria-hallelujah", name: "Gloria Hallelujah" }) }
					},
					{
						label: 'Goblin One',
						click () { app.emit('install-font', { id: "goblin-one", name: "Goblin One" }) }
					},
					{
						label: 'Gochi Hand',
						click () { app.emit('install-font', { id: "gochi-hand", name: "Gochi Hand" }) }
					},
					{
						label: 'Gorditas',
						click () { app.emit('install-font', { id: "gorditas", name: "Gorditas" }) }
					},
					{
						label: 'Goudy Bookletter 1911',
						click () { app.emit('install-font', { id: "goudy-bookletter-1911", name: "Goudy Bookletter 1911" }) }
					},
					{
						label: 'Graduate',
						click () { app.emit('install-font', { id: "graduate", name: "Graduate" }) }
					},
					{
						label: 'Grand Hotel',
						click () { app.emit('install-font', { id: "grand-hotel", name: "Grand Hotel" }) }
					},
					{
						label: 'Gravitas One',
						click () { app.emit('install-font', { id: "gravitas-one", name: "Gravitas One" }) }
					},
					{
						label: 'Great Vibes',
						click () { app.emit('install-font', { id: "great-vibes", name: "Great Vibes" }) }
					},
					{
						label: 'Griffy',
						click () { app.emit('install-font', { id: "griffy", name: "Griffy" }) }
					},
					{
						label: 'Gruppo',
						click () { app.emit('install-font', { id: "gruppo", name: "Gruppo" }) }
					},
					{
						label: 'Gudea',
						click () { app.emit('install-font', { id: "gudea", name: "Gudea" }) }
					},
					{
						label: 'Gurajada',
						click () { app.emit('install-font', { id: "gurajada", name: "Gurajada" }) }
					},
					{
						label: 'Habibi',
						click () { app.emit('install-font', { id: "habibi", name: "Habibi" }) }
					},
					{
						label: 'Halant',
						click () { app.emit('install-font', { id: "halant", name: "Halant" }) }
					},
					{
						label: 'Hammersmith One',
						click () { app.emit('install-font', { id: "hammersmith-one", name: "Hammersmith One" }) }
					},
					{
						label: 'Hanalei',
						click () { app.emit('install-font', { id: "hanalei", name: "Hanalei" }) }
					},
					{
						label: 'Hanalei Fill',
						click () { app.emit('install-font', { id: "hanalei-fill", name: "Hanalei Fill" }) }
					},
					{
						label: 'Handlee',
						click () { app.emit('install-font', { id: "handlee", name: "Handlee" }) }
					},
					{
						label: 'Hanuman',
						click () { app.emit('install-font', { id: "hanuman", name: "Hanuman" }) }
					},
					{
						label: 'Happy Monkey',
						click () { app.emit('install-font', { id: "happy-monkey", name: "Happy Monkey" }) }
					},
					{
						label: 'Harmattan',
						click () { app.emit('install-font', { id: "harmattan", name: "Harmattan" }) }
					},
					{
						label: 'Headland One',
						click () { app.emit('install-font', { id: "headland-one", name: "Headland One" }) }
					},
					{
						label: 'Heebo',
						click () { app.emit('install-font', { id: "heebo", name: "Heebo" }) }
					},
					{
						label: 'Henny Penny',
						click () { app.emit('install-font', { id: "henny-penny", name: "Henny Penny" }) }
					},
					{
						label: 'Herr Von Muellerhoff',
						click () { app.emit('install-font', { id: "herr-von-muellerhoff", name: "Herr Von Muellerhoff" }) }
					},
					{
						label: 'Hind',
						click () { app.emit('install-font', { id: "hind", name: "Hind" }) }
					},
					{
						label: 'Hind Guntur',
						click () { app.emit('install-font', { id: "hind-guntur", name: "Hind Guntur" }) }
					},
					{
						label: 'Hind Madurai',
						click () { app.emit('install-font', { id: "hind-madurai", name: "Hind Madurai" }) }
					},
					{
						label: 'Hind Siliguri',
						click () { app.emit('install-font', { id: "hind-siliguri", name: "Hind Siliguri" }) }
					},
					{
						label: 'Hind Vadodara',
						click () { app.emit('install-font', { id: "hind-vadodara", name: "Hind Vadodara" }) }
					},
					{
						label: 'Holtwood One SC',
						click () { app.emit('install-font', { id: "holtwood-one-sc", name: "Holtwood One SC" }) }
					},
					{
						label: 'Homemade Apple',
						click () { app.emit('install-font', { id: "homemade-apple", name: "Homemade Apple" }) }
					},
					{
						label: 'Homenaje',
						click () { app.emit('install-font', { id: "homenaje", name: "Homenaje" }) }
					},
					{
						label: 'IBM Plex Mono',
						click () { app.emit('install-font', { id: "ibm-plex-mono", name: "IBM Plex Mono" }) }
					},
					{
						label: 'IBM Plex Sans',
						click () { app.emit('install-font', { id: "ibm-plex-sans", name: "IBM Plex Sans" }) }
					},
					{
						label: 'IBM Plex Sans Condensed',
						click () { app.emit('install-font', { id: "ibm-plex-sans-condensed", name: "IBM Plex Sans Condensed" }) }
					},
					{
						label: 'IBM Plex Serif',
						click () { app.emit('install-font', { id: "ibm-plex-serif", name: "IBM Plex Serif" }) }
					},
					{
						label: 'Iceberg',
						click () { app.emit('install-font', { id: "iceberg", name: "Iceberg" }) }
					},
					{
						label: 'Iceland',
						click () { app.emit('install-font', { id: "iceland", name: "Iceland" }) }
					},
					{
						label: 'IM Fell Double Pica',
						click () { app.emit('install-font', { id: "im-fell-double-pica", name: "IM Fell Double Pica" }) }
					},
					{
						label: 'IM Fell Double Pica SC',
						click () { app.emit('install-font', { id: "im-fell-double-pica-sc", name: "IM Fell Double Pica SC" }) }
					},
					{
						label: 'IM Fell DW Pica',
						click () { app.emit('install-font', { id: "im-fell-dw-pica", name: "IM Fell DW Pica" }) }
					},
					{
						label: 'IM Fell DW Pica SC',
						click () { app.emit('install-font', { id: "im-fell-dw-pica-sc", name: "IM Fell DW Pica SC" }) }
					},
					{
						label: 'IM Fell English',
						click () { app.emit('install-font', { id: "im-fell-english", name: "IM Fell English" }) }
					},
					{
						label: 'IM Fell English SC',
						click () { app.emit('install-font', { id: "im-fell-english-sc", name: "IM Fell English SC" }) }
					},
					{
						label: 'IM Fell French Canon',
						click () { app.emit('install-font', { id: "im-fell-french-canon", name: "IM Fell French Canon" }) }
					},
					{
						label: 'IM Fell French Canon SC',
						click () { app.emit('install-font', { id: "im-fell-french-canon-sc", name: "IM Fell French Canon SC" }) }
					},
					{
						label: 'IM Fell Great Primer',
						click () { app.emit('install-font', { id: "im-fell-great-primer", name: "IM Fell Great Primer" }) }
					},
					{
						label: 'IM Fell Great Primer SC',
						click () { app.emit('install-font', { id: "im-fell-great-primer-sc", name: "IM Fell Great Primer SC" }) }
					},
					{
						label: 'Imprima',
						click () { app.emit('install-font', { id: "imprima", name: "Imprima" }) }
					},
					{
						label: 'Inconsolata',
						click () { app.emit('install-font', { id: "inconsolata", name: "Inconsolata" }) }
					},
					{
						label: 'Inder',
						click () { app.emit('install-font', { id: "inder", name: "Inder" }) }
					},
					{
						label: 'Indie Flower',
						click () { app.emit('install-font', { id: "indie-flower", name: "Indie Flower" }) }
					},
					{
						label: 'Inika',
						click () { app.emit('install-font', { id: "inika", name: "Inika" }) }
					},
					{
						label: 'Inknut Antiqua',
						click () { app.emit('install-font', { id: "inknut-antiqua", name: "Inknut Antiqua" }) }
					},
					{
						label: 'Irish Grover',
						click () { app.emit('install-font', { id: "irish-grover", name: "Irish Grover" }) }
					},
					{
						label: 'Istok Web',
						click () { app.emit('install-font', { id: "istok-web", name: "Istok Web" }) }
					},
					{
						label: 'Italiana',
						click () { app.emit('install-font', { id: "italiana", name: "Italiana" }) }
					},
					{
						label: 'Italianno',
						click () { app.emit('install-font', { id: "italianno", name: "Italianno" }) }
					},
					{
						label: 'Itim',
						click () { app.emit('install-font', { id: "itim", name: "Itim" }) }
					},
					{
						label: 'Jacques Francois',
						click () { app.emit('install-font', { id: "jacques-francois", name: "Jacques Francois" }) }
					},
					{
						label: 'Jacques Francois Shadow',
						click () { app.emit('install-font', { id: "jacques-francois-shadow", name: "Jacques Francois Shadow" }) }
					},
					{
						label: 'Jaldi',
						click () { app.emit('install-font', { id: "jaldi", name: "Jaldi" }) }
					},
					{
						label: 'Jim Nightshade',
						click () { app.emit('install-font', { id: "jim-nightshade", name: "Jim Nightshade" }) }
					},
					{
						label: 'Jockey One',
						click () { app.emit('install-font', { id: "jockey-one", name: "Jockey One" }) }
					},
					{
						label: 'Jolly Lodger',
						click () { app.emit('install-font', { id: "jolly-lodger", name: "Jolly Lodger" }) }
					},
					{
						label: 'Jomhuria',
						click () { app.emit('install-font', { id: "jomhuria", name: "Jomhuria" }) }
					},
					{
						label: 'Josefin Sans',
						click () { app.emit('install-font', { id: "josefin-sans", name: "Josefin Sans" }) }
					},
					{
						label: 'Josefin Slab',
						click () { app.emit('install-font', { id: "josefin-slab", name: "Josefin Slab" }) }
					},
					{
						label: 'Joti One',
						click () { app.emit('install-font', { id: "joti-one", name: "Joti One" }) }
					},
					{
						label: 'Judson',
						click () { app.emit('install-font', { id: "judson", name: "Judson" }) }
					},
					{
						label: 'Julee',
						click () { app.emit('install-font', { id: "julee", name: "Julee" }) }
					},
					{
						label: 'Julius Sans One',
						click () { app.emit('install-font', { id: "julius-sans-one", name: "Julius Sans One" }) }
					},
					{
						label: 'Junge',
						click () { app.emit('install-font', { id: "junge", name: "Junge" }) }
					},
					{
						label: 'Jura',
						click () { app.emit('install-font', { id: "jura", name: "Jura" }) }
					},
					{
						label: 'Just Another Hand',
						click () { app.emit('install-font', { id: "just-another-hand", name: "Just Another Hand" }) }
					},
					{
						label: 'Just Me Again Down Here',
						click () { app.emit('install-font', { id: "just-me-again-down-here", name: "Just Me Again Down Here" }) }
					},
					{
						label: 'Kadwa',
						click () { app.emit('install-font', { id: "kadwa", name: "Kadwa" }) }
					},
					{
						label: 'Kalam',
						click () { app.emit('install-font', { id: "kalam", name: "Kalam" }) }
					},
					{
						label: 'Kameron',
						click () { app.emit('install-font', { id: "kameron", name: "Kameron" }) }
					},
					{
						label: 'Kanit',
						click () { app.emit('install-font', { id: "kanit", name: "Kanit" }) }
					},
					{
						label: 'Kantumruy',
						click () { app.emit('install-font', { id: "kantumruy", name: "Kantumruy" }) }
					},
					{
						label: 'Karla',
						click () { app.emit('install-font', { id: "karla", name: "Karla" }) }
					},
					{
						label: 'Karma',
						click () { app.emit('install-font', { id: "karma", name: "Karma" }) }
					},
					{
						label: 'Katibeh',
						click () { app.emit('install-font', { id: "katibeh", name: "Katibeh" }) }
					},
					{
						label: 'Kaushan Script',
						click () { app.emit('install-font', { id: "kaushan-script", name: "Kaushan Script" }) }
					},
					{
						label: 'Kavivanar',
						click () { app.emit('install-font', { id: "kavivanar", name: "Kavivanar" }) }
					},
					{
						label: 'Kavoon',
						click () { app.emit('install-font', { id: "kavoon", name: "Kavoon" }) }
					},
					{
						label: 'Kdam Thmor',
						click () { app.emit('install-font', { id: "kdam-thmor", name: "Kdam Thmor" }) }
					},
					{
						label: 'Keania One',
						click () { app.emit('install-font', { id: "keania-one", name: "Keania One" }) }
					},
					{
						label: 'Kelly Slab',
						click () { app.emit('install-font', { id: "kelly-slab", name: "Kelly Slab" }) }
					},
					{
						label: 'Kenia',
						click () { app.emit('install-font', { id: "kenia", name: "Kenia" }) }
					},
					{
						label: 'Khand',
						click () { app.emit('install-font', { id: "khand", name: "Khand" }) }
					},
					{
						label: 'Khmer',
						click () { app.emit('install-font', { id: "khmer", name: "Khmer" }) }
					},
					{
						label: 'Khula',
						click () { app.emit('install-font', { id: "khula", name: "Khula" }) }
					},
					{
						label: 'Kite One',
						click () { app.emit('install-font', { id: "kite-one", name: "Kite One" }) }
					},
					{
						label: 'Knewave',
						click () { app.emit('install-font', { id: "knewave", name: "Knewave" }) }
					},
					{
						label: 'Kotta One',
						click () { app.emit('install-font', { id: "kotta-one", name: "Kotta One" }) }
					},
					{
						label: 'Koulen',
						click () { app.emit('install-font', { id: "koulen", name: "Koulen" }) }
					},
					{
						label: 'Kranky',
						click () { app.emit('install-font', { id: "kranky", name: "Kranky" }) }
					},
					{
						label: 'Kreon',
						click () { app.emit('install-font', { id: "kreon", name: "Kreon" }) }
					},
					{
						label: 'Kristi',
						click () { app.emit('install-font', { id: "kristi", name: "Kristi" }) }
					},
					{
						label: 'Krona One',
						click () { app.emit('install-font', { id: "krona-one", name: "Krona One" }) }
					},
					{
						label: 'Kumar One',
						click () { app.emit('install-font', { id: "kumar-one", name: "Kumar One" }) }
					},
					{
						label: 'Kumar One Outline',
						click () { app.emit('install-font', { id: "kumar-one-outline", name: "Kumar One Outline" }) }
					},
					{
						label: 'Kurale',
						click () { app.emit('install-font', { id: "kurale", name: "Kurale" }) }
					},
					{
						label: 'La Belle Aurore',
						click () { app.emit('install-font', { id: "la-belle-aurore", name: "La Belle Aurore" }) }
					},
					{
						label: 'Laila',
						click () { app.emit('install-font', { id: "laila", name: "Laila" }) }
					},
					{
						label: 'Lakki Reddy',
						click () { app.emit('install-font', { id: "lakki-reddy", name: "Lakki Reddy" }) }
					},
					{
						label: 'Lalezar',
						click () { app.emit('install-font', { id: "lalezar", name: "Lalezar" }) }
					},
					{
						label: 'Lancelot',
						click () { app.emit('install-font', { id: "lancelot", name: "Lancelot" }) }
					},
					{
						label: 'Lateef',
						click () { app.emit('install-font', { id: "lateef", name: "Lateef" }) }
					},
					{
						label: 'Lato',
						click () { app.emit('install-font', { id: "lato", name: "Lato" }) }
					},
					{
						label: 'League Script',
						click () { app.emit('install-font', { id: "league-script", name: "League Script" }) }
					},
					{
						label: 'Leckerli One',
						click () { app.emit('install-font', { id: "leckerli-one", name: "Leckerli One" }) }
					},
					{
						label: 'Ledger',
						click () { app.emit('install-font', { id: "ledger", name: "Ledger" }) }
					},
					{
						label: 'Lekton',
						click () { app.emit('install-font', { id: "lekton", name: "Lekton" }) }
					},
					{
						label: 'Lemon',
						click () { app.emit('install-font', { id: "lemon", name: "Lemon" }) }
					},
					{
						label: 'Lemonada',
						click () { app.emit('install-font', { id: "lemonada", name: "Lemonada" }) }
					},
					{
						label: 'Libre Barcode 128',
						click () { app.emit('install-font', { id: "libre-barcode-128", name: "Libre Barcode 128" }) }
					},
					{
						label: 'Libre Barcode 128 Text',
						click () { app.emit('install-font', { id: "libre-barcode-128-text", name: "Libre Barcode 128 Text" }) }
					},
					{
						label: 'Libre Barcode 39',
						click () { app.emit('install-font', { id: "libre-barcode-39", name: "Libre Barcode 39" }) }
					},
					{
						label: 'Libre Barcode 39 Extended',
						click () { app.emit('install-font', { id: "libre-barcode-39-extended", name: "Libre Barcode 39 Extended" }) }
					},
					{
						label: 'Libre Barcode 39 Extended Text',
						click () { app.emit('install-font', { id: "libre-barcode-39-extended-text", name: "Libre Barcode 39 Extended Text" }) }
					},
					{
						label: 'Libre Barcode 39 Text',
						click () { app.emit('install-font', { id: "libre-barcode-39-text", name: "Libre Barcode 39 Text" }) }
					},
					{
						label: 'Libre Baskerville',
						click () { app.emit('install-font', { id: "libre-baskerville", name: "Libre Baskerville" }) }
					},
					{
						label: 'Libre Franklin',
						click () { app.emit('install-font', { id: "libre-franklin", name: "Libre Franklin" }) }
					},
					{
						label: 'Life Savers',
						click () { app.emit('install-font', { id: "life-savers", name: "Life Savers" }) }
					},
					{
						label: 'Lilita One',
						click () { app.emit('install-font', { id: "lilita-one", name: "Lilita One" }) }
					},
					{
						label: 'Lily Script One',
						click () { app.emit('install-font', { id: "lily-script-one", name: "Lily Script One" }) }
					},
					{
						label: 'Limelight',
						click () { app.emit('install-font', { id: "limelight", name: "Limelight" }) }
					},
					{
						label: 'Linden Hill',
						click () { app.emit('install-font', { id: "linden-hill", name: "Linden Hill" }) }
					},
					{
						label: 'Lobster',
						click () { app.emit('install-font', { id: "lobster", name: "Lobster" }) }
					},
					{
						label: 'Lobster Two',
						click () { app.emit('install-font', { id: "lobster-two", name: "Lobster Two" }) }
					},
					{
						label: 'Londrina Outline',
						click () { app.emit('install-font', { id: "londrina-outline", name: "Londrina Outline" }) }
					},
					{
						label: 'Londrina Shadow',
						click () { app.emit('install-font', { id: "londrina-shadow", name: "Londrina Shadow" }) }
					},
					{
						label: 'Londrina Sketch',
						click () { app.emit('install-font', { id: "londrina-sketch", name: "Londrina Sketch" }) }
					},
					{
						label: 'Londrina Solid',
						click () { app.emit('install-font', { id: "londrina-solid", name: "Londrina Solid" }) }
					},
					{
						label: 'Lora',
						click () { app.emit('install-font', { id: "lora", name: "Lora" }) }
					},
					{
						label: 'Love Ya Like A Sister',
						click () { app.emit('install-font', { id: "love-ya-like-a-sister", name: "Love Ya Like A Sister" }) }
					},
					{
						label: 'Loved by the King',
						click () { app.emit('install-font', { id: "loved-by-the-king", name: "Loved by the King" }) }
					},
					{
						label: 'Lovers Quarrel',
						click () { app.emit('install-font', { id: "lovers-quarrel", name: "Lovers Quarrel" }) }
					},
					{
						label: 'Luckiest Guy',
						click () { app.emit('install-font', { id: "luckiest-guy", name: "Luckiest Guy" }) }
					},
					{
						label: 'Lusitana',
						click () { app.emit('install-font', { id: "lusitana", name: "Lusitana" }) }
					},
					{
						label: 'Lustria',
						click () { app.emit('install-font', { id: "lustria", name: "Lustria" }) }
					},
					{
						label: 'Macondo',
						click () { app.emit('install-font', { id: "macondo", name: "Macondo" }) }
					},
					{
						label: 'Macondo Swash Caps',
						click () { app.emit('install-font', { id: "macondo-swash-caps", name: "Macondo Swash Caps" }) }
					},
					{
						label: 'Mada',
						click () { app.emit('install-font', { id: "mada", name: "Mada" }) }
					},
					{
						label: 'Magra',
						click () { app.emit('install-font', { id: "magra", name: "Magra" }) }
					},
					{
						label: 'Maiden Orange',
						click () { app.emit('install-font', { id: "maiden-orange", name: "Maiden Orange" }) }
					},
					{
						label: 'Maitree',
						click () { app.emit('install-font', { id: "maitree", name: "Maitree" }) }
					},
					{
						label: 'Mako',
						click () { app.emit('install-font', { id: "mako", name: "Mako" }) }
					},
					{
						label: 'Mallanna',
						click () { app.emit('install-font', { id: "mallanna", name: "Mallanna" }) }
					},
					{
						label: 'Mandali',
						click () { app.emit('install-font', { id: "mandali", name: "Mandali" }) }
					},
					{
						label: 'Manuale',
						click () { app.emit('install-font', { id: "manuale", name: "Manuale" }) }
					},
					{
						label: 'Marcellus',
						click () { app.emit('install-font', { id: "marcellus", name: "Marcellus" }) }
					},
					{
						label: 'Marcellus SC',
						click () { app.emit('install-font', { id: "marcellus-sc", name: "Marcellus SC" }) }
					},
					{
						label: 'Marck Script',
						click () { app.emit('install-font', { id: "marck-script", name: "Marck Script" }) }
					},
					{
						label: 'Margarine',
						click () { app.emit('install-font', { id: "margarine", name: "Margarine" }) }
					},
					{
						label: 'Marko One',
						click () { app.emit('install-font', { id: "marko-one", name: "Marko One" }) }
					},
					{
						label: 'Marmelad',
						click () { app.emit('install-font', { id: "marmelad", name: "Marmelad" }) }
					},
					{
						label: 'Martel',
						click () { app.emit('install-font', { id: "martel", name: "Martel" }) }
					},
					{
						label: 'Martel Sans',
						click () { app.emit('install-font', { id: "martel-sans", name: "Martel Sans" }) }
					},
					{
						label: 'Marvel',
						click () { app.emit('install-font', { id: "marvel", name: "Marvel" }) }
					},
					{
						label: 'Mate',
						click () { app.emit('install-font', { id: "mate", name: "Mate" }) }
					},
					{
						label: 'Mate SC',
						click () { app.emit('install-font', { id: "mate-sc", name: "Mate SC" }) }
					},
					{
						label: 'Maven Pro',
						click () { app.emit('install-font', { id: "maven-pro", name: "Maven Pro" }) }
					},
					{
						label: 'McLaren',
						click () { app.emit('install-font', { id: "mclaren", name: "McLaren" }) }
					},
					{
						label: 'Meddon',
						click () { app.emit('install-font', { id: "meddon", name: "Meddon" }) }
					},
					{
						label: 'MedievalSharp',
						click () { app.emit('install-font', { id: "medievalsharp", name: "MedievalSharp" }) }
					},
					{
						label: 'Medula One',
						click () { app.emit('install-font', { id: "medula-one", name: "Medula One" }) }
					},
					{
						label: 'Meera Inimai',
						click () { app.emit('install-font', { id: "meera-inimai", name: "Meera Inimai" }) }
					},
					{
						label: 'Megrim',
						click () { app.emit('install-font', { id: "megrim", name: "Megrim" }) }
					},
					{
						label: 'Meie Script',
						click () { app.emit('install-font', { id: "meie-script", name: "Meie Script" }) }
					},
					{
						label: 'Merienda',
						click () { app.emit('install-font', { id: "merienda", name: "Merienda" }) }
					},
					{
						label: 'Merienda One',
						click () { app.emit('install-font', { id: "merienda-one", name: "Merienda One" }) }
					},
					{
						label: 'Merriweather',
						click () { app.emit('install-font', { id: "merriweather", name: "Merriweather" }) }
					},
					{
						label: 'Merriweather Sans',
						click () { app.emit('install-font', { id: "merriweather-sans", name: "Merriweather Sans" }) }
					},
					{
						label: 'Metal',
						click () { app.emit('install-font', { id: "metal", name: "Metal" }) }
					},
					{
						label: 'Metal Mania',
						click () { app.emit('install-font', { id: "metal-mania", name: "Metal Mania" }) }
					},
					{
						label: 'Metamorphous',
						click () { app.emit('install-font', { id: "metamorphous", name: "Metamorphous" }) }
					},
					{
						label: 'Metrophobic',
						click () { app.emit('install-font', { id: "metrophobic", name: "Metrophobic" }) }
					},
					{
						label: 'Michroma',
						click () { app.emit('install-font', { id: "michroma", name: "Michroma" }) }
					},
					{
						label: 'Milonga',
						click () { app.emit('install-font', { id: "milonga", name: "Milonga" }) }
					},
					{
						label: 'Miltonian',
						click () { app.emit('install-font', { id: "miltonian", name: "Miltonian" }) }
					},
					{
						label: 'Miltonian Tattoo',
						click () { app.emit('install-font', { id: "miltonian-tattoo", name: "Miltonian Tattoo" }) }
					},
					{
						label: 'Mina',
						click () { app.emit('install-font', { id: "mina", name: "Mina" }) }
					},
					{
						label: 'Miniver',
						click () { app.emit('install-font', { id: "miniver", name: "Miniver" }) }
					},
					{
						label: 'Miriam Libre',
						click () { app.emit('install-font', { id: "miriam-libre", name: "Miriam Libre" }) }
					},
					{
						label: 'Mirza',
						click () { app.emit('install-font', { id: "mirza", name: "Mirza" }) }
					},
					{
						label: 'Miss Fajardose',
						click () { app.emit('install-font', { id: "miss-fajardose", name: "Miss Fajardose" }) }
					},
					{
						label: 'Mitr',
						click () { app.emit('install-font', { id: "mitr", name: "Mitr" }) }
					},
					{
						label: 'Modak',
						click () { app.emit('install-font', { id: "modak", name: "Modak" }) }
					},
					{
						label: 'Modern Antiqua',
						click () { app.emit('install-font', { id: "modern-antiqua", name: "Modern Antiqua" }) }
					},
					{
						label: 'Mogra',
						click () { app.emit('install-font', { id: "mogra", name: "Mogra" }) }
					},
					{
						label: 'Molengo',
						click () { app.emit('install-font', { id: "molengo", name: "Molengo" }) }
					},
					{
						label: 'Molle',
						click () { app.emit('install-font', { id: "molle", name: "Molle" }) }
					},
					{
						label: 'Monda',
						click () { app.emit('install-font', { id: "monda", name: "Monda" }) }
					},
					{
						label: 'Monofett',
						click () { app.emit('install-font', { id: "monofett", name: "Monofett" }) }
					},
					{
						label: 'Monoton',
						click () { app.emit('install-font', { id: "monoton", name: "Monoton" }) }
					},
					{
						label: 'Monsieur La Doulaise',
						click () { app.emit('install-font', { id: "monsieur-la-doulaise", name: "Monsieur La Doulaise" }) }
					},
					{
						label: 'Montaga',
						click () { app.emit('install-font', { id: "montaga", name: "Montaga" }) }
					},
					{
						label: 'Montez',
						click () { app.emit('install-font', { id: "montez", name: "Montez" }) }
					},
					{
						label: 'Montserrat',
						click () { app.emit('install-font', { id: "montserrat", name: "Montserrat" }) }
					},
					{
						label: 'Montserrat Alternates',
						click () { app.emit('install-font', { id: "montserrat-alternates", name: "Montserrat Alternates" }) }
					},
					{
						label: 'Montserrat Subrayada',
						click () { app.emit('install-font', { id: "montserrat-subrayada", name: "Montserrat Subrayada" }) }
					},
					{
						label: 'Moul',
						click () { app.emit('install-font', { id: "moul", name: "Moul" }) }
					},
					{
						label: 'Moulpali',
						click () { app.emit('install-font', { id: "moulpali", name: "Moulpali" }) }
					},
					{
						label: 'Mountains of Christmas',
						click () { app.emit('install-font', { id: "mountains-of-christmas", name: "Mountains of Christmas" }) }
					},
					{
						label: 'Mouse Memoirs',
						click () { app.emit('install-font', { id: "mouse-memoirs", name: "Mouse Memoirs" }) }
					},
					{
						label: 'Mr Bedfort',
						click () { app.emit('install-font', { id: "mr-bedfort", name: "Mr Bedfort" }) }
					},
					{
						label: 'Mr Dafoe',
						click () { app.emit('install-font', { id: "mr-dafoe", name: "Mr Dafoe" }) }
					},
					{
						label: 'Mr De Haviland',
						click () { app.emit('install-font', { id: "mr-de-haviland", name: "Mr De Haviland" }) }
					},
					{
						label: 'Mrs Saint Delafield',
						click () { app.emit('install-font', { id: "mrs-saint-delafield", name: "Mrs Saint Delafield" }) }
					},
					{
						label: 'Mrs Sheppards',
						click () { app.emit('install-font', { id: "mrs-sheppards", name: "Mrs Sheppards" }) }
					},
					{
						label: 'Mukta',
						click () { app.emit('install-font', { id: "mukta", name: "Mukta" }) }
					},
					{
						label: 'Mukta Mahee',
						click () { app.emit('install-font', { id: "mukta-mahee", name: "Mukta Mahee" }) }
					},
					{
						label: 'Mukta Malar',
						click () { app.emit('install-font', { id: "mukta-malar", name: "Mukta Malar" }) }
					},
					{
						label: 'Mukta Vaani',
						click () { app.emit('install-font', { id: "mukta-vaani", name: "Mukta Vaani" }) }
					},
					{
						label: 'Muli',
						click () { app.emit('install-font', { id: "muli", name: "Muli" }) }
					},
					{
						label: 'Mystery Quest',
						click () { app.emit('install-font', { id: "mystery-quest", name: "Mystery Quest" }) }
					},
					{
						label: 'Nanum Brush Script',
						click () { app.emit('install-font', { id: "nanum-brush-script", name: "Nanum Brush Script" }) }
					},
					{
						label: 'Nanum Gothic',
						click () { app.emit('install-font', { id: "nanum-gothic", name: "Nanum Gothic" }) }
					},
					{
						label: 'Nanum Gothic Coding',
						click () { app.emit('install-font', { id: "nanum-gothic-coding", name: "Nanum Gothic Coding" }) }
					},
					{
						label: 'Nanum Myeongjo',
						click () { app.emit('install-font', { id: "nanum-myeongjo", name: "Nanum Myeongjo" }) }
					},
					{
						label: 'Nanum Pen Script',
						click () { app.emit('install-font', { id: "nanum-pen-script", name: "Nanum Pen Script" }) }
					},
					{
						label: 'Neucha',
						click () { app.emit('install-font', { id: "neucha", name: "Neucha" }) }
					},
					{
						label: 'Neuton',
						click () { app.emit('install-font', { id: "neuton", name: "Neuton" }) }
					},
					{
						label: 'New Rocker',
						click () { app.emit('install-font', { id: "new-rocker", name: "New Rocker" }) }
					},
					{
						label: 'News Cycle',
						click () { app.emit('install-font', { id: "news-cycle", name: "News Cycle" }) }
					},
					{
						label: 'Niconne',
						click () { app.emit('install-font', { id: "niconne", name: "Niconne" }) }
					},
					{
						label: 'Nixie One',
						click () { app.emit('install-font', { id: "nixie-one", name: "Nixie One" }) }
					},
					{
						label: 'Nobile',
						click () { app.emit('install-font', { id: "nobile", name: "Nobile" }) }
					},
					{
						label: 'Nokora',
						click () { app.emit('install-font', { id: "nokora", name: "Nokora" }) }
					},
					{
						label: 'Norican',
						click () { app.emit('install-font', { id: "norican", name: "Norican" }) }
					},
					{
						label: 'Nosifer',
						click () { app.emit('install-font', { id: "nosifer", name: "Nosifer" }) }
					},
					{
						label: 'Nothing You Could Do',
						click () { app.emit('install-font', { id: "nothing-you-could-do", name: "Nothing You Could Do" }) }
					},
					{
						label: 'Noticia Text',
						click () { app.emit('install-font', { id: "noticia-text", name: "Noticia Text" }) }
					},
					{
						label: 'Noto Sans',
						click () { app.emit('install-font', { id: "noto-sans", name: "Noto Sans" }) }
					},
					{
						label: 'Noto Serif',
						click () { app.emit('install-font', { id: "noto-serif", name: "Noto Serif" }) }
					},
					{
						label: 'Nova Cut',
						click () { app.emit('install-font', { id: "nova-cut", name: "Nova Cut" }) }
					},
					{
						label: 'Nova Flat',
						click () { app.emit('install-font', { id: "nova-flat", name: "Nova Flat" }) }
					},
					{
						label: 'Nova Mono',
						click () { app.emit('install-font', { id: "nova-mono", name: "Nova Mono" }) }
					},
					{
						label: 'Nova Oval',
						click () { app.emit('install-font', { id: "nova-oval", name: "Nova Oval" }) }
					},
					{
						label: 'Nova Round',
						click () { app.emit('install-font', { id: "nova-round", name: "Nova Round" }) }
					},
					{
						label: 'Nova Script',
						click () { app.emit('install-font', { id: "nova-script", name: "Nova Script" }) }
					},
					{
						label: 'Nova Slim',
						click () { app.emit('install-font', { id: "nova-slim", name: "Nova Slim" }) }
					},
					{
						label: 'Nova Square',
						click () { app.emit('install-font', { id: "nova-square", name: "Nova Square" }) }
					},
					{
						label: 'NTR',
						click () { app.emit('install-font', { id: "ntr", name: "NTR" }) }
					},
					{
						label: 'Numans',
						click () { app.emit('install-font', { id: "numans", name: "Numans" }) }
					},
					{
						label: 'Nunito',
						click () { app.emit('install-font', { id: "nunito", name: "Nunito" }) }
					},
					{
						label: 'Nunito Sans',
						click () { app.emit('install-font', { id: "nunito-sans", name: "Nunito Sans" }) }
					},
					{
						label: 'Odor Mean Chey',
						click () { app.emit('install-font', { id: "odor-mean-chey", name: "Odor Mean Chey" }) }
					},
					{
						label: 'Offside',
						click () { app.emit('install-font', { id: "offside", name: "Offside" }) }
					},
					{
						label: 'Old Standard TT',
						click () { app.emit('install-font', { id: "old-standard-tt", name: "Old Standard TT" }) }
					},
					{
						label: 'Oldenburg',
						click () { app.emit('install-font', { id: "oldenburg", name: "Oldenburg" }) }
					},
					{
						label: 'Oleo Script',
						click () { app.emit('install-font', { id: "oleo-script", name: "Oleo Script" }) }
					},
					{
						label: 'Oleo Script Swash Caps',
						click () { app.emit('install-font', { id: "oleo-script-swash-caps", name: "Oleo Script Swash Caps" }) }
					},
					{
						label: 'Open Sans',
						click () { app.emit('install-font', { id: "open-sans", name: "Open Sans" }) }
					},
					{
						label: 'Open Sans Condensed',
						click () { app.emit('install-font', { id: "open-sans-condensed", name: "Open Sans Condensed" }) }
					},
					{
						label: 'Oranienbaum',
						click () { app.emit('install-font', { id: "oranienbaum", name: "Oranienbaum" }) }
					},
					{
						label: 'Orbitron',
						click () { app.emit('install-font', { id: "orbitron", name: "Orbitron" }) }
					},
					{
						label: 'Oregano',
						click () { app.emit('install-font', { id: "oregano", name: "Oregano" }) }
					},
					{
						label: 'Orienta',
						click () { app.emit('install-font', { id: "orienta", name: "Orienta" }) }
					},
					{
						label: 'Original Surfer',
						click () { app.emit('install-font', { id: "original-surfer", name: "Original Surfer" }) }
					},
					{
						label: 'Oswald',
						click () { app.emit('install-font', { id: "oswald", name: "Oswald" }) }
					},
					{
						label: 'Over the Rainbow',
						click () { app.emit('install-font', { id: "over-the-rainbow", name: "Over the Rainbow" }) }
					},
					{
						label: 'Overlock',
						click () { app.emit('install-font', { id: "overlock", name: "Overlock" }) }
					},
					{
						label: 'Overlock SC',
						click () { app.emit('install-font', { id: "overlock-sc", name: "Overlock SC" }) }
					},
					{
						label: 'Overpass',
						click () { app.emit('install-font', { id: "overpass", name: "Overpass" }) }
					},
					{
						label: 'Overpass Mono',
						click () { app.emit('install-font', { id: "overpass-mono", name: "Overpass Mono" }) }
					},
					{
						label: 'Ovo',
						click () { app.emit('install-font', { id: "ovo", name: "Ovo" }) }
					},
					{
						label: 'Oxygen',
						click () { app.emit('install-font', { id: "oxygen", name: "Oxygen" }) }
					},
					{
						label: 'Oxygen Mono',
						click () { app.emit('install-font', { id: "oxygen-mono", name: "Oxygen Mono" }) }
					},
					{
						label: 'Pacifico',
						click () { app.emit('install-font', { id: "pacifico", name: "Pacifico" }) }
					},
					{
						label: 'Padauk',
						click () { app.emit('install-font', { id: "padauk", name: "Padauk" }) }
					},
					{
						label: 'Palanquin',
						click () { app.emit('install-font', { id: "palanquin", name: "Palanquin" }) }
					},
					{
						label: 'Palanquin Dark',
						click () { app.emit('install-font', { id: "palanquin-dark", name: "Palanquin Dark" }) }
					},
					{
						label: 'Pangolin',
						click () { app.emit('install-font', { id: "pangolin", name: "Pangolin" }) }
					},
					{
						label: 'Paprika',
						click () { app.emit('install-font', { id: "paprika", name: "Paprika" }) }
					},
					{
						label: 'Parisienne',
						click () { app.emit('install-font', { id: "parisienne", name: "Parisienne" }) }
					},
					{
						label: 'Passero One',
						click () { app.emit('install-font', { id: "passero-one", name: "Passero One" }) }
					},
					{
						label: 'Passion One',
						click () { app.emit('install-font', { id: "passion-one", name: "Passion One" }) }
					},
					{
						label: 'Pathway Gothic One',
						click () { app.emit('install-font', { id: "pathway-gothic-one", name: "Pathway Gothic One" }) }
					},
					{
						label: 'Patrick Hand',
						click () { app.emit('install-font', { id: "patrick-hand", name: "Patrick Hand" }) }
					},
					{
						label: 'Patrick Hand SC',
						click () { app.emit('install-font', { id: "patrick-hand-sc", name: "Patrick Hand SC" }) }
					},
					{
						label: 'Pattaya',
						click () { app.emit('install-font', { id: "pattaya", name: "Pattaya" }) }
					},
					{
						label: 'Patua One',
						click () { app.emit('install-font', { id: "patua-one", name: "Patua One" }) }
					},
					{
						label: 'Pavanam',
						click () { app.emit('install-font', { id: "pavanam", name: "Pavanam" }) }
					},
					{
						label: 'Paytone One',
						click () { app.emit('install-font', { id: "paytone-one", name: "Paytone One" }) }
					},
					{
						label: 'Peddana',
						click () { app.emit('install-font', { id: "peddana", name: "Peddana" }) }
					},
					{
						label: 'Peralta',
						click () { app.emit('install-font', { id: "peralta", name: "Peralta" }) }
					},
					{
						label: 'Permanent Marker',
						click () { app.emit('install-font', { id: "permanent-marker", name: "Permanent Marker" }) }
					},
					{
						label: 'Petit Formal Script',
						click () { app.emit('install-font', { id: "petit-formal-script", name: "Petit Formal Script" }) }
					},
					{
						label: 'Petrona',
						click () { app.emit('install-font', { id: "petrona", name: "Petrona" }) }
					},
					{
						label: 'Philosopher',
						click () { app.emit('install-font', { id: "philosopher", name: "Philosopher" }) }
					},
					{
						label: 'Piedra',
						click () { app.emit('install-font', { id: "piedra", name: "Piedra" }) }
					},
					{
						label: 'Pinyon Script',
						click () { app.emit('install-font', { id: "pinyon-script", name: "Pinyon Script" }) }
					},
					{
						label: 'Pirata One',
						click () { app.emit('install-font', { id: "pirata-one", name: "Pirata One" }) }
					},
					{
						label: 'Plaster',
						click () { app.emit('install-font', { id: "plaster", name: "Plaster" }) }
					},
					{
						label: 'Play',
						click () { app.emit('install-font', { id: "play", name: "Play" }) }
					},
					{
						label: 'Playball',
						click () { app.emit('install-font', { id: "playball", name: "Playball" }) }
					},
					{
						label: 'Playfair Display',
						click () { app.emit('install-font', { id: "playfair-display", name: "Playfair Display" }) }
					},
					{
						label: 'Playfair Display SC',
						click () { app.emit('install-font', { id: "playfair-display-sc", name: "Playfair Display SC" }) }
					},
					{
						label: 'Podkova',
						click () { app.emit('install-font', { id: "podkova", name: "Podkova" }) }
					},
					{
						label: 'Poiret One',
						click () { app.emit('install-font', { id: "poiret-one", name: "Poiret One" }) }
					},
					{
						label: 'Poller One',
						click () { app.emit('install-font', { id: "poller-one", name: "Poller One" }) }
					},
					{
						label: 'Poly',
						click () { app.emit('install-font', { id: "poly", name: "Poly" }) }
					},
					{
						label: 'Pompiere',
						click () { app.emit('install-font', { id: "pompiere", name: "Pompiere" }) }
					},
					{
						label: 'Pontano Sans',
						click () { app.emit('install-font', { id: "pontano-sans", name: "Pontano Sans" }) }
					},
					{
						label: 'Poppins',
						click () { app.emit('install-font', { id: "poppins", name: "Poppins" }) }
					},
					{
						label: 'Port Lligat Sans',
						click () { app.emit('install-font', { id: "port-lligat-sans", name: "Port Lligat Sans" }) }
					},
					{
						label: 'Port Lligat Slab',
						click () { app.emit('install-font', { id: "port-lligat-slab", name: "Port Lligat Slab" }) }
					},
					{
						label: 'Pragati Narrow',
						click () { app.emit('install-font', { id: "pragati-narrow", name: "Pragati Narrow" }) }
					},
					{
						label: 'Prata',
						click () { app.emit('install-font', { id: "prata", name: "Prata" }) }
					},
					{
						label: 'Preahvihear',
						click () { app.emit('install-font', { id: "preahvihear", name: "Preahvihear" }) }
					},
					{
						label: 'Press Start 2P',
						click () { app.emit('install-font', { id: "press-start-2p", name: "Press Start 2P" }) }
					},
					{
						label: 'Pridi',
						click () { app.emit('install-font', { id: "pridi", name: "Pridi" }) }
					},
					{
						label: 'Princess Sofia',
						click () { app.emit('install-font', { id: "princess-sofia", name: "Princess Sofia" }) }
					},
					{
						label: 'Prociono',
						click () { app.emit('install-font', { id: "prociono", name: "Prociono" }) }
					},
					{
						label: 'Prompt',
						click () { app.emit('install-font', { id: "prompt", name: "Prompt" }) }
					},
					{
						label: 'Prosto One',
						click () { app.emit('install-font', { id: "prosto-one", name: "Prosto One" }) }
					},
					{
						label: 'Proza Libre',
						click () { app.emit('install-font', { id: "proza-libre", name: "Proza Libre" }) }
					},
					{
						label: 'PT Mono',
						click () { app.emit('install-font', { id: "pt-mono", name: "PT Mono" }) }
					},
					{
						label: 'PT Sans',
						click () { app.emit('install-font', { id: "pt-sans", name: "PT Sans" }) }
					},
					{
						label: 'PT Sans Caption',
						click () { app.emit('install-font', { id: "pt-sans-caption", name: "PT Sans Caption" }) }
					},
					{
						label: 'PT Sans Narrow',
						click () { app.emit('install-font', { id: "pt-sans-narrow", name: "PT Sans Narrow" }) }
					},
					{
						label: 'PT Serif',
						click () { app.emit('install-font', { id: "pt-serif", name: "PT Serif" }) }
					},
					{
						label: 'PT Serif Caption',
						click () { app.emit('install-font', { id: "pt-serif-caption", name: "PT Serif Caption" }) }
					},
					{
						label: 'Puritan',
						click () { app.emit('install-font', { id: "puritan", name: "Puritan" }) }
					},
					{
						label: 'Purple Purse',
						click () { app.emit('install-font', { id: "purple-purse", name: "Purple Purse" }) }
					},
					{
						label: 'Quando',
						click () { app.emit('install-font', { id: "quando", name: "Quando" }) }
					},
					{
						label: 'Quantico',
						click () { app.emit('install-font', { id: "quantico", name: "Quantico" }) }
					},
					{
						label: 'Quattrocento',
						click () { app.emit('install-font', { id: "quattrocento", name: "Quattrocento" }) }
					},
					{
						label: 'Quattrocento Sans',
						click () { app.emit('install-font', { id: "quattrocento-sans", name: "Quattrocento Sans" }) }
					},
					{
						label: 'Questrial',
						click () { app.emit('install-font', { id: "questrial", name: "Questrial" }) }
					},
					{
						label: 'Quicksand',
						click () { app.emit('install-font', { id: "quicksand", name: "Quicksand" }) }
					},
					{
						label: 'Quintessential',
						click () { app.emit('install-font', { id: "quintessential", name: "Quintessential" }) }
					},
					{
						label: 'Qwigley',
						click () { app.emit('install-font', { id: "qwigley", name: "Qwigley" }) }
					},
					{
						label: 'Racing Sans One',
						click () { app.emit('install-font', { id: "racing-sans-one", name: "Racing Sans One" }) }
					},
					{
						label: 'Radley',
						click () { app.emit('install-font', { id: "radley", name: "Radley" }) }
					},
					{
						label: 'Rajdhani',
						click () { app.emit('install-font', { id: "rajdhani", name: "Rajdhani" }) }
					},
					{
						label: 'Rakkas',
						click () { app.emit('install-font', { id: "rakkas", name: "Rakkas" }) }
					},
					{
						label: 'Raleway',
						click () { app.emit('install-font', { id: "raleway", name: "Raleway" }) }
					},
					{
						label: 'Raleway Dots',
						click () { app.emit('install-font', { id: "raleway-dots", name: "Raleway Dots" }) }
					},
					{
						label: 'Ramabhadra',
						click () { app.emit('install-font', { id: "ramabhadra", name: "Ramabhadra" }) }
					},
					{
						label: 'Ramaraja',
						click () { app.emit('install-font', { id: "ramaraja", name: "Ramaraja" }) }
					},
					{
						label: 'Rambla',
						click () { app.emit('install-font', { id: "rambla", name: "Rambla" }) }
					},
					{
						label: 'Rammetto One',
						click () { app.emit('install-font', { id: "rammetto-one", name: "Rammetto One" }) }
					},
					{
						label: 'Ranchers',
						click () { app.emit('install-font', { id: "ranchers", name: "Ranchers" }) }
					},
					{
						label: 'Rancho',
						click () { app.emit('install-font', { id: "rancho", name: "Rancho" }) }
					},
					{
						label: 'Ranga',
						click () { app.emit('install-font', { id: "ranga", name: "Ranga" }) }
					},
					{
						label: 'Rasa',
						click () { app.emit('install-font', { id: "rasa", name: "Rasa" }) }
					},
					{
						label: 'Rationale',
						click () { app.emit('install-font', { id: "rationale", name: "Rationale" }) }
					},
					{
						label: 'Ravi Prakash',
						click () { app.emit('install-font', { id: "ravi-prakash", name: "Ravi Prakash" }) }
					},
					{
						label: 'Redressed',
						click () { app.emit('install-font', { id: "redressed", name: "Redressed" }) }
					},
					{
						label: 'Reem Kufi',
						click () { app.emit('install-font', { id: "reem-kufi", name: "Reem Kufi" }) }
					},
					{
						label: 'Reenie Beanie',
						click () { app.emit('install-font', { id: "reenie-beanie", name: "Reenie Beanie" }) }
					},
					{
						label: 'Revalia',
						click () { app.emit('install-font', { id: "revalia", name: "Revalia" }) }
					},
					{
						label: 'Rhodium Libre',
						click () { app.emit('install-font', { id: "rhodium-libre", name: "Rhodium Libre" }) }
					},
					{
						label: 'Ribeye',
						click () { app.emit('install-font', { id: "ribeye", name: "Ribeye" }) }
					},
					{
						label: 'Ribeye Marrow',
						click () { app.emit('install-font', { id: "ribeye-marrow", name: "Ribeye Marrow" }) }
					},
					{
						label: 'Righteous',
						click () { app.emit('install-font', { id: "righteous", name: "Righteous" }) }
					},
					{
						label: 'Risque',
						click () { app.emit('install-font', { id: "risque", name: "Risque" }) }
					},
					{
						label: 'Roboto',
						click () { app.emit('install-font', { id: "roboto", name: "Roboto" }) }
					},
					{
						label: 'Roboto Condensed',
						click () { app.emit('install-font', { id: "roboto-condensed", name: "Roboto Condensed" }) }
					},
					{
						label: 'Roboto Mono',
						click () { app.emit('install-font', { id: "roboto-mono", name: "Roboto Mono" }) }
					},
					{
						label: 'Roboto Slab',
						click () { app.emit('install-font', { id: "roboto-slab", name: "Roboto Slab" }) }
					},
					{
						label: 'Rochester',
						click () { app.emit('install-font', { id: "rochester", name: "Rochester" }) }
					},
					{
						label: 'Rock Salt',
						click () { app.emit('install-font', { id: "rock-salt", name: "Rock Salt" }) }
					},
					{
						label: 'Rokkitt',
						click () { app.emit('install-font', { id: "rokkitt", name: "Rokkitt" }) }
					},
					{
						label: 'Romanesco',
						click () { app.emit('install-font', { id: "romanesco", name: "Romanesco" }) }
					},
					{
						label: 'Ropa Sans',
						click () { app.emit('install-font', { id: "ropa-sans", name: "Ropa Sans" }) }
					},
					{
						label: 'Rosario',
						click () { app.emit('install-font', { id: "rosario", name: "Rosario" }) }
					},
					{
						label: 'Rosarivo',
						click () { app.emit('install-font', { id: "rosarivo", name: "Rosarivo" }) }
					},
					{
						label: 'Rouge Script',
						click () { app.emit('install-font', { id: "rouge-script", name: "Rouge Script" }) }
					},
					{
						label: 'Rozha One',
						click () { app.emit('install-font', { id: "rozha-one", name: "Rozha One" }) }
					},
					{
						label: 'Rubik',
						click () { app.emit('install-font', { id: "rubik", name: "Rubik" }) }
					},
					{
						label: 'Rubik Mono One',
						click () { app.emit('install-font', { id: "rubik-mono-one", name: "Rubik Mono One" }) }
					},
					{
						label: 'Ruda',
						click () { app.emit('install-font', { id: "ruda", name: "Ruda" }) }
					},
					{
						label: 'Rufina',
						click () { app.emit('install-font', { id: "rufina", name: "Rufina" }) }
					},
					{
						label: 'Ruge Boogie',
						click () { app.emit('install-font', { id: "ruge-boogie", name: "Ruge Boogie" }) }
					},
					{
						label: 'Ruluko',
						click () { app.emit('install-font', { id: "ruluko", name: "Ruluko" }) }
					},
					{
						label: 'Rum Raisin',
						click () { app.emit('install-font', { id: "rum-raisin", name: "Rum Raisin" }) }
					},
					{
						label: 'Ruslan Display',
						click () { app.emit('install-font', { id: "ruslan-display", name: "Ruslan Display" }) }
					},
					{
						label: 'Russo One',
						click () { app.emit('install-font', { id: "russo-one", name: "Russo One" }) }
					},
					{
						label: 'Ruthie',
						click () { app.emit('install-font', { id: "ruthie", name: "Ruthie" }) }
					},
					{
						label: 'Rye',
						click () { app.emit('install-font', { id: "rye", name: "Rye" }) }
					},
					{
						label: 'Sacramento',
						click () { app.emit('install-font', { id: "sacramento", name: "Sacramento" }) }
					},
					{
						label: 'Sahitya',
						click () { app.emit('install-font', { id: "sahitya", name: "Sahitya" }) }
					},
					{
						label: 'Sail',
						click () { app.emit('install-font', { id: "sail", name: "Sail" }) }
					},
					{
						label: 'Saira',
						click () { app.emit('install-font', { id: "saira", name: "Saira" }) }
					},
					{
						label: 'Saira Condensed',
						click () { app.emit('install-font', { id: "saira-condensed", name: "Saira Condensed" }) }
					},
					{
						label: 'Saira Extra Condensed',
						click () { app.emit('install-font', { id: "saira-extra-condensed", name: "Saira Extra Condensed" }) }
					},
					{
						label: 'Saira Semi Condensed',
						click () { app.emit('install-font', { id: "saira-semi-condensed", name: "Saira Semi Condensed" }) }
					},
					{
						label: 'Salsa',
						click () { app.emit('install-font', { id: "salsa", name: "Salsa" }) }
					},
					{
						label: 'Sanchez',
						click () { app.emit('install-font', { id: "sanchez", name: "Sanchez" }) }
					},
					{
						label: 'Sancreek',
						click () { app.emit('install-font', { id: "sancreek", name: "Sancreek" }) }
					},
					{
						label: 'Sansita',
						click () { app.emit('install-font', { id: "sansita", name: "Sansita" }) }
					},
					{
						label: 'Sarala',
						click () { app.emit('install-font', { id: "sarala", name: "Sarala" }) }
					},
					{
						label: 'Sarina',
						click () { app.emit('install-font', { id: "sarina", name: "Sarina" }) }
					},
					{
						label: 'Sarpanch',
						click () { app.emit('install-font', { id: "sarpanch", name: "Sarpanch" }) }
					},
					{
						label: 'Satisfy',
						click () { app.emit('install-font', { id: "satisfy", name: "Satisfy" }) }
					},
					{
						label: 'Scada',
						click () { app.emit('install-font', { id: "scada", name: "Scada" }) }
					},
					{
						label: 'Scheherazade',
						click () { app.emit('install-font', { id: "scheherazade", name: "Scheherazade" }) }
					},
					{
						label: 'Schoolbell',
						click () { app.emit('install-font', { id: "schoolbell", name: "Schoolbell" }) }
					},
					{
						label: 'Scope One',
						click () { app.emit('install-font', { id: "scope-one", name: "Scope One" }) }
					},
					{
						label: 'Seaweed Script',
						click () { app.emit('install-font', { id: "seaweed-script", name: "Seaweed Script" }) }
					},
					{
						label: 'Secular One',
						click () { app.emit('install-font', { id: "secular-one", name: "Secular One" }) }
					},
					{
						label: 'Sedgwick Ave',
						click () { app.emit('install-font', { id: "sedgwick-ave", name: "Sedgwick Ave" }) }
					},
					{
						label: 'Sedgwick Ave Display',
						click () { app.emit('install-font', { id: "sedgwick-ave-display", name: "Sedgwick Ave Display" }) }
					},
					{
						label: 'Sevillana',
						click () { app.emit('install-font', { id: "sevillana", name: "Sevillana" }) }
					},
					{
						label: 'Seymour One',
						click () { app.emit('install-font', { id: "seymour-one", name: "Seymour One" }) }
					},
					{
						label: 'Shadows Into Light',
						click () { app.emit('install-font', { id: "shadows-into-light", name: "Shadows Into Light" }) }
					},
					{
						label: 'Shadows Into Light Two',
						click () { app.emit('install-font', { id: "shadows-into-light-two", name: "Shadows Into Light Two" }) }
					},
					{
						label: 'Shanti',
						click () { app.emit('install-font', { id: "shanti", name: "Shanti" }) }
					},
					{
						label: 'Share',
						click () { app.emit('install-font', { id: "share", name: "Share" }) }
					},
					{
						label: 'Share Tech',
						click () { app.emit('install-font', { id: "share-tech", name: "Share Tech" }) }
					},
					{
						label: 'Share Tech Mono',
						click () { app.emit('install-font', { id: "share-tech-mono", name: "Share Tech Mono" }) }
					},
					{
						label: 'Shojumaru',
						click () { app.emit('install-font', { id: "shojumaru", name: "Shojumaru" }) }
					},
					{
						label: 'Short Stack',
						click () { app.emit('install-font', { id: "short-stack", name: "Short Stack" }) }
					},
					{
						label: 'Shrikhand',
						click () { app.emit('install-font', { id: "shrikhand", name: "Shrikhand" }) }
					},
					{
						label: 'Siemreap',
						click () { app.emit('install-font', { id: "siemreap", name: "Siemreap" }) }
					},
					{
						label: 'Sigmar One',
						click () { app.emit('install-font', { id: "sigmar-one", name: "Sigmar One" }) }
					},
					{
						label: 'Signika',
						click () { app.emit('install-font', { id: "signika", name: "Signika" }) }
					},
					{
						label: 'Signika Negative',
						click () { app.emit('install-font', { id: "signika-negative", name: "Signika Negative" }) }
					},
					{
						label: 'Simonetta',
						click () { app.emit('install-font', { id: "simonetta", name: "Simonetta" }) }
					},
					{
						label: 'Sintony',
						click () { app.emit('install-font', { id: "sintony", name: "Sintony" }) }
					},
					{
						label: 'Sirin Stencil',
						click () { app.emit('install-font', { id: "sirin-stencil", name: "Sirin Stencil" }) }
					},
					{
						label: 'Six Caps',
						click () { app.emit('install-font', { id: "six-caps", name: "Six Caps" }) }
					},
					{
						label: 'Skranji',
						click () { app.emit('install-font', { id: "skranji", name: "Skranji" }) }
					},
					{
						label: 'Slabo 13px',
						click () { app.emit('install-font', { id: "slabo-13px", name: "Slabo 13px" }) }
					},
					{
						label: 'Slabo 27px',
						click () { app.emit('install-font', { id: "slabo-27px", name: "Slabo 27px" }) }
					},
					{
						label: 'Slackey',
						click () { app.emit('install-font', { id: "slackey", name: "Slackey" }) }
					},
					{
						label: 'Smokum',
						click () { app.emit('install-font', { id: "smokum", name: "Smokum" }) }
					},
					{
						label: 'Smythe',
						click () { app.emit('install-font', { id: "smythe", name: "Smythe" }) }
					},
					{
						label: 'Sniglet',
						click () { app.emit('install-font', { id: "sniglet", name: "Sniglet" }) }
					},
					{
						label: 'Snippet',
						click () { app.emit('install-font', { id: "snippet", name: "Snippet" }) }
					},
					{
						label: 'Snowburst One',
						click () { app.emit('install-font', { id: "snowburst-one", name: "Snowburst One" }) }
					},
					{
						label: 'Sofadi One',
						click () { app.emit('install-font', { id: "sofadi-one", name: "Sofadi One" }) }
					},
					{
						label: 'Sofia',
						click () { app.emit('install-font', { id: "sofia", name: "Sofia" }) }
					},
					{
						label: 'Sonsie One',
						click () { app.emit('install-font', { id: "sonsie-one", name: "Sonsie One" }) }
					},
					{
						label: 'Sorts Mill Goudy',
						click () { app.emit('install-font', { id: "sorts-mill-goudy", name: "Sorts Mill Goudy" }) }
					},
					{
						label: 'Source Code Pro',
						click () { app.emit('install-font', { id: "source-code-pro", name: "Source Code Pro" }) }
					},
					{
						label: 'Source Sans Pro',
						click () { app.emit('install-font', { id: "source-sans-pro", name: "Source Sans Pro" }) }
					},
					{
						label: 'Source Serif Pro',
						click () { app.emit('install-font', { id: "source-serif-pro", name: "Source Serif Pro" }) }
					},
					{
						label: 'Space Mono',
						click () { app.emit('install-font', { id: "space-mono", name: "Space Mono" }) }
					},
					{
						label: 'Special Elite',
						click () { app.emit('install-font', { id: "special-elite", name: "Special Elite" }) }
					},
					{
						label: 'Spectral',
						click () { app.emit('install-font', { id: "spectral", name: "Spectral" }) }
					},
					{
						label: 'Spectral SC',
						click () { app.emit('install-font', { id: "spectral-sc", name: "Spectral SC" }) }
					},
					{
						label: 'Spicy Rice',
						click () { app.emit('install-font', { id: "spicy-rice", name: "Spicy Rice" }) }
					},
					{
						label: 'Spinnaker',
						click () { app.emit('install-font', { id: "spinnaker", name: "Spinnaker" }) }
					},
					{
						label: 'Spirax',
						click () { app.emit('install-font', { id: "spirax", name: "Spirax" }) }
					},
					{
						label: 'Squada One',
						click () { app.emit('install-font', { id: "squada-one", name: "Squada One" }) }
					},
					{
						label: 'Sree Krushnadevaraya',
						click () { app.emit('install-font', { id: "sree-krushnadevaraya", name: "Sree Krushnadevaraya" }) }
					},
					{
						label: 'Sriracha',
						click () { app.emit('install-font', { id: "sriracha", name: "Sriracha" }) }
					},
					{
						label: 'Stalemate',
						click () { app.emit('install-font', { id: "stalemate", name: "Stalemate" }) }
					},
					{
						label: 'Stalinist One',
						click () { app.emit('install-font', { id: "stalinist-one", name: "Stalinist One" }) }
					},
					{
						label: 'Stardos Stencil',
						click () { app.emit('install-font', { id: "stardos-stencil", name: "Stardos Stencil" }) }
					},
					{
						label: 'Stint Ultra Condensed',
						click () { app.emit('install-font', { id: "stint-ultra-condensed", name: "Stint Ultra Condensed" }) }
					},
					{
						label: 'Stint Ultra Expanded',
						click () { app.emit('install-font', { id: "stint-ultra-expanded", name: "Stint Ultra Expanded" }) }
					},
					{
						label: 'Stoke',
						click () { app.emit('install-font', { id: "stoke", name: "Stoke" }) }
					},
					{
						label: 'Strait',
						click () { app.emit('install-font', { id: "strait", name: "Strait" }) }
					},
					{
						label: 'Sue Ellen Francisco',
						click () { app.emit('install-font', { id: "sue-ellen-francisco", name: "Sue Ellen Francisco" }) }
					},
					{
						label: 'Suez One',
						click () { app.emit('install-font', { id: "suez-one", name: "Suez One" }) }
					},
					{
						label: 'Sumana',
						click () { app.emit('install-font', { id: "sumana", name: "Sumana" }) }
					},
					{
						label: 'Sunshiney',
						click () { app.emit('install-font', { id: "sunshiney", name: "Sunshiney" }) }
					},
					{
						label: 'Supermercado One',
						click () { app.emit('install-font', { id: "supermercado-one", name: "Supermercado One" }) }
					},
					{
						label: 'Sura',
						click () { app.emit('install-font', { id: "sura", name: "Sura" }) }
					},
					{
						label: 'Suranna',
						click () { app.emit('install-font', { id: "suranna", name: "Suranna" }) }
					},
					{
						label: 'Suravaram',
						click () { app.emit('install-font', { id: "suravaram", name: "Suravaram" }) }
					},
					{
						label: 'Suwannaphum',
						click () { app.emit('install-font', { id: "suwannaphum", name: "Suwannaphum" }) }
					},
					{
						label: 'Swanky and Moo Moo',
						click () { app.emit('install-font', { id: "swanky-and-moo-moo", name: "Swanky and Moo Moo" }) }
					},
					{
						label: 'Syncopate',
						click () { app.emit('install-font', { id: "syncopate", name: "Syncopate" }) }
					},
					{
						label: 'Tangerine',
						click () { app.emit('install-font', { id: "tangerine", name: "Tangerine" }) }
					},
					{
						label: 'Taprom',
						click () { app.emit('install-font', { id: "taprom", name: "Taprom" }) }
					},
					{
						label: 'Tauri',
						click () { app.emit('install-font', { id: "tauri", name: "Tauri" }) }
					},
					{
						label: 'Taviraj',
						click () { app.emit('install-font', { id: "taviraj", name: "Taviraj" }) }
					},
					{
						label: 'Teko',
						click () { app.emit('install-font', { id: "teko", name: "Teko" }) }
					},
					{
						label: 'Telex',
						click () { app.emit('install-font', { id: "telex", name: "Telex" }) }
					},
					{
						label: 'Tenali Ramakrishna',
						click () { app.emit('install-font', { id: "tenali-ramakrishna", name: "Tenali Ramakrishna" }) }
					},
					{
						label: 'Tenor Sans',
						click () { app.emit('install-font', { id: "tenor-sans", name: "Tenor Sans" }) }
					},
					{
						label: 'Text Me One',
						click () { app.emit('install-font', { id: "text-me-one", name: "Text Me One" }) }
					},
					{
						label: 'The Girl Next Door',
						click () { app.emit('install-font', { id: "the-girl-next-door", name: "The Girl Next Door" }) }
					},
					{
						label: 'Tienne',
						click () { app.emit('install-font', { id: "tienne", name: "Tienne" }) }
					},
					{
						label: 'Tillana',
						click () { app.emit('install-font', { id: "tillana", name: "Tillana" }) }
					},
					{
						label: 'Timmana',
						click () { app.emit('install-font', { id: "timmana", name: "Timmana" }) }
					},
					{
						label: 'Tinos',
						click () { app.emit('install-font', { id: "tinos", name: "Tinos" }) }
					},
					{
						label: 'Titan One',
						click () { app.emit('install-font', { id: "titan-one", name: "Titan One" }) }
					},
					{
						label: 'Titillium Web',
						click () { app.emit('install-font', { id: "titillium-web", name: "Titillium Web" }) }
					},
					{
						label: 'Trade Winds',
						click () { app.emit('install-font', { id: "trade-winds", name: "Trade Winds" }) }
					},
					{
						label: 'Trirong',
						click () { app.emit('install-font', { id: "trirong", name: "Trirong" }) }
					},
					{
						label: 'Trocchi',
						click () { app.emit('install-font', { id: "trocchi", name: "Trocchi" }) }
					},
					{
						label: 'Trochut',
						click () { app.emit('install-font', { id: "trochut", name: "Trochut" }) }
					},
					{
						label: 'Trykker',
						click () { app.emit('install-font', { id: "trykker", name: "Trykker" }) }
					},
					{
						label: 'Tulpen One',
						click () { app.emit('install-font', { id: "tulpen-one", name: "Tulpen One" }) }
					},
					{
						label: 'Ubuntu',
						click () { app.emit('install-font', { id: "ubuntu", name: "Ubuntu" }) }
					},
					{
						label: 'Ubuntu Condensed',
						click () { app.emit('install-font', { id: "ubuntu-condensed", name: "Ubuntu Condensed" }) }
					},
					{
						label: 'Ubuntu Mono',
						click () { app.emit('install-font', { id: "ubuntu-mono", name: "Ubuntu Mono" }) }
					},
					{
						label: 'Ultra',
						click () { app.emit('install-font', { id: "ultra", name: "Ultra" }) }
					},
					{
						label: 'Uncial Antiqua',
						click () { app.emit('install-font', { id: "uncial-antiqua", name: "Uncial Antiqua" }) }
					},
					{
						label: 'Underdog',
						click () { app.emit('install-font', { id: "underdog", name: "Underdog" }) }
					},
					{
						label: 'Unica One',
						click () { app.emit('install-font', { id: "unica-one", name: "Unica One" }) }
					},
					{
						label: 'UnifrakturCook',
						click () { app.emit('install-font', { id: "unifrakturcook", name: "UnifrakturCook" }) }
					},
					{
						label: 'UnifrakturMaguntia',
						click () { app.emit('install-font', { id: "unifrakturmaguntia", name: "UnifrakturMaguntia" }) }
					},
					{
						label: 'Unkempt',
						click () { app.emit('install-font', { id: "unkempt", name: "Unkempt" }) }
					},
					{
						label: 'Unlock',
						click () { app.emit('install-font', { id: "unlock", name: "Unlock" }) }
					},
					{
						label: 'Unna',
						click () { app.emit('install-font', { id: "unna", name: "Unna" }) }
					},
					{
						label: 'Vampiro One',
						click () { app.emit('install-font', { id: "vampiro-one", name: "Vampiro One" }) }
					},
					{
						label: 'Varela',
						click () { app.emit('install-font', { id: "varela", name: "Varela" }) }
					},
					{
						label: 'Varela Round',
						click () { app.emit('install-font', { id: "varela-round", name: "Varela Round" }) }
					},
					{
						label: 'Vast Shadow',
						click () { app.emit('install-font', { id: "vast-shadow", name: "Vast Shadow" }) }
					},
					{
						label: 'Vesper Libre',
						click () { app.emit('install-font', { id: "vesper-libre", name: "Vesper Libre" }) }
					},
					{
						label: 'Vibur',
						click () { app.emit('install-font', { id: "vibur", name: "Vibur" }) }
					},
					{
						label: 'Vidaloka',
						click () { app.emit('install-font', { id: "vidaloka", name: "Vidaloka" }) }
					},
					{
						label: 'Viga',
						click () { app.emit('install-font', { id: "viga", name: "Viga" }) }
					},
					{
						label: 'Voces',
						click () { app.emit('install-font', { id: "voces", name: "Voces" }) }
					},
					{
						label: 'Volkhov',
						click () { app.emit('install-font', { id: "volkhov", name: "Volkhov" }) }
					},
					{
						label: 'Vollkorn',
						click () { app.emit('install-font', { id: "vollkorn", name: "Vollkorn" }) }
					},
					{
						label: 'Vollkorn SC',
						click () { app.emit('install-font', { id: "vollkorn-sc", name: "Vollkorn SC" }) }
					},
					{
						label: 'Voltaire',
						click () { app.emit('install-font', { id: "voltaire", name: "Voltaire" }) }
					},
					{
						label: 'VT323',
						click () { app.emit('install-font', { id: "vt323", name: "VT323" }) }
					},
					{
						label: 'Waiting for the Sunrise',
						click () { app.emit('install-font', { id: "waiting-for-the-sunrise", name: "Waiting for the Sunrise" }) }
					},
					{
						label: 'Wallpoet',
						click () { app.emit('install-font', { id: "wallpoet", name: "Wallpoet" }) }
					},
					{
						label: 'Walter Turncoat',
						click () { app.emit('install-font', { id: "walter-turncoat", name: "Walter Turncoat" }) }
					},
					{
						label: 'Warnes',
						click () { app.emit('install-font', { id: "warnes", name: "Warnes" }) }
					},
					{
						label: 'Wellfleet',
						click () { app.emit('install-font', { id: "wellfleet", name: "Wellfleet" }) }
					},
					{
						label: 'Wendy One',
						click () { app.emit('install-font', { id: "wendy-one", name: "Wendy One" }) }
					},
					{
						label: 'Wire One',
						click () { app.emit('install-font', { id: "wire-one", name: "Wire One" }) }
					},
					{
						label: 'Work Sans',
						click () { app.emit('install-font', { id: "work-sans", name: "Work Sans" }) }
					},
					{
						label: 'Yanone Kaffeesatz',
						click () { app.emit('install-font', { id: "yanone-kaffeesatz", name: "Yanone Kaffeesatz" }) }
					},
					{
						label: 'Yantramanav',
						click () { app.emit('install-font', { id: "yantramanav", name: "Yantramanav" }) }
					},
					{
						label: 'Yatra One',
						click () { app.emit('install-font', { id: "yatra-one", name: "Yatra One" }) }
					},
					{
						label: 'Yellowtail',
						click () { app.emit('install-font', { id: "yellowtail", name: "Yellowtail" }) }
					},
					{
						label: 'Yeseva One',
						click () { app.emit('install-font', { id: "yeseva-one", name: "Yeseva One" }) }
					},
					{
						label: 'Yesteryear',
						click () { app.emit('install-font', { id: "yesteryear", name: "Yesteryear" }) }
					},
					{
						label: 'Yrsa',
						click () { app.emit('install-font', { id: "yrsa", name: "Yrsa" }) }
					},
					{
						label: 'Zeyada',
						click () { app.emit('install-font', { id: "zeyada", name: "Zeyada" }) }
					},
					{
						label: 'Zilla Slab',
						click () { app.emit('install-font', { id: "zilla-slab", name: "Zilla Slab" }) }
					},
					{
						label: 'Zilla Slab Highlight',
						click () { app.emit('install-font', { id: "zilla-slab-highlight", name: "Zilla Slab Highlight" }) }
					}
				], 
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



const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
