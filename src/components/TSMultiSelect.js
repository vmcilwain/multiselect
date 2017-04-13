import React from 'react'

export default class TSMultiSelect extends React.Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    objects: React.PropTypes.array.isRequired,
    select_title: React.PropTypes.string
  }

  static defaultProps = {
    select_title: 'Select 1 or more records'
  }
}
