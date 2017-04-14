import React, { Component } from 'react';
import _ from 'lodash'
import logo from './logo.svg';
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
    this.setState({
      data: [
        {name: 'child-1', id: 1},
        {name: 'child-2', id: 2},
        {name: 'child-3', id: 3},
        {name: 'child-4', id: 4},
        {name: 'child-5', id: 5},
        {name: 'child-6', id: 6},
        {name: 'child-7', id: 7},
        {name: 'child-8', id: 8},
        {name: 'child-9', id: 9},
        {name: 'child-10', id: 10}
      ]
    })
  }

  render() {
    return (
      <MultiSelect
        objects={this.state.data}
        selected={this.state.selected}
        onClickHandler={this.onSelect}
      />
    );
  }
}

export default App;
