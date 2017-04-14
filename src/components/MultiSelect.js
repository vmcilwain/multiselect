import React from 'react'
import _ from 'lodash'

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props)

    this.selectItem = this.selectItem.bind(this)
    this.selectAllObjects = this.selectAllObjects.bind(this)
    this.deselectAllObjects = this.deselectAllObjects.bind(this)
    this.buildRadioButtonNode = this.buildRadioButtonNode.bind(this)
    this.selectOption = this.selectOption.bind(this)
  }

  static propTypes = {
    objects: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array.isRequired,
    onClickHandler: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    onSubmitHandler: React.PropTypes.func
  }

  static defaultProps = {
    title: 'Select 1 or more records'
  }

  isSelected(objectID) {
    return _.includes(this.props.selected, `${objectID}`) ? 'selected' : ''
  }

  selectItem(event) {
    let objectID = event.target.attributes.getNamedItem("data-objectID").value
    let localSelected = _.clone(this.props.selected)
    let index = _.indexOf(localSelected, objectID)

    if (index === -1) {
      localSelected.push(objectID)
    } else {
      _.remove(localSelected, (n) => {
        return n === objectID
      })
    }
    this.props.onClickHandler(localSelected)
  }


  selectOption() {
    let selectedOption = document.querySelector('input[name="selectOption"]:checked').value
    if (selectedOption === 'All') {
      this.selectAllObjects()
    } else {
      this.deselectAllObjects()
    }
  }

  selectAllObjects() {
    let localSelected = _.clone(this.props.selected)
    _.forEach(this.props.objects, (object) => {
      localSelected.push(`${object.id}`)
    })

    this.props.onClickHandler(localSelected)

  }

  deselectAllObjects() {
    this.props.onClickHandler([])
  }

  buildRadioButtonNode(value, title) {
    return (
      <span>
        <input type='radio' name='selectOption' onClick={this.selectOption} value={value}/>
        <label htmlFor={name}>{title}</label>
      </span>
    )
  }


  render() {
    return (
      <div>
        <span>{this.props.title}</span>
        {this.buildRadioButtonNode('All', 'Select All')}
        {this.buildRadioButtonNode('None', 'Deselect All')}

        <div className='ts-multi-select select-border'>
          <ul className='ts-multi-select object-list'>
            {this.props.objects.map((object, index) => {
              return (
                <li
                  key={index}
                  onClick={this.selectItem}
                  data-objectID={object.id}
                  className={`ts-multi-select object-item ${this.isSelected(object.id)}`}>
                  {`${object.name}`}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
