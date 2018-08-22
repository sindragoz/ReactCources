import React from 'react';
export default class FilterTasks extends React.Component{
	constructor(props){
		super(props);
		this.state={
			currentFilter:'Выполнить'
		}
	}
	
	resetTaskFilter=()=>{
		this.props.resetFilter();
	}
	
	selectFilter(event){
		this.setState({currentFilter:event.target.value});
	}
	
	render(){
		const {filterTaskList,resetFilter}=this.props;
	return (
		<div>
		<button onClick={()=>this.props.resetFilter()}>Очистить фильтр</button><br/>
		<select value={this.state.currentFilter} onChange={this.selectFilter.bind(this)}>
			<option>Выполнить</option>
			<option>Выполняется</option>
			<option>Выполнено</option>
		</select> <button onClick={()=>this.props.filterTaskList(this.state.currentFilter)}>Применить фильтр</button>	
		</div>
	);
	}
}