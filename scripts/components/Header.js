/*
* Header
*/

import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline">{this.props.tagLine}</h3>
      </header>
    )
  }
}

Header.propTypes = {
  tagLine: React.PropTypes.string.isRequired
}

export default Header;
