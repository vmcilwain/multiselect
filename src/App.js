import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TSMultiSelect from './components/TSMultiSelect';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.setState({
      data: [
        {name: 'child-0', id: '0'},
        {name: 'child-1', id: '1'},
        {name: 'child-2', id: '2'},
        {name: 'child-3', id: '3'},
        {name: 'child-4', id: '4'},
        {name: 'child-5', id: '5'},
        {name: 'child-6', id: '6'},
        {name: 'child-7', id: '7'},
        {name: 'child-8', id: '8'},
        {name: 'child-9', id: '9'}
      ]
    })
  }
  render() {
    return (
      <TSMultiSelect objects={this.state.data} />
    );
  }
}

export default App;
