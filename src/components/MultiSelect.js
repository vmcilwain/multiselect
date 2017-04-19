import React from 'react'
import _ from 'lodash';

export default class MultiSelect extends React.Component {

  constructor(props) {
    super(props)

		this.getObjectId = this.getObjectId.bind(this);
		this.getObjectDisplayName = this.getObjectDisplayName.bind(this);
    this.selectItem = this.selectItem.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.deselectAll = this.deselectAll.bind(this)
    this.selectOption = this.selectOption.bind(this)
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
  }

  selectOption(event) {
	  debugger
	  const selectedOption = event.target.name;
	  if (selectedOption === 'selectAll') {
		  event.target.checked ? this.deselectAllObjects() : this.selectAllObjects();
		  return
		}
		this.deselectAllObjects();
/*
	  debugger
		event.target.name === 'selectAll' ? this.selectAllObjects() : this.deselectAllObjects();
*/
/*
    const selectedOption = event.target.value
			return


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
*/
  }

/*
  selectAllObjects() {
	  this.props.onClickHandler(this.props.objects);
	  this.setState({
		  selectAll: true,
		  deselectAll: false
	  });
*/

/*
    let localSelected = _.clone(this.props.selected)

    _.forEach(this.props.objects, (object) => {
      localSelected.push(`${object.id}`)
    })

    this.props.onClickHandler(localSelected)
*/
//   }

/*
  deselectAllObjects() {
		this.props.onClickHandler([])
	  this.setState({
		  deselectAll: true
	  });
  }
*/


  selectAll(event) {
	  console.log(event.target.checked, event.target.value)
	  this.props.onClickHandler(this.props.objects);
/*
	  this.setState({
		  deselectAll: false
	  });
*/
  }

  deselectAll(event) {
	  console.log(event.target.checked, event.target.value)
		this.props.onClickHandler([]);
/*
		this.setState({
		  deselectAll: event.target.checked
	  });
*/
  }

/*
  buildCheckBoxNode(value, label){
    return (
      <span>
        <input type='checkbox' name={value} checked={this.state[value]} onChange={this.selectOption}/>
        {label}
      </span>

    )
  }
*/

/*
  toggleState(state) {
    this.setState({selectedOption: state})
  }
*/

  getObjectId(obj) {
	  return _.get(obj, this.props.idKey);
  }

  getObjectDisplayName(obj) {
	  return _.get(obj, this.props.displayKey);
  }

  render() {
    return (
      <div>
        <table className='multiselect table'>
          <tr>
            <td className={this.props.titleStyle}>{this.props.title}</td>
            <td>
       	      <span>
			 					<input type='checkbox' name="selectAll" checked={_.isEqual(this.props.objects, this.props.selected)} onChange={this.selectAll}/>
			 					<label>Select All</label>
			 				</span>
			 			</td>
			 			<td>
			 			  <span>
			 					<input type='checkbox' name="deselectAll" checked={false} onChange={this.deselectAll}/>
			 					<label>Deselect All</label>
			 				</span>
			 			</td>
          </tr>
        </table>

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
