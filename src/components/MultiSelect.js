import React from 'react'
import _ from 'lodash';

export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null
    }

    this.selectItem = this.selectItem.bind(this)
    this.selectAllObjects = this.selectAllObjects.bind(this)
    this.deselectAllObjects = this.deselectAllObjects.bind(this)
    this.buildCheckBoxNode = this.buildCheckBoxNode.bind(this)
    this.selectOption = this.selectOption.bind(this)
    this.toggleState = this.toggleState.bind(this)
  }

  static propTypes = {
    objects: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array.isRequired,
    onClickHandler: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.string,
  }

  static defaultProps = {
    title: 'Select 1 or more records',
    titleStyle: 'multiselect title-bar title'
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

    if (selectedOption === 'selectAll') {
      if (this.state.selectedOption === 'All') {
        this.deselectAllObjects()
        this.toggleState('None')
        return
      }
      this.selectAllObjects()
      this.refs.deselectAll.checked=false
      this.toggleState('All')
    } else {
      this.deselectAllObjects()
      this.refs.selectAll.checked=false
      this.toggleState('None')
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

  buildCheckBoxNode(value, label){
    return (
      <span>
        <input type='checkbox' name={value} ref={value} value={value} onChange={this.selectOption}/>
        {label}
      </span>

    )
  }

  toggleState(state) {
    this.setState({selectedOption: state})
  }

  render() {
    return (
      <div>
        <table className='multiselect table'>
          <tr>
            <td className={this.props.titleStyle}>{this.props.title}</td>
            <td>{this.buildCheckBoxNode('selectAll', 'Select All')}</td>
            <td>{this.buildCheckBoxNode('deselectAll', 'Deselect All')}</td>
          </tr>
        </table>

        <div className='multiselect border'>
          <ul className='multiselect objects-list'>
            {this.props.objects.map((object, index) => {
              return (
                <li
                  key={index}
                  onClick={this.selectItem}
                  data-objectID={object.id}
                  className={`multiselect object ${this.isSelected(object.id)}`}>
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
