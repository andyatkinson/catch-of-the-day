React example application from "React for Beginners" series

## Tips

 * Check react dev tool for variables like `$r` to be able to log out a component. Can inspect the component properties.


## React-Router

## History

`npm install history` (uses pushState)

## Helpers

`helpers.js` helper functions

`require('./helpers')` requiring a local relative (sibling) file

`refs`

`getInitialState` part of the react lifecycle

"Spread" = `{...this.props}` passes the props through, alternative to passing functions from parent component to child component one by one.

In Chrome React dev tools, can search for components on bottom.

React component lifecyle - hooks to get in to the component at different points in time

e.g. render(), getInitialState() (right before component is mounted)

Syncing state

`componentDidMount()` invoked once on the client, after rendering occurs (in this example, we fetch the data from firebase)

Would put the ajax request in there too.

`componentWillUpdate` lifecycle event, props changes, state changes, this runs, passes new props and new state

`shouldComponentUpdate`

Bi-directional data flow - ReactLink (link state)

React Catalyst - mixin - deep nest listeners

Prop validation
Component validation - required props, type checking on props, `React.PropTypes.*`
