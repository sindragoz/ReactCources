import React from 'react';
import TaskItem from './TaskItem';
import FilterTasks from './FilterTasks';
import PropTypes from 'prop-types';
import Bin from './Bin';
import Additive from './Additive';

export default class TaskList extends React.Component{
	
		constructor(){
		let tmpTasks=[
		{name:'Помыть посуду',group:'Выполнить',date:new Date(2018,4,12,6,55,43),filterVisible:true,favorite:false},
		{name:'Выгулять пса вечером',group:'Выполнить',date:new Date(2018,4,13,19,0,0),filterVisible:true,favorite:false},
		{name:'Доделать реферат',descr:'20+ листов',group:'Выполняется',date:new Date(2018,5,2,6,55,43),filterVisible:true,favorite:false},
		{name:'Выгулять пса утром',group:'Выполнено',filterVisible:true,favorite:false},
		{name:'Купить хлеба',descr:'ржаного по 20р',group:'Выполнить',date:new Date(2018,4,11,9,15,40),filterVisible:true,favorite:false},
		{name:'Сварить картошки',group:'Выполняется',filterVisible:true,favorite:false},
		{name:'Помыть полы',group:'Выполнено',date:new Date(2018,4,20,11,40,10),filterVisible:true,favorite:false},
		{name:'Вынести мусор',descr:'не забыть',group:'Выполнить',filterVisible:true,favorite:false}];	
		let tmpDeletedTasks=[];
		super();
		this.state={Tasks:tmpTasks,deletedTasks:tmpDeletedTasks};
	}
	
	filterTaskList=(group)=>{
		let tmpTasklist=this.state.Tasks;
		tmpTasklist.map(task=>{task.filterVisible=(task.group==group)});
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
	render(){
		let tmpTasks=this.state.Tasks.slice();
		let tmpDeletedTasks=this.state.deletedTasks.slice();
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
					{tmpTasks.map(task=>(<TaskItem TaskProps={task} replaceFunction={this.deleteTask} replaceIcon='x' setFavorite={this.setFavorite}/>))}
					<Additive addTask={this.addTask} />
				</tbody>
			</table>			
			<FilterTasks filterTaskList={this.filterTaskList} resetFilter={this.resetFilter}/>
			<Bin deletedTasks={tmpDeletedTasks} recoverTask={this.recoverTask}/>
		</div>)
	}
};
