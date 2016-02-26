import React from 'react';
import { Navigation } from 'react-router';
import h from '../helpers';

/* StorePicker
*/

var StorePicker = React.createClass({
  mixins: [Navigation],

  goToStore : function(e) {
    e.preventDefault();

    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  },

  render : function() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type='text' ref='storeId' required defaultValue={h.getFunName()} />
        <input type='Submit' />
      </form>
    );
  }
});

export default StorePicker;
