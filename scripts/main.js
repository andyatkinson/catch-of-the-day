var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/*
* App
*/

var App = React.createClass({
  // part of the react lifecycle
  getInitialState : function() {
    return {
      fishes: {},
      order: {}
    };
  },
  addFish: function(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state, this.state is entire state, but we should pass just the changes
    this.setState({ fishes: this.state.fishes });
  },
  loadSamples: function() {
    this.setState({ fishes: require('./sample-fishes.js') });
  },
  renderFish: function(key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} />;
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
        <Order/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
});

/*
* Fish
* <Fish />
*/
var Fish = React.createClass({
  render : function() {
    var details = this.props.details;
    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className='price'>{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    );
  }
});

/*
* AddFishForm
* <AddFishForm/>
*/

var AddFishForm = React.createClass({
  createFish : function(e) {
    e.preventDefault();
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    };

    // add the fish to the app state
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },

  render : function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish.bind(this)}>
        <input type='text' ref='name' placeholder="Fish name"/>
        <input type='text' ref='price' placeholder="Fish price"/>
        <select ref='status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold out!</option>
        </select>
        <textarea type='text' ref='desc' placeholder='Desc'></textarea>
        <input type='text' ref='image' placeholder="URL to Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
});

/*
* Header
*/

var Header = React.createClass({
  render : function() {
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
    );
  }
});

/*
* Order
*/

var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    );
  }
});

/*
* Inventory
*/

var Inventory = React.createClass({
  render : function() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    );
  }
});

/* StorePicker
*/

var StorePicker = React.createClass({
  mixins: [History],

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

/*
* Not Found
*/
var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>;
  }
});

/*
* Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);


ReactDOM.render(routes, document.querySelector('#main'));
