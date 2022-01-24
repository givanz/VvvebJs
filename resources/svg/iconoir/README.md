<p align="center">
  <img src="assets/iconoir.png" alt="Iconoir">
</p>

<p align="center">
  Iconoir is an open source library with 1000+ SVG Icons, designed on a 24x24 pixels grid. No premium icons, no email sign-up, no newsletters.
<p>

<p align="center">
  <a href="https://iconoir.com"><strong>Browse at iconoir.com &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://github.com/lucaburgio/iconoir/releases">
    <img src="https://img.shields.io/github/v/release/lucaburgio/iconoir?style=flat-square" alt="Version">
  </a>
  <a href="https://github.com/lucaburgio/iconoir">
    <img src="https://img.shields.io/github/stars/lucaburgio/iconoir?style=flat-square" alt="Project Stars">
  </a>
  <a href="https://github.com/lucaburgio/iconoir/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/lucaburgio/iconoir?style=flat-square" alt="License">
  </a>
</p>

## Basic Usage

You can download any icon of the pack directly from https://iconoir.com or get them from this repository.

Additionally, the icons are available via the `iconoir` NPM package:
```bash
yarn add iconoir
# or
npm i iconoir
```

Example usage:
```js
import Iconoir from 'iconoir/icons/iconoir.svg'
```

## React

A React library is available to install under the name `iconoir-react`. For more details, see the package [README](./packages/iconoir-react).

## React Native

A React Native library is available to install under the name `iconoir-react-native`. For more details, see the package [README](./packages/iconoir-react-native).

## Framer

Iconoir is happily part of [Framer](https://framer.com) now. To start using the icons: On the top menu, `Insert` > `Graphics` > `Iconoir`.
You can switch between icons from the right sidebar in the editor.

## CSS

Import the CSS File:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@master/css/iconoir.css">
```

Here is an example in HTML:

```html
<i class="iconoir-hand-brake"></i>
```
The class must always be "iconoir-" and then the name of the icon. You can find the names of the icons [here](https://iconoir.com).

## Figma

The library is available in the Figma community [here](https://www.figma.com/community/file/983248991460488027/Iconoir-Pack).

## License

MIT License
