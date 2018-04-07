# ![mdg-font-manager-icon](https://user-images.githubusercontent.com/1267580/38451937-aad2baec-3a39-11e8-84ad-c2b07960468c.png) MDG Font Manager

A simple font manager for Mac. For activating and disabling fonts and installing Google Fonts.

![mdg-font-manager](https://user-images.githubusercontent.com/1267580/38451938-ab277e1a-3a39-11e8-8cb0-6af6c8e96ab9.png)

## Requirements

[node.js / npm](https://www.npmjs.com/get-npm)
To modify a/o build this project you will need to install electron and electron packager

```shell
npm install electron -g --save-exact
npm install electron-packager -g
```

## Usage

`cd` to the root directory and run:
```shell
npm install
```

To modify the `html` / `css` / `js` run:
```shell
gulp watch
```

To update all files prior to packaging run:
```shell
gulp build
```

To package the final app run:
```shell
npm run package
```

**Note**: packaging the app runs `npm prune -production` and so you will need to run `npm install` again before making any further modifications.

## License

**MDG Font Manager** is released under the MIT Licence
