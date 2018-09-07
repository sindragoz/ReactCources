import React from 'react';
import TaskItem from './TaskItem';
import FilterTasks from './FilterTasks';
import Additive from './Additive';
import Tasks from './Tasks';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class TaskList extends React.Component{
	
		constructor({match}){	
		let deletedTasks=[];
		super(...match);
		this.state={Tasks,deletedTasks,showDeleted:false};
	}
	
	filterTaskList=(groups)=>{
		let tmpTasklist=this.state.Tasks;
		tmpTasklist.map(task=>{
		if(task.group=='Выполнить')
			task.filterVisible=(groups['todo']);
		if(task.group=='Выполняется')
			task.filterVisible=(groups['doing']);
		if(task.group=='Выполнено')
			task.filterVisible=(groups['done']);
		});
		this.setState({Tasks:tmpTasklist});		
	}
	
	resetFilter=()=>{
		let tmpTasklist=this.state.Tasks;
		tmpTasklist.map(task=>{task.filterVisible=true});
		this.setState({Tasks:tmpTasklist});	
		
	}
	
	sortTasksByDate=(direction)=>{
		let sortedTasks=this.state.Tasks.slice();
		
		sortedTasks.sort(function(a,b){
			if(a.favorite&&!b.favorite)
				return 1*direction;
			if(!a.favorite&&b.favorite)
				return -1*direction;
			if(a.date<=b.date)
				return -1*direction;
			if(a.date>b.date)
				return 1*direction;
			if(typeof(a.date)!='object')
				return -1*direction;			
			if(typeof(b.date)!='object')
				return 1*direction;	
		});	
		
		this.setState({Tasks:sortedTasks});
	}
	sortTasksByName=(direction)=>{
		let sortedTasks=this.state.Tasks.slice();		
		sortedTasks.sort(function(a,b){
			if(a.name>=b.name)
				return 1*direction;
			if(a.name<b.name)
				return -1*direction;
		});	
		this.setState({Tasks:sortedTasks});
	}
	deleteTask=task=>{
		let tmpTaskList=this.state.Tasks.slice();
		let tmpDeletedTasks=this.state.deletedTasks.slice();
		tmpTaskList.splice(tmpTaskList.indexOf(task),1).map(task=>{tmpDeletedTasks.push(task)});
		this.setState({Tasks:tmpTaskList,deletedTasks:tmpDeletedTasks});

	}
	recoverTask=task=>{
		let tmpTaskList=this.state.Tasks.slice();
		let tmpDeletedTasks=this.state.deletedTasks.slice();
		tmpDeletedTasks.splice(tmpTaskList.indexOf(task),1).map(task=>{tmpTaskList.push(task)});
		this.setState({Tasks:tmpTaskList,deletedTasks:tmpDeletedTasks});
	}
	setFavorite=task=>{
		let tmpTaskList=this.state.Tasks.slice();
		tmpTaskList[tmpTaskList.indexOf(task)].favorite=!tmpTaskList[tmpTaskList.indexOf(task)].favorite;
		this.setState({Tasks:tmpTaskList});
	}

	addTask=(...newTask)=>{
		let tmpTaskList=this.state.Tasks.slice();
		if(newTask[0]!==''&&(!isNaN(new Date(newTask[3]).getTime())||newTask[3]==='')){
			let tmpDate=newTask[3]===''?undefined:new Date(newTask[3]);
			tmpTaskList.push({name:newTask[0],descr:newTask[1],group:newTask[2],date:tmpDate,filterVisible:true,favorite:false});
		}
		this.setState({Tasks:tmpTaskList});
	}

	showBin=()=>{
		this.setState(prevState=>({showDeleted:!prevState.showDeleted}));

	}
	render(){
		const tmpTasks=this.state.showDeleted?this.state.deletedTasks.slice():this.state.Tasks.slice();
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
					<span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByName(-1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByName(1)}>&#9660;</span>
				</div>
				<div>
					<span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(-1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(1)}>&#9660;</span>
				</div>

			</div>
			<div className='clear'/>
					{tmpTasks.map(task=>(<TaskItem TaskProps={task} id={tmpTasks.indexOf(task)} match={match} replaceFunction={!this.state.showDeleted?(this.deleteTask):(this.recoverTask)} replaceIcon={!this.state.showDeleted?('x'):('v')} setFavorite={this.setFavorite}/>))}
			<Additive addTask={this.addTask} show={!this.state.showDeleted}/>
			

		</div>
		<FilterTasks filterTaskList={this.filterTaskList} resetFilter={this.resetFilter}/>
		</div>	)
	}
};

























/*
return (<div><h2>Список задач</h2>
			<table style={{textAlign:'center',lineHeight:'25px'}}>
				<thead style={{fontSize:'20px'}}>
					<tr>
						<th>Наименование<span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByName(-1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByName(1)}>&#9660;</span></th>
						<th>Описание</th>
						<th>Прогресс</th>
						<th>Срок<span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(-1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(1)}>&#9660;</span></th>
					</tr>
				</thead>
				<tbody>
					{tmpTasks.map(task=>(<TaskItem TaskProps={task} replaceFunction={!this.state.showDeleted?(this.deleteTask):(this.recoverTask)} replaceIcon={!this.state.showDeleted?('x'):('v')} setFavorite={this.setFavorite}/>))}
					<Additive addTask={this.addTask} show={!this.state.showDeleted}/>
				</tbody>
			</table>		
			<FilterTasks filterTaskList={this.filterTaskList} resetFilter={this.resetFilter}/>	
			<button onClick={()=>this.showBin()}>Показать {корзину</button>	
		</div>)
*/