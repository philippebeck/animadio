[![Animadio Logo](https://animadio.org/img/logo.png)](https://animadio.org)
# [Animadio CSS Framework](https://animadio.org)

-   Eight types of selectors working with hover, focus & **checked states**
-   **Flexbox & Grid** systems included with common options
-   Click anywhere on the page to **enable & disable any design effect** anywhere else
-   Management of **keyframes animations** & their options
-   Complete & simple customization with directly modifiable **CSS variables**
-   More than 99% of **pure CSS** : so all of that without JavaScript...

[![GitHub Version](https://img.shields.io/github/package-json/v/animadio/animadio.svg?label=Version)](https://github.com/animadio/animadio/blob/master/package.json)
[![Codacy Code Quality](https://api.codacy.com/project/badge/Grade/b996875347654cc69510b0b1a5616936)](https://www.codacy.com/app/Animadio/animadio?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=animadio/animadio&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad3b450099d132b4d98d/maintainability)](https://codeclimate.com/github/animadio/animadio/maintainability)
[![Dependabot](https://badgen.net/dependabot/dependabot/dependabot-core/?icon=dependabot)](https://github.com/animadio/animadio/graphs/contributors)
[![David Dev Dependencies](https://david-dm.org/animadio/animadio/dev-status.svg)](https://david-dm.org/animadio/animadio?type=dev)

## Summary

-   [Package Manager](#package-manager)  
-   [CDN](#cdn)  
-   [Download](#download)  
-   [Content](#content)  
-   [CSS Only](#css-only)  
-   [Support](#support)  
-   [Browsers](#browsers)  
-   [Open-Source](#open-source)  
-   [Community](#community)  
-   [Documentation](#documentation)  
-   [Issues](#issues)  
-   [Pull Requests](#pull-requests)  
-   [Contributing](#contributing)  
-   [Versioning](#versioning)  
-   [Creator](#creator)  
-   [Copyright](#copyright)  

---

## Package Manager

[![NPM Version](https://img.shields.io/npm/v/animadio.svg?label=NPM)](https://www.npmjs.com/package/animadio)
[![NPM Montly Downloads](https://img.shields.io/npm/dm/animadio.svg?label=Montly+Downloads)](https://www.npmjs.com/package/animadio)
[![NPM Yearly Downloads](https://img.shields.io/npm/dy/animadio.svg?label=Yearly+Downloads)](https://www.npmjs.com/package/animadio)

NPM : `npm i animadio`  
Yarn : `yarn add animadio`  

---

## CDN 

[![jsDelivr Montly Downloads](https://img.shields.io/jsdelivr/npm/hm/animadio.svg?label=jsDelivr+Montly+Downloads)](https://www.jsdelivr.com/package/npm/animadio)
[![jsDelivr Yearly Downloads](https://img.shields.io/jsdelivr/npm/hy/animadio.svg?label=jsDelivr+Yearly+Downloads)](https://www.jsdelivr.com/package/npm/animadio)

> **Full Version**

-   Development : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio.css)  
-   Production : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio.min.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio.min.css)  

> **Grid Version**

-   Development : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-grid.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-grid.css)  
-   Production : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-grid.min.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-grid.min.css)  

> **Elements Version**

-   Development : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-elements.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-elements.css)  
-   Production : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-elements.min.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-elements.min.css)  

> **States Version**

-   Development : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-states.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/animadio-states.css)  
-   Production : [https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-states.min.css](https://cdn.jsdelivr.net/npm/animadio@1.0.0/dist/min/animadio-states.min.css)  

---

## Download

[Latest Release](https://github.com/animadio/animadio/releases)  

`git clone https://github.com/animadio/animadio.git`  
  
[![Repo Size](https://img.shields.io/github/repo-size/animadio/animadio.svg?label=Repo+Size)](https://github.com/animadio/animadio/tree/master)

---

## Content

The main library distribution is :  
-   For development : `dist/animadio.css`  
-   For production : `dist/min/animadio.min.css`  

[![CSS Code Size](https://img.shields.io/github/languages/code-size/animadio/animadio.svg?label=animadio.css)](https://github.com/animadio/animadio/tree/master/dist/animadio.css)
[![CSS Minified Size](https://img.shields.io/bundlephobia/min/animadio.svg?label=animadio.min.css)](https://github.com/animadio/animadio/tree/master/dist/min/animadio.min.css)

But if you only need a part of Animadio, you can use one of those dist files :
-   To get Global + Grid : `dist/animadio-grid.css` for dev or `dist/min/animadio-grid.min.css` for prod  
-   To get Global + Elements : `dist/animadio-elements.css` for dev or `dist/min/animadio-elements.min.css` for prod  
-   To get Global + States : `dist/animadio-states.css` for dev or `dist/min/animadio-states.min.css` for prod  

---

## CSS Only

Animadio is a CSS framework whose library is composed only of CSS source code: jQuery, or even Javascript, are not included or needed in production...

Grunt is the only JavaScript app used in the framework developement side for recursive tasks (concat, source map, webkit & min) to build the library file (but it can be used to concat CSS elements of your choice)

You can simply use the library & if you want or if you need : you can overload the CSS variables.

[![GitHub Top Language](https://img.shields.io/github/languages/top/animadio/animadio.svg?label=CSS)](https://github.com/animadio/animadio)

---

## Support

Animadio has continuous support **until the 31st of December 2021** & community networks will give all news !

[![Project Maintained](https://img.shields.io/maintenance/yes/2019.svg?label=Maintained)](https://github.com/animadio/animadio)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/animadio/animadio.svg?label=Last+Commit)](https://github.com/animadio/animadio/commits/master)

---

## Browsers

Animadio uses PostCSS with autoprefixer to provide a maximum of compatibility for all main browsers, including mainly Firefox, Chrome & Opera, secondarily Edge, Safari & Explorer (for some effects, especially all Skew animations)

---

## Open-Source

CodePen : [@animadio](https://codepen.io/animadio)

[![GitHub Stars](https://img.shields.io/github/stars/animadio/animadio.svg?label=GitHub+:+animadio+|+Stars)](https://github.com/animadio/animadio)

---

## Community

Slack : [animadio.slack.com](https://join.slack.com/t/animadio/shared_invite/enQtNjAxMjg0OTUyODM5LWE5ZjNhNWYxMzVjZTdlMjhkNDhiNDVlYmQ1NjY3NTVhZGFmNDg2ODVhMmYyYmQwMDBkYmYyY2Q0NGQ5OGY3NWY)

[![Twitter Follow](https://badgen.net/twitter/follow/animadio)](https://twitter.com/animadio)

---

## Documentation

Animadio Documentation is available !

[![WebSite Status](https://img.shields.io/website-up-down-green-red/https/doc.animadio.org.svg?label=https://doc.animadio.org)](https://doc.animadio.org)

---

## Issues

Issues can be created here

[![GitHub Open Issues](https://img.shields.io/github/issues/animadio/animadio.svg?label=Issues)](https://github.com/animadio/animadio/issues)

But for Parse Error issues, from a CSS linter or a W3C validator :
-   check the user agent from the browsers  
-   look here before doing anything :  

> For the W3C CSS Validator : [https://github.com/w3c/css-validator/issues/225](https://github.com/w3c/css-validator/issues/225)
>
> For the W3C Nu HTML Validator : [https://github.com/validator/validator/issues/644](https://github.com/validator/validator/issues/644)
>
> For CSS Lint : [https://github.com/CSSLint/csslint/issues/720](https://github.com/CSSLint/csslint/issues/720)

---

## Pull Requests

And Pull Requests can be created there

[![GitHub Open Pull Requests](https://img.shields.io/github/issues-pr/animadio/animadio.svg?label=Pull+Requests)](https://github.com/animadio/animadio/pulls)

---

## Contributing

Animadio needs you if you like it : sends pull requests on GitHub to improve it !!

[![GitHub Contributors](https://img.shields.io/github/contributors/animadio/animadio.svg?label=Contributors)](https://github.com/animadio/animadio/graphs/contributors)

---

## Versioning

Animadio is maintained under the [Semantic Versioning 2.0.0](https://semver.org)

[![GitHub Version](https://img.shields.io/github/package-json/v/animadio/animadio.svg?label=Version)](https://github.com/animadio/animadio/blob/master/package.json)

---

## Creator

Philippe Beck

[![WebSite Status](https://img.shields.io/website-up-down-green-red/https/philippebeck.net.svg?label=https://philippebeck.net)](https://philippebeck.net)
[![GitHub Followers](https://img.shields.io/github/followers/philippebeck.svg?label=GitHub+:+philippebeck+|+Followers)](https://github.com/philippebeck)
[![Twitter Follow](https://badgen.net/twitter/follow/philippepjbeck)](https://twitter.com/philippepjbeck)

---

## Contributors

Lisa Lecieux

[![WebSite Status](https://img.shields.io/website-up-down-green-red/https/philippebeck.net.svg?label=https://sangodraws.com)](https://sangodraws.com)
[![GitHub Followers](https://img.shields.io/github/followers/sangodraws.svg?label=GitHub+:+sangodraws+|+Followers)](https://github.com/sangodraws)
[![Twitter Follow](https://badgen.net/twitter/follow/sangodraws)](https://twitter.com/sangodraws)

Valentin Antoin

[![WebSite Status](https://img.shields.io/website-up-down-green-red/https/valentin-antoin.fr.svg?label=https://valentin-antoin.fr)](https://valentin-antoin.fr)
[![GitHub Followers](https://img.shields.io/github/followers/valentinantoin.svg?label=GitHub+:+valentinantoin+|+Followers)](https://github.com/sangodraws)
[![Twitter Follow](https://badgen.net/twitter/follow/Valentin_Antoin)](https://twitter.com/Valentin_Antoin)

---

## Copyright

Code released under the MIT License

[![GitHub License](https://img.shields.io/npm/l/animadio.svg?label=License)](https://github.com/animadio/animadio/blob/master/LICENSE)

---

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/animadio/animadio/badge.svg?style=beer-square)](https://beerpay.io/animadio/animadio)  [![Beerpay](https://beerpay.io/animadio/animadio/make-wish.svg?style=flat-square)](https://beerpay.io/animadio/animadio?focus=wish)
