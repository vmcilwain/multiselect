# TSMultiSelect

## Purpose

This is a react component that will be used to select a subset of objects passed to it in order to process them in some way.

## Use
```
<TSMultiSelect
  objects={this.state.data}
  selected={this.state.selected}
  onClickHandler={() => {}}
/>
```

* `data` is the list of objects to be used for selection
*  `selected` is the list of objects selected by the `onClickHandler`
* `onClickHandler` is the function passed in so component knows how to select the items

## Notes

Ideally, the onClickHandler that is already implemented in `App.js` moves in the component as the default allowing the user to override it.

## Running this project
* clone the repo
* cd into the folder
* run `npm install`
* run `bower install`
* run `npm start`
