# Ikonate

[![npm version](https://badge.fury.io/js/ikonate.svg)](https://badge.fury.io/js/ikonate)

Ikonate are fully customisable & accessible[*](http://github.com/eucalyptuss/ikonate#accessibility), well-optimised vector icons.

To learn more about the project and generate the icons online, visit [Ikonate.com](http://ikonate.com). In the downloaded .zip file you will find:
* customised SVG icons as stand-alone files (perfect for designers who don't want to edit code)
* customised SVG sprite with an html demo
* customised html demo of the icons as inline SVG

You can also follow the documentation below to generate generic demo files with all the available icons and customise them manually.

*Built by [@mikolajdobrucki](https://twitter.com/mikolajdobrucki) & [@mzaremski](https://github.com/mzaremski) at [ucreate](http://www.ucreate.it/)*

## Installation

## Git repository

You can clone this repository to manually install Ikonate in your project…

```bash
git clone https://github.com/eucalyptuss/ikonate.git
```
### Install with npm

…or you can download the icons using [npm](http://npmjs.com/) package manager.

```bash
npm install ikonate
```

### Build

To generate generic demo files and SVG sprites, install [npm](http://npmjs.com/) dependencies first.
```bash
npm install
```

Then, run a build command from the main repo directory.
```bash
npm run build
```

## Demo & files structure

### Raw SVG

All the icons are available as raw, unstyled SVGs at `./ikonate/icons`.

### Demo files

*To view the demo files, remember to run [a build command](http://github.com/eucalyptuss/ikonate#build) first.*

The generated demos of inline SVGs and SVG sprites are available respectively under `./ikonate/build/inline/index.html` and `./ikonate/build/sprite/index.html`.

**IT DOESN'T WORK!** If you open the sprite demo directly in your browser, it may not display the icons correctly. To fix it, open it using an local server such as [http-server](https://www.npmjs.com/package/http-server).

## Usage

### As `<img>` or `background-image`.

Reference: [CSS Tricks: Using SVG as an `<img>`](https://css-tricks.com/using-svg/#article-header-id-2)

To generate your icons as separate *styled* svg files, visit [Ikonate.com](http://ikonate.com).

Remember that using icons as `<img>` or `background-image`, you can't customise them with CSS.

### As inline SVG.

Reference: [CSS Tricks: Using "inline" SVG](https://css-tricks.com/using-svg/#article-header-id-7)

To use icons as inline svg, import the icons you need using a technique appropriate for your project from `./ikonate/icons`.

Using this approach, you can later [customise the icons with CSS](http://github.com/eucalyptuss/ikonate#customisation).

### As SVG sprite.

Reference: [CSS Tricks: SVG `use` with External Reference](https://css-tricks.com/svg-use-with-external-reference-take-2/)

After running [the build command](http://github.com/eucalyptuss/ikonate#build) successfully, you will find the SVG sprite with all the available icons in `./ikonate/sprite`.

To generate your custom optimised SVG sprite, visit [Ikonate.com](http://ikonate.com).

Using this approach, you can later [customise the icons with CSS](http://github.com/eucalyptuss/ikonate#customisation).

If you'd like to learn more about different ways of using SVG in your project, check out the following articles:
* [A Practical Guide by svgontheweb.com](https://svgontheweb.com/#implementation)
* [Using SVG Tutorial by CSS-Tricks](https://css-tricks.com/using-svg/)

## Customisation

To customise icons with CSS you need to use the icons as either inline SVG or SVG sprite.

You can use the following CSS parameters to customise the icons:
* `width`
* `height`
* `stroke`
* `stroke-width`
* `stroke-linecap`
* `stroke-linejoin`

e.g.:

```css
width: 24px;
height: 24px;
stroke: currentColor;
stroke-width: 2;
stroke-linecap: round;
stroke-linejoin: round;
```

Check [the demo files](http://github.com/eucalyptuss/ikonate#demo-files) for a representative example.

You can also generate the styles and all the customised demo files at [Ikonate.com](http://ikonate.com).

## Accessibility

Ikonate is NOT accessible out of the box and will never be. We've done our best to follow the best accessibility practices while building this software, but it's your role to adjust it and make it truly accessible inside your project.

E.g. all the titles and descriptions given to the icons should be treated as placeholders and changed in implementation depending on an actual role of each icon. In many cases, you may not need them altogether.

To learn more on this topic, read an excellent article by Chris Coyier: [How Can I Make My Icon System Accessible?](https://css-tricks.com/can-make-icon-system-accessible/)

## License

Ikonate is available under the [MIT](https://github.com/eucalyptuss/ikonate/blob/master/LICENSE). Feel free to use the set in both personal and commercial projects. Attribution is much appreciated but not required.
