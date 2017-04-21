import React from 'react';
import _ from 'lodash';

export default class MultiSelect extends React.Component {

	static propTypes = {
		idKey: React.PropTypes.string.isRequired,
		displayKey: React.PropTypes.string.isRequired,
		objects: React.PropTypes.array.isRequired,
		selected: React.PropTypes.array.isRequired,
		onClickHandler: React.PropTypes.func.isRequired,
		title: React.PropTypes.string,
		titleClassName: React.PropTypes.string
	};

	static defaultProps = {
		title: 'Select 1 or more records',
		titleClassName: ''
	};


	constructor(props) {
		super(props);

		this.possibleSelectionStates = {
			all: {label: 'Deselect All', className: 'fa-check-square-o'},
			none: {label: 'Select All', className: 'fa-square-o'},
			mixed: {label: 'Deselect All', className: 'fa-minus-square-o'}
		};

		this.getCurrentSelectionState = this.getCurrentSelectionState.bind(this);
		this.getObjectId = this.getObjectId.bind(this);
		this.getObjectDisplayName = this.getObjectDisplayName.bind(this);
		this.findInStoreByObjectId = this.findInStoreByObjectId.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.selectOption = this.selectOption.bind(this);
		this.selectItem = this.selectItem.bind(this);

		this.state = {
			selected: props.selected
		};
	}


	getCurrentSelectionState() {
		return _.isEmpty(this.state.selected) ? 'none' : (this.state.selected.length !== this.props.objects.length ? 'mixed' : 'all');
	}


	findInStoreByObjectId(store, objectId) {
		return _.find(store, object => this.getObjectId(object).toString() === objectId.toString());
	}


	selectItem(event) {
		let currentSelected = _.clone(this.state.selected);
		const objectId = event.target.attributes.getNamedItem("data-objectID").value;
		const selectedObj = this.findInStoreByObjectId(currentSelected, objectId);
		if( selectedObj ) {
			_.pull(currentSelected, selectedObj);
		} else {
			currentSelected.push(this.findInStoreByObjectId(this.props.objects, objectId));
		}
		this.setState({selected: currentSelected});
		this.props.onClickHandler(currentSelected);
	}


	selectOption(event) {
		this.getCurrentSelectionState() === 'none' ? this.selectAll() : this.deselectAll();
	}


	selectAll(event) {
		this.setState({selected: this.props.objects});
		this.props.onClickHandler(this.props.objects);
	}


	deselectAll(event) {
		this.setState({selected: []});
		this.props.onClickHandler([]);
	}


	getObjectId(obj) {
		return _.get(obj, this.props.idKey);
	}


	getObjectDisplayName(obj) {
		return _.get(obj, this.props.displayKey);
	}


	componentWillReceiveProps(nextProps) {
		if(this.state.selected.length !== nextProps.selected.length) {
			this.setState({selected: nextProps.selected});
		}
	}


	render() {
		const currentSelectionState = this.getCurrentSelectionState();
		return (
			<div className='multiselect'>
				<div className='multiselect-title-bar'>
					<div className={`title ${this.props.titleClassName}`}>{this.props.title}</div>
					<div className='multiselect-selectoption'>
						<span className={`fa ${this.possibleSelectionStates[currentSelectionState].className}`} onClick={this.selectOption} />
						<span>{this.possibleSelectionStates[currentSelectionState].label}</span>
					</div>
				</div>
				<div className='multiselect-objects'>
					<ul className='multiselect-objects-list no-style'>
						{
							this.props.objects.map( object => {
								const objectId = this.getObjectId(object);
								const isObjectSelected = !!this.findInStoreByObjectId(this.state.selected, objectId);
								return (
									<li
										key={objectId}
										onClick={this.selectItem}
										data-objectID={this.getObjectId(object)}
										className={`object ${isObjectSelected ? 'selected' : ''}`}
									>
										{this.getObjectDisplayName(object)}
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
