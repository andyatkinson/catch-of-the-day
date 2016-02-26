/*
* AddFishForm
* <AddFishForm/>
*/

import React from 'react';

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

export default AddFishForm;
