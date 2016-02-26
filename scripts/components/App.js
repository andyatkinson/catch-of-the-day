import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import StorePicker from './StorePicker';

//firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://boiling-torch-6140.firebaseio.com/');

import Catalyst from 'react-catalyst';


/*
* App
*/

var App = React.createClass({
  mixins : [Catalyst.LinkedStateMixin],

  // part of the react lifecycle
  getInitialState : function() {
    return {
      fishes: {},
      order: {}
    };
  },
  componentDidMount : function() {
    // load from firebase
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef) {
      this.setState({
        order : JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate : function(nextProps, nextState) {
    //save it to local storage, key/value pair, key is fish ID and value is the fish
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  },
  addToOrder : function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  },
  addFish: function(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state, this.state is entire state, but we should pass just the changes
    this.setState({ fishes: this.state.fishes });
  },
  removeFromOrder : function(key) {
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  },
  removeFish: function(key) {
    if(confirm('Are you sure you want to remove this fish?')) {
      this.state.fishes[key] = null; //deletes the item
      this.setState({fishes: this.state.fishes});
    }
  },
  loadSamples: function() {
    this.setState({ fishes: require('../sample-fishes.js') });
  },
  renderFish: function(key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />;
  },

  render : function() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagLine="fresh seafood market"/>
          <ul className='list-of-fishes'>
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          linkState={this.linkState}
          removeFish={this.removeFish}/>
      </div>
    );
  }
});

export default App;
