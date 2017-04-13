import React from 'react'
import _ from 'lodash'

export default class TSMultiSelect extends React.Component {

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

  render() {
    return (
      <div className='ts-multi-select select-border'>
        <input type="hidden" name="objectIDs" id="objectIDs" value=""/>
        <h3>{this.props.title}</h3>
        <ul className='ts-multi-select object-list'>
          {this.props.objects.map((object, index) => {
            return (
                    <li
                      key={index}
                      onClick={this.props.onClickHandler}
                      data-objectID={object.id}
                      className={`ts-multi-select object-item ${this.isSelected(object.id)}`}>
                      {`${object.name}`}
                    </li>
                  )
          })}
        </ul>
      </div>
    )
  }
}
