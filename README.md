# TSMultiSelect

## Purpose

This is a react component that will be used to select a subset of objects passed to it in order to process them in some way.

## PreRequisits
* Font Awesome
* lodash

## Use
```
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
```

* `data` is the list of objects to be used for selection
*  `selected` is the list of objects selected by the `onClickHandler`
* `onClickHandler` is the function passed to the component for processing

Optional

* `titleStyle` is for customizing the css of the title of the multi select component
* `title`  is for customizing the title text of the multi select component

## Notes

Ideally, the onClickHandler that is already implemented in `App.js` moves in the component as the default allowing the user to override it.

## Running this project
* clone the repo
* cd into the folder
* run `npm install`
* run `bower install`
* run `npm start`
