import React, { Component } from 'react';
import _ from 'lodash'
import logo from './logo.svg';
import './App.css';
import TSMultiSelect from './components/TSMultiSelect';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selected: []
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(event) {
    event.preventDefault()
    let objectID = event.target.attributes.getNamedItem("data-objectid").value
    let localSelected = _.clone(this.state.selected)
    let index = _.indexOf(localSelected, objectID)

    if (index === -1) {
      localSelected.push(objectID)
    } else {
      _.remove(localSelected, (n) => {
        return n === objectID
      })
    }
    this.setState({selected: _.uniq(localSelected)})
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
    console.log(this.state.selected)

    return (
      <TSMultiSelect
        objects={this.state.data}
        selected={this.state.selected}
        onClickHandler={this.onSelect}
      />
    );
  }
}

export default App;
