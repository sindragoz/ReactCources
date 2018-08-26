import React from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

export default class Bin extends React.Component{
	
	constructor(props){
		super(props);
	}
	recoverTask=(task)=>{
		let tmpTaskList=this.state.Tasks.slice();
		let tmpDeletedTasks=this.state.deletedTasks.slice();
		tmpDeletedTasks.push(tmpTaskList.splice(tmpTaskList.indexOf(task),1));
		this.setState({Tasks:tmpTaskList,deletedTasks:tmpDeletedTasks});

	}

	ComponentWillReceiveProps(nextProps){
		this.setState({deletedTasks:nextProps.deletedTasks});

	}
	render(){

		let tmpTasks=this.props.deletedTasks;
		return (<div style={{marginTop:'150px'}}><h2>Корзина</h2>
			<table style={{textAlign:'center',lineHeight:'25px'}}>
				<thead style={{fontSize:'20px'}}>
					<tr>
						<th>Наименование</th>
						<th>Описание</th>
						<th>Прогресс</th>
						<th>Срок</th>
					</tr>
				</thead>
				<tbody>
					{tmpTasks!==undefined?tmpTasks.map(task=>(<TaskItem TaskProps={task} replaceFunction={this.props.recoverTask} replaceIcon='v'/>)):(<tr></tr>)}
				</tbody>
			</table>
		</div>)
	}
}
