/* StorePicker
*/

import React from 'react';
import { Navigation } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {

  goToStore(e) {
    e.preventDefault();

    var storeId = this.refs.storeId.value;
    this.props.history.pushState(null, '/store/' + storeId);
  }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type='text' ref='storeId' required defaultValue={h.getFunName()} />
        <input type='Submit' />
      </form>
    )
  }
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;
