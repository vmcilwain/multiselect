import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';
import MultiSelect from './components/MultiSelect';

class App extends Component {

 constructor(props) {
    super(props)

    this.state = {
      data: [],
      selected: []
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(array) {
    this.setState({selected: _.uniq(array)})
  }

  componentDidMount() {
	  const newData = [
      {name: 'object-1', id: 1},
      {name: 'object-2', id: 2},
      {name: 'object-3', id: 3},
      {name: 'object-4', id: 4},
      {name: 'object-5', id: 5},
      {name: 'object-6', id: 6},
      {name: 'object-7', id: 7},
      {name: 'object-8', id: 8},
      {name: 'object-9', id: 9},
      {name: 'object-10', id: 10}
    ];
    
    this.setState({
      data: newData,
      selected: []
    })
  }

  render() {
    return (
      <MultiSelect
      	idKey="id"
      	displayKey="name"
        objects={this.state.data}
        selected={this.state.selected}
        onClickHandler={this.onSelect}
      />
    );
  }
}

export default App;
