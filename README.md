# TSMultiSelect

## Purpose

This is a react component that will be used to select a subset of objects passed to it in order to process them in some way.

## Use
```

constructor(props) {
  super(props)

  this.state = {
    data: [],
    selected: [] // Should be named in the context of the data (Children, Documents, etc.)
  }

  this.onSelect = this.onSelect.bind(this)
}

// Process the selected items
onSelect(array) {
  this.setState({selected: _.uniq(array)})
}

// Set the state of the data
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

<TSMultiSelect
  objects={this.state.data}
  selected={this.state.selected}
  onClickHandler={this.onSelect}
/>
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
