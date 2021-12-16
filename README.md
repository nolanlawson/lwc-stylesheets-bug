# lwc-stylesheets-bug

Bug reproduction repo created with create-lwc-app.

## What goes wrong (and how do I see it)?

1. Start the application as described in "How to start the app?"
2. Direct your browser to http://localhost:3001 to open the app.
3. Observe that nothing renders.
4. Open the browser's developer tools and observe the following error:

```
Uncaught DOMException: Failed to set the 'adoptedStyleSheets' property on 'ShadowRoot': Sharing constructed stylesheets in multiple documents is not allowed
```

The error is thrown from within `insertConstructableStyleSheet`, at the moment that the
`adoptedStylesheets` property of the `target` is assigned.

5. Also worth noting: if you change the constructor of `app.js` to look like this:

```javascript
    constructor() {
        super();
        this.isDynamic = false; // `false` instead of `true`
    }
```

The app renders, but (of course) without dynamic content.

**NOTE: This failure was introduced with lwc@2.3.7. Using an earlier version works.**

## What is the expected behavior?

The app should render the dynamic content without issue. It does in fact do this if you
downgrade the `lwc` package to version `2.3.4`.

## How to start the app?

Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
