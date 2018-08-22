import React from 'react';
import TaskItem from './TaskItem';
import FilterTasks from './FilterTasks';
export default class TaskList extends React.Component{
	
		constructor(){
		let tmpTasks=[
		{name:'Помыть посуду',descr:'',group:'Выполнить',date:new Date(2018,4,12,6,55,43),filterVisible:true},
		{name:'Выгулять пса вечером', descr:'',group:'Выполнить',date:new Date(2018,4,13,19,0,0),filterVisible:true},
		{name:'Доделать реферат',descr:'20+ листов',group:'Выполняется',date:new Date(2018,5,2,6,55,43),filterVisible:true},
		{name:'Выгулять пса утром',descr:'',group:'Выполнено',filterVisible:true},
		{name:'Купить хлеба',descr:'ржаного по 20р',group:'Выполнить',date:new Date(2018,4,11,9,15,40),filterVisible:true},
		{name:'Сварить картошки',descr:'10 штук',group:'Выполняется',filterVisible:true},
		{name:'Помыть полы',descr:'',group:'Выполнено',date:new Date(2018,4,20,11,40,10),filterVisible:true},
		{name:'Вынести мусор',descr:'не забыть',group:'Выполнить',filterVisible:true}];	
		super();
		this.state={Tasks:tmpTasks};
	}
	
	ComponentDidMount(){
			
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
			if(a.date<=b.date)
				return -1*direction;
			if(a.date>b.date)
				return 1*direction;
			if(typeof(a.date)!='object')
				return -1*direction;			
			if(typeof(b.date)!='object')
				return 1*direction;	
		});	
		this.setState({Tasks:sortedTasks.slice()});
	}
	
	render(){
		let tmpTasks=this.state.Tasks;
		return (<div>
			<table style={{textAlign:'center',lineHeight:'25px'}}>
				<thead style={{fontSize:'20px'}}>
					<tr>
						<th>Наименование</th>
						<th>Описание</th>
						<th>Прогресс</th>
						<th>Срок<span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(-1)}>&#9650;</span><span style={{cursor:'pointer'}} onClick={()=>this.sortTasksByDate(1)}>&#9660;</span></th>
					</tr>
				</thead>
				<tbody>
					{tmpTasks.map(task=>(<TaskItem TaskProps={task}/>))}
				</tbody>
			</table>
			<FilterTasks filterTaskList={this.filterTaskList} resetFilter={this.resetFilter}/>
		</div>)
	}
}