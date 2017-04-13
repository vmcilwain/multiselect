import React from 'react'

export default class TSMultiSelect extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  static propTypes = {
    objects: React.PropTypes.array.isRequired,
    title: React.PropTypes.string,
    onSubmit: React.PropTypes.func
  }

  static defaultProps = {
    title: 'Select 1 or more records'
  }

  onSelect(event) {
    event.preventDefault()
    let input = document.getElementById("objectIDs")
    let newObjectID = event.target.attributes.getNamedItem("data-objectID").value

    if (input.value === "") {
      input.value = newObjectID
    } else {
      input.value = input.value +","+ newObjectID
    }

    let arr = input.value.split(",")
    return console.log(arr)
  }

  render() {
    return (
      <div className='ts-multi-select select-border'>
        <input type="hidden" name="objectIDs" id="objectIDs" value=""/>
        <h3>{this.props.title}</h3>
        <ul className='ts-multi-select object-list'>
          {this.props.objects.map((object, index) => {
            return <li key={index} onClick={this.onSelect} data-objectID={object.id}>{`${object.name}`}</li>
          })}
        </ul>
      </div>
    )
  }
}
