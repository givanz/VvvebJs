# boxicons 
[![Financial Contributors on Open Collective](https://opencollective.com/boxicons/all/badge.svg?label=financial+contributors)](https://opencollective.com/boxicons) [![GitHub issues](https://img.shields.io/github/issues/atisawd/boxicons.svg)](https://github.com/atisawd/boxicons/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/atisawd/boxicons.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fatisawd%2Fboxicons)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/atisawd)



_High Quality web friendly icons_

'Boxicons' is a carefully designed open source iconset with 1500+ icons. It's crafted to look enrich your website/app experience.


_Announcing Boxicons v2.1.1!_

- Fixed the errors with a few svgs, added viewbox
- Added 30 new icons


## Installation

To install via npm, simply do the following:

```bash
$ npm install boxicons --save
```
import the module

```javscript
import 'boxicons';
```
## Usage

### Using via CSS

1. Include the stylesheet on your document's `<head>`

```html
<head>
  <link rel="stylesheet" href="boxicons.min.css">
</head>
```

Instead of installing you may use the remote version 

```html
<head>
  <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <!-- or -->
  <link rel="stylesheet"
  href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
</head>
```


2. To use an icon on your page, add a class 'bx' and seperate class with the icons name with a prefix 'bx-' for regular icons , 'bxs-' for solid icons and 'bxl-' for logos:

```html
<i class="bx bx-hot"></i>
<i class="bx bxs-hot"></i>
<i class="bx bxl-facebook-square"></i>
```
### Using via Web Component

Boxicons includes a Custom Element that makes using icons easy and efficient. To use it, add the `box-icon-element.js` file to the page:

```html
<script src="https://unpkg.com/boxicons@2.0.9/dist/boxicons.js"></script>
```

To use an icon, add the `<box-icon>` element to the location where the icon should be displayed:

```html
<box-icon name="hot"></box-icon>
```
  To use solid icons or logos add attribute `type` as solid or logo before the name
 ```html
<box-icon type="solid" name="hot"></box-icon>
<box-icon type="logo" name="facebook-square"></box-icon>
```                  
The `<box-icon>` custom element supports the following attributes:

```html
<box-icon
    type = "regular|solid|logo"
    name="adjust|alarms|etc...."
    color="blue|red|etc..."
    size="xs|sm|md|lg|cssSize"
    rotate="90|180|270"
    flip="horizontal|vertical"
    border="square|circle"
    animation="spin|tada|etc..."
    pull = "left|right"
></box-icon>
```
-   `type`: Should always be first and be one of the following values: `regular`,`solid`, `logo`
-   `name` : (REQUIRED) the name of the icon to be displayed
-   `color`: A color for the icon.
-   `size`: The size for the icon. It supports one of two types of values: 
    -   One of the following shortcuts: `xs`, `sm`, `md`, `lg`
    -   A css unit size (ex. `60px`) 
-   `rotate`: one of the following values: `90`, `180`, `270`
-   `flip`:  one of the following values: `horizontal`, `vertical`
-   `border`: one of the following values: `square`, `circle`
-   `animation`: One of the following values: `spin`, `tada`, `flashing`, `burst`, `fade-left`, `fade-right`, `spin-hover`, `tada-hover`, `flashing-hover`, `burst-hover`, `fade-left-hover`, `fade-right-hover`
-   `pull`: one of the following values: `left`,`right`
The Custom Element class (`BoxIconElement`) exposes the following static members:

-   `tagName`: property that holds the HTML element tag name. Default: `box-icon`
-   `defined([tagName])`: Defines the Element in the custom element registry using either the tagName provided on input or the (default) the one defined on the Class.
-   `cdnUrl`: property that holds the URL that will be used to retrieve the images. URL should point to the folder that contains the images. example: `//unpkg.com/boxicons@1.5.2/svg` (no trailing forward slash)
-   `getIconSvg(iconName)`: method used to retrieve the SVG image. Should return a Promise that resolves with the SVG source (String).


[Check out all the icons here!](https://boxicons.com)



## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/atisawd/boxicons/graphs/contributors"><img src="https://opencollective.com/boxicons/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/boxicons/contribute)]

#### Individuals

<a href="https://opencollective.com/boxicons"><img src="https://opencollective.com/boxicons/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/boxicons/contribute)]

<a href="https://opencollective.com/boxicons/organization/0/website"><img src="https://opencollective.com/boxicons/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/1/website"><img src="https://opencollective.com/boxicons/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/2/website"><img src="https://opencollective.com/boxicons/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/3/website"><img src="https://opencollective.com/boxicons/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/4/website"><img src="https://opencollective.com/boxicons/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/5/website"><img src="https://opencollective.com/boxicons/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/6/website"><img src="https://opencollective.com/boxicons/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/7/website"><img src="https://opencollective.com/boxicons/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/8/website"><img src="https://opencollective.com/boxicons/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/boxicons/organization/9/website"><img src="https://opencollective.com/boxicons/organization/9/avatar.svg"></a>

## License

- The icons (.svg) files are free to download and are licensed under CC 4.0 By downloading it is assumed that you agree with the terms mentioned in CC 4.0.
- The fonts files are licensed under SIL OFL 1.1.
- Attribution is not required but is appreciated.
- Other files which are not fonts or icons are licensed under the MIT License.

[You can read more about the license here!](https://boxicons.com/get-started#license)


## Contributing

Pull requests are the way to go here. I apologise in advance for the slow action on pull requests and issues.

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](https://github.com/atisawd/boxicons/blob/master/README.md)
