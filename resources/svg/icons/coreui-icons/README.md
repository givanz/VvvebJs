
<p align="center">
  <img height="50" src="https://coreui.io/images/brands/coreui-icons.svg">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@coreui/icons">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@coreui/icons">
  </a>
  <a href="https://www.npmjs.com/package/@coreui/icons">
    <img alt="npm" src="https://img.shields.io/npm/dw/@coreui/icons">
  </a>
</p>

# CoreUI Icons (1500+ Free icons)- Simply beautiful open source icons

CoreUI Icons is an open-source icon set with more than 1500 icons in multiple formats SVG, PNG, and Webfonts. CoreUI Icons are beautifully crafted symbols for common actions and items. You can use them in your digital products for web or mobile app.

![CoreUI Free Icons](https://coreui.io/images/icons_free_bg_set.png)

## Table of Contents

- [CoreUI Icons (1500+ Free icons)- Simply beautiful open source icons](#coreui-icons-1500-free-icons--simply-beautiful-open-source-icons)
  - [Table of Contents](#table-of-contents)
  - [Preview & Docs](#preview--docs)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
    - [Yarn](#yarn)
  - [Usage](#usage)
    - [Basic Use](#basic-use)
    - [SVG Sprites](#svg-sprites)
    - [SVG Symbols](#svg-symbols)
    - [CoreUI Icons for Angular](#coreui-icons-for-angular)
    - [CoreUI Icons for React.js](#coreui-icons-for-reactjs)
    - [CoreUI Icons for Vue.js](#coreui-icons-for-vuejs)
  - [CoreUI Icons PRO](#coreui-icons-pro)
  - [License](#license)
    - [CoreUI Icons Free Icons](#coreui-icons-free-icons)
    - [CoreUI Icons Brand and Flag Icons](#coreui-icons-brand-and-flag-icons)
      - [Brand Icons](#brand-icons)
## Preview & Docs

[https://coreui.io/icons/](https://coreui.io/icons/)


## Installation

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@coreui/icons/css/all.min.css">
```

or 

```html
<link rel="stylesheet" href="https://unpkg.com/@coreui/icons/css/free.min.css">
<link rel="stylesheet" href="https://unpkg.com/@coreui/icons/css/brand.min.css">
<link rel="stylesheet" href="https://unpkg.com/@coreui/icons/css/flag.min.css">
```

### NPM

```shell
npm install @coreui/icons --save
```

### Yarn

```shell
yarn add @coreui/icons
```

Or, you can also clone or [download this repository](https://github.com/coreui/coreui-icons/archive/master.zip) as zip.

## Usage

### Basic Use
You can place CoreUI Icons just about anywhere using a CSS style prefix and the icon’s name. CoreUI Icons are designed to be used with inline elements ex. `<i>` or `<span>`.

Please use `cil-` prefix for linear icons, `cib-` prefix for brand icons, and `cif-` prefix for flag icons.

```html
<i class="cil-energy"></i>
```

```html
<i class="cib-twitter"></i>
```

```html
<i class="cif-us"></i>
```

### SVG Sprites

SVG sprites let you quickly use vector icons in your website. We have prepared all the icon set styles into their own SVG sprites.

Place sprite files with the rest of your static files, like images and styles, in your project. Make sure to add a proper path to the SVG sprite file, and use the fragment identifier specific to the SVG icon or symbol you want to display.

```html
<svg>
  <use xlink:href="path/to/free.svg#cil-airplane-mode"></use>
</svg>
<svg>
  <use xlink:href="path/to/brand.svg#cib-twitter"></use>
</svg>
<svg>
  <use xlink:href="path/to/flag.svg#cif-us"></use>
</svg>
```


### SVG Symbols

When you download your icon set, it comes with a sprites directory that contains SVG icon definitions. These icons can be referenced and used as inline SVGs like so:

```html
<!-- Define the symbols -->
<symbol id="cil-apple" viewBox="0 0 24 24">
<title>apple</title>
<path d="M21.207 9.987c-0.497-1.275-1.29-2.262-2.293-2.863-0.25 0.477-0.524 0.888-0.835 1.267l0.010-0.013c0.002 0.001 0.004 0.002 0.005 0.003 1.494 0.859 2.364 3.054 2.114 5.338-0.414 3.784-1.563 6.377-3.236 7.302-1.087 0.601-2.444 0.516-4.031-0.254l-0.155-0.075h-1.143l-0.155 0.075c-1.588 0.77-2.944 0.856-4.031 0.254-1.673-0.925-2.822-3.518-3.236-7.302-0.25-2.284 0.619-4.479 2.114-5.338 0.445-0.259 0.979-0.411 1.549-0.411 0.011 0 0.023 0 0.034 0l-0.002-0c1.132 0 2.436 0.53 3.853 1.578l0.051 0.037s2.043-0.248 2.852-0.616c2.439-1.107 2.976-2.867 3.072-3.106 0.262-0.632 0.414-1.366 0.414-2.135 0-0.813-0.17-1.587-0.476-2.287l0.014 0.037-0.191-0.477-0.513 0.005c-3.151 0.036-5.692 2.598-5.692 5.755 0 0.255 0.017 0.507 0.049 0.754l-0.003-0.029c-0.886-0.496-1.747-0.813-2.573-0.944-1.169-0.186-2.241-0.005-3.186 0.538-1.038 0.596-1.855 1.601-2.364 2.906-0.463 1.186-0.638 2.57-0.493 3.895 0.475 4.344 1.859 7.267 4.001 8.452 0.655 0.37 1.438 0.588 2.272 0.588 0.010 0 0.021-0 0.031-0h-0.002c0.918-0 1.904-0.244 2.952-0.73h0.461c1.987 0.923 3.754 0.971 5.253 0.142 2.142-1.185 3.526-4.107 4.001-8.452 0.145-1.325-0.030-2.709-0.493-3.895zM15.376 2.851c0.322-0.143 0.697-0.251 1.088-0.305l0.022-0.003c0.106 0.354 0.167 0.761 0.167 1.182 0 2.15-1.593 3.927-3.663 4.215l-0.022 0.003c-0.106-0.354-0.167-0.76-0.167-1.181 0-1.743 1.048-3.242 2.547-3.901l0.027-0.011z"></path>
</symbol>

<!-- Use the defined symbols -->
<svg>
  <use xlink:href="#cil-apple"></use>
</svg>
```

It is also possible to link to an external SVG containing the definitions:

```html
<svg class="icon-home">
  <use xlink:href="path/to/free.svg#cil-apple"></use>
</svg>
```

Referencing an external SVG has the advantage that your icons get cached, with one HTTP request. But the external SVG and the HTML should be served from the same domain. This approach works fine in modern browsers except for IE 9+. In order to support IE 9+, You should use `/js/svgxuse.js` or `/js/svgxuse.min.js`. This polyfill detects if the icons are loaded properly; if they aren't, it sends one HTTP request to fetch and cache symbol definitions.

```html
<script defer src="https://unpkg.com/@coreui/icons/js/svgxuse.js"></script>
```
### CoreUI Icons for Angular

- Please check official repository [CoreUI Icons for Angular](https://github.com/coreui/coreui-icons-angular)

### CoreUI Icons for React.js

- Please check official repository [CoreUI Icons for React](https://github.com/coreui/coreui-icons-react)

### CoreUI Icons for Vue.js

- Please check official repository [CoreUI Icons for Vue.js](https://github.com/coreui/coreui-icons-vue)

## CoreUI Icons PRO

If our free icon set is insufficient you can buy [CoreUI Icons Pro](https://coreui.io/icons/pro/) with more than 2000 icons, and more styles - Solid, Duo-Tone and Linear.

## License

### CoreUI Icons Free Icons

CoreUI Icons Free is free, open source, and GPL friendly. You can use it for
commercial projects, open source projects, or really almost whatever you want.

- Icons — CC BY 4.0 License
  - In the CoreUI Icons Free, the CC BY 4.0 license applies to all icons 
  packaged as .svg and .js files types.
- Fonts — SIL OFL 1.1 License
  - In the CoreUI Icons Free, the SIL OLF license applies to all icons 
  packaged as web and desktop font files.
- Code — MIT License
  - In the CoreUI Icons Free, the MIT license applies to all 
  non-font and non-icon files.

### CoreUI Icons Brand and Flag Icons

#### Brand Icons
All brand icons are trademarks of their respective owners. The use of these
trademarks does not indicate endorsement of the trademark holder by Font
Awesome, nor vice versa. **Please do not use brand logos for any purpose except
to represent the company, product, or service to which they refer.**

**CC0 1.0 Universal**
Statement of Purpose

The laws of most jurisdictions throughout the world automatically confer
exclusive Copyright and Related Rights (defined below) upon the creator and
subsequent owner(s) (each and all, an "owner") of an original work of
authorship and/or a database (each, a "Work").

Certain owners wish to permanently relinquish those rights to a Work for the
purpose of contributing to a commons of creative, cultural and scientific
works ("Commons") that the public can reliably and without fear of later
claims of infringement build upon, modify, incorporate in other works, reuse
and redistribute as freely as possible in any form whatsoever and for any
purposes, including without limitation commercial purposes. These owners may
contribute to the Commons to promote the ideal of a free culture and the
further production of creative, cultural and scientific works, or to gain
reputation or greater distribution for their Work in part through the use and
efforts of others.

For these and/or other purposes and motivations, and without any expectation
of additional consideration or compensation, the person associating CC0 with a
Work (the "Affirmer"), to the extent that he or she is an owner of Copyright
and Related Rights in the Work, voluntarily elects to apply CC0 to the Work
and publicly distribute the Work under its terms, with knowledge of his or her
Copyright and Related Rights in the Work and the meaning and intended legal
effect of CC0 on those rights.

1. Copyright and Related Rights. A Work made available under CC0 may be
protected by copyright and related or neighboring rights ("Copyright and
Related Rights"). Copyright and Related Rights include, but are not limited
to, the following:

  i. the right to reproduce, adapt, distribute, perform, display, communicate,
  and translate a Work;

  ii. moral rights retained by the original author(s) and/or performer(s);

  iii. publicity and privacy rights pertaining to a person's image or likeness
  depicted in a Work;

  iv. rights protecting against unfair competition in regards to a Work,
  subject to the limitations in paragraph 4(a), below;

  v. rights protecting the extraction, dissemination, use and reuse of data in
  a Work;

  vi. database rights (such as those arising under Directive 96/9/EC of the
  European Parliament and of the Council of 11 March 1996 on the legal
  protection of databases, and under any national implementation thereof,
  including any amended or successor version of such directive); and

  vii. other similar, equivalent or corresponding rights throughout the world
  based on applicable law or treaty, and any national implementations thereof.

2. Waiver. To the greatest extent permitted by, but not in contravention of,
applicable law, Affirmer hereby overtly, fully, permanently, irrevocably and
unconditionally waives, abandons, and surrenders all of Affirmer's Copyright
and Related Rights and associated claims and causes of action, whether now
known or unknown (including existing as well as future claims and causes of
action), in the Work (i) in all territories worldwide, (ii) for the maximum
duration provided by applicable law or treaty (including future time
extensions), (iii) in any current or future medium and for any number of
copies, and (iv) for any purpose whatsoever, including without limitation
commercial, advertising or promotional purposes (the "Waiver"). Affirmer makes
the Waiver for the benefit of each member of the public at large and to the
detriment of Affirmer's heirs and successors, fully intending that such Waiver
shall not be subject to revocation, rescission, cancellation, termination, or
any other legal or equitable action to disrupt the quiet enjoyment of the Work
by the public as contemplated by Affirmer's express Statement of Purpose.

3. Public License Fallback. Should any part of the Waiver for any reason be
judged legally invalid or ineffective under applicable law, then the Waiver
shall be preserved to the maximum extent permitted taking into account
Affirmer's express Statement of Purpose. In addition, to the extent the Waiver
is so judged Affirmer hereby grants to each affected person a royalty-free,
non transferable, non sublicensable, non exclusive, irrevocable and
unconditional license to exercise Affirmer's Copyright and Related Rights in
the Work (i) in all territories worldwide, (ii) for the maximum duration
provided by applicable law or treaty (including future time extensions), (iii)
in any current or future medium and for any number of copies, and (iv) for any
purpose whatsoever, including without limitation commercial, advertising or
promotional purposes (the "License"). The License shall be deemed effective as
of the date CC0 was applied by Affirmer to the Work. Should any part of the
License for any reason be judged legally invalid or ineffective under
applicable law, such partial invalidity or ineffectiveness shall not
invalidate the remainder of the License, and in such case Affirmer hereby
affirms that he or she will not (i) exercise any of his or her remaining
Copyright and Related Rights in the Work or (ii) assert any associated claims
and causes of action with respect to the Work, in either case contrary to
Affirmer's express Statement of Purpose.

4. Limitations and Disclaimers.

  a. No trademark or patent rights held by Affirmer are waived, abandoned,
  surrendered, licensed or otherwise affected by this document.

  b. Affirmer offers the Work as-is and makes no representations or warranties
  of any kind concerning the Work, express, implied, statutory or otherwise,
  including without limitation warranties of title, merchantability, fitness
  for a particular purpose, non infringement, or the absence of latent or
  other defects, accuracy, or the present or absence of errors, whether or not
  discoverable, all to the greatest extent permissible under applicable law.

  c. Affirmer disclaims responsibility for clearing rights of other persons
  that may apply to the Work or any use thereof, including without limitation
  any person's Copyright and Related Rights in the Work. Further, Affirmer
  disclaims responsibility for obtaining any necessary consents, permissions
  or other rights required for any use of the Work.

  d. Affirmer understands and acknowledges that Creative Commons is not a
  party to this document and has no duty or obligation with respect to this
  CC0 or use of the Work.

For more information, please see
<http://creativecommons.org/publicdomain/zero/1.0/>
