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
    // this.isChecked = this.isChecked.bind(this)
  }

  static propTypes = {
    objects: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array.isRequired,
    onClickHandler: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.string,
    onSubmitHandler: React.PropTypes.func
  }

  static defaultProps = {
    title: 'Select 1 or more records',
    titleStyle: 'muti-select title'
  }

  isSelected(objectID) {
    return _.includes(this.props.selected, `${objectID}`) ? 'multi-select selected' : ''
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

  selectOption(event) {
    let selectedOption = event.target.value

    if (selectedOption === 'All') {
      this.selectAllObjects()
      this.setState({selectedOption: 'All'})
    } else {
      this.deselectAllObjects()
      this.setState({selectedOption: 'None'})
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
        <input type='radio' name='selectOptions' onClick={this.selectOption} value={value}/>
        <label>{title}</label>
      </span>
    )
  }

  render() {
    return (
      <div>
        <span className={this.props.titleStyle}>{this.props.title}</span>

        {this.buildRadioButtonNode('All', 'Select All')}
        {this.buildRadioButtonNode('None', 'Deselect All')}

        <div className='multi-select border'>
          <ul className='multi-select objects-list'>
            {this.props.objects.map((object, index) => {
              return (
                <li
                  key={index}
                  onClick={this.selectItem}
                  data-objectID={object.id}
                  className={`multi-select object ${this.isSelected(object.id)}`}>
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
