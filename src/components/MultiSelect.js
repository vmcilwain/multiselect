import React from 'react'
import _ from 'lodash';

export default class MultiSelect extends React.Component {

  constructor(props) {
    super(props)

		this.getObjectId = this.getObjectId.bind(this);
		this.getObjectDisplayName = this.getObjectDisplayName.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.selectOption = this.selectOption.bind(this);

    this.possibleSelections = {
      all: {label: 'Deselect All', klass: 'fa-check-square-o'},
      none: {label: 'Select All', klass: 'fa-square-o'},
      mixed: {label: 'Deselect All', klass: 'fa-minus-square-o'}
    }

    this.state = {
      current: this.getCurrentState(props)
    }
  }

  static propTypes = {
	  idKey: React.PropTypes.string.isRequired,
	  displayKey: React.PropTypes.string.isRequired,
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

  getCurrentState(props){
    return _.isEmpty(props.selected) ? 'none' : (props.objects.length !== props.selected.length ? 'mixed' : 'all')
  }

  getSelected(objectID) {
	  return _.find(this.props.selected, object => this.getObjectId(object) === objectID);
  }

  selectItem(event) {
    let objectID = event.target.attributes.getNamedItem("data-objectID").value
    let localSelected = _.clone(this.props.selected)
    const selectedObj = _.find(this.props.selected, object => `${this.getObjectId(object)}` === objectID);

    if (selectedObj) {
      _.pull(localSelected, selectedObj);
    } else {
	    localSelected.push(_.find(this.props.objects, object => `${this.getObjectId(object)}` === objectID));
    }

    this.props.onClickHandler(localSelected)
    this.setState({current: this.getCurrentState(this.props)})
  }

  selectOption(event) {
    switch(this.state.current){
      case 'none':
        this.selectAll();
        break;
      default:
        this.deselectAll()
    };
  }

  selectAll(event) {
	  this.props.onClickHandler(this.props.objects);
  }

  deselectAll(event) {
		this.props.onClickHandler([]);

  }
  getObjectId(obj) {
	  return _.get(obj, this.props.idKey);
  }

  getObjectDisplayName(obj) {
	  return _.get(obj, this.props.displayKey);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selected.length !== nextProps.selected.length) {
      this.setState({current: this.getCurrentState(nextProps)})
    }
  }

  render() {
    return (
      <div>
        <div>
          <span className={this.props.titleStyle}>{this.props.title}</span>
          <i className={`fa ${this.possibleSelections[this.state.current].klass} fa-2x`} aria-hidden="true" onClick={this.selectOption}></i>
          <label>{this.possibleSelections[this.state.current].label}</label>
        </div>     

        <div className='multiselect border'>
          <ul className='multiselect objects-list'>
            {this.props.objects.map((object, index) => {
              return (
                <li
                  key={index}
                  onClick={this.selectItem}
                  data-objectID={this.getObjectId(object)}
                  className={`multiselect object ${!!this.getSelected(this.getObjectId(object)) ? 'multi-select selected' : ''}`}>
                  {this.getObjectDisplayName(object)}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}