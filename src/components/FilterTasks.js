import React from 'react';
export default class FilterTasks extends React.Component{
	constructor(props){
		super(props);
		this.state={
			currentFilter:{'todo':true, 'doing':true, 'done':true}
		}
	}
	
	resetTaskFilter=()=>{
		this.props.resetFilter();
	}
	
	addFilter(event){
		let tmpFilter=this.state.currentFilter;
		tmpFilter[event.target.value]=event.target.checked;
		this.setState({currentFilter:tmpFilter});
	}
	
	render(){
		const {filterTaskList,resetFilter}=this.props;
	return (
		<div>
		<label>
		 	<input type="checkBox" checked={this.state.currentFilter.todo} onChange={this.addFilter.bind(this)} value='todo' />Выполнить
		</label>
		 <label>
		 	<input type="checkBox" checked={this.state.currentFilter.doing} onChange={this.addFilter.bind(this)} value='doing' />Выполняется
		</label>
		<label>
		 	<input type="checkBox" checked={this.state.currentFilter.done} onChange={this.addFilter.bind(this)} value='done' />Выполнено
		</label>
			<button onClick={()=>this.props.filterTaskList(this.state.currentFilter)}>Применить фильтр</button>	
		</div>
	);
	}
}