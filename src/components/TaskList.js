import React from 'react';
import TaskItem from './TaskItem';
import FilterTasks from './FilterTasks';
import Additive from './Additive';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFavoriteAction, recoverTaskAction, deleteTaskAction, addTaskAction, changeTaskStatusAction, editTaskAction, sortTasksByNameAction, sortTasksByDateAction, filterTasksAction} from '../actions';



class TaskList extends React.Component{
	
		constructor({match}){	
		super(...match);
		this.state={showDeleted:false};
	}
	showBin=()=>{
		this.setState(prevState=>({showDeleted:!prevState.showDeleted}));

	}
	render(){
		const tmpTasks=this.props.list.filter(task=>{return this.state.showDeleted?task.isDeleted:!task.isDeleted});
		const {match}=this.props;
		return (
			<div>

			<div className='TaskList'>
				<h2>
				<span onClick={()=>this.showBin()} className={!this.state.showDeleted?"":"Unactivated"}>Список задач</span> 
				/ 
				<span onClick={()=>this.showBin()} className={this.state.showDeleted?"":"Unactivated"}>Корзина</span></h2>
			<div className="sortButtons">
				<div>
					<span style={{cursor:'pointer'}} onClick={()=>this.props.sortByName(1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.props.sortByName(-1)}>&#9660;</span>
				</div>
				<div>
					<span style={{cursor:'pointer'}} onClick={()=>this.props.sortByDate(1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.props.sortByDate(-1)}>&#9660;</span>
				</div>

			</div>
			<div className='clear'/>
					{tmpTasks.map(task=>(<TaskItem key ={task.id} id={this.props.list.indexOf(task)} TaskProps={task} changeStatus={this.props.changeStatus} match={match} replaceFunction={!this.state.showDeleted?(this.props.deleteTask):(this.props.recoverTask)} replaceIcon={!this.state.showDeleted?('x'):('v')} setFavorite={this.props.setFavorite}/>))}
			<Link to={`${match.path}/task/add`}>Новая задача</Link>				

		</div>

		<FilterTasks filterTaskList={this.props.filterTasks}/>
		</div>	)
	}
};

function mapStateToProps(state){
	return {list:state.tasks};
	}
function mapDispatchToProps(dispatch){
	return{
		deleteTask:id=>{dispatch(deleteTaskAction(id))},
		recoverTask:id=>{dispatch(recoverTaskAction(id))},
		changeStatus:id=>{dispatch(changeTaskStatusAction(id))},
		sortByName:direction=>{dispatch(sortTasksByNameAction(direction))},
		sortByDate:direction=>{dispatch(sortTasksByDateAction(direction))},
		filterTasks:groups=>{dispatch(filterTasksAction(groups))},
		setFavorite:id=>{dispatch(setFavoriteAction(id))}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList)