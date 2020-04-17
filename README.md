# react-hn [![Build Status](https://travis-ci.org/oyeharry/react-hn.svg?branch=master)](https://travis-ci.org/oyeharry/react-hn)

## Getting Started

To start working with react-hn app you need to:

1. Get a copy of the code.
2. Install the dependencies if you don't already have them.

### Install dependencies

#### Quickly Start(experienced users)

With Node.js and Yarn installed, run the following from the root of your this react-hn download:

```sh
yarn install
```

#### Prerequisites

This App requires the following major dependencies.

- [Node.js](https://nodejs.org/), used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- yarn, a Node.js-based super fast package manager used to install npm packages (like React and its components).

**Install dependencies:**

1.  Check your Node.js version.

```sh
node --version
```

The version should be at or above 10.x.x.

2.  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and download and install latest LTS version.

3.  Install Yarn. If you don't have Yarn package manager installed, go to [yarnpkg.com](https://yarnpkg.com/) and download and install latest version.

This lets you run `yarn` from the command line.

4.  Install react-hn App local `yarn` dependencies.

```sh
cd react-hn && yarn install
```

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── .editorconfig # Editor configuration file to maintain consistent coding style.
├── .eslintignore # ESLint ignore file and directory configuration.
├── .eslintrc # ESLint configuration for maintain coding style
├── .gitignore # GIT configuration to ignore files and folder from GIT
├── .prettierrc # Prettier configuration to auto format and fix coding style.
├── .travis.yml # Travis CI configuration
├── README.md
├── babel.config.js # Configuration file for Babel transpiler
├── build # Webpack development and production goes here.
│   ├── client.js
│   ├── server.js
│   ├── service-worker.js
│   ├── service-worker.js.map
│   ├── workbox-c39032a0.js
│   ├── workbox-c39032a0.js.map
│   └── workbox-ec4d79a7.js
├── package.json
├── src
│   ├── client # Client side initialization.
│   │   ├── index.js
│   │   └── serviceWorker.js # Service worker registration for caching and offline.
│   ├── components # All the reusable component lives here.
│   │   ├── Anchor
│   │   ├── Box
│   │   ├── Button
│   │   ├── Header
│   │   ├── Image
│   │   ├── NewsFeed
│   │   ├── NewsFeedService
│   │   ├── Text
│   │   └── UserService
│   ├── config # Server and environment configurations.
│   │   ├── environment
│   │   └── express.js
│   ├── pages # App pages lives here.
│   │   ├── 404.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js
│   │   ├── news.js
│   │   └── routes.js
│   ├── server # Server initialization.
│   │   └── index.js
│   ├── static # All the static assets lives here. For instance images, svg, fonts etc
│   │   ├── assets
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── styles # Style configuration
│       └── theme.js
├── webpack.config.js # Webpack server and client configuration.
├── yarn-error.log
└── yarn.lock
```

### Learn More

TODO

### Development workflow

#### Start development server

```sh
yarn dev
```

This start express server using nodemon module and outputs an IP address with port number which you can use to test app locally and can used on devices connected to your network.

#### Run tests

```sh
yarn test
```

This runs unit tests defined in src directory.

#### Build

This create bundles for production deployment

```sh
yarn build
```
