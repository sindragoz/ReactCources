import React from 'react';
import PropTypes from 'prop-types';


export default class TaskItem extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let taskProps=this.props.TaskProps;
		let {name,descr,group,date,filterVisible}=taskProps;
		let cName;
		let yyyymmdd=date?date.toLocaleDateString():'';
		let hhmmss=date?date.toLocaleTimeString():'Нет срока';
		if(group=='Выполнить')
			cName='todo';
		if(group=='Выполняется')
			cName='doing';
		if(group=='Выполнено')
			cName='done';
	return (filterVisible?(<tr>
	<td>{name}</td>
	<td>{descr}{descr===undefined?(<span>-</span>):(<span></span>)}</td>
	<td className={cName}>{group}</td>
	<td>{yyyymmdd} <span style={{fontStyle:'italic'}}>{hhmmss}</span></td></tr>):(<tr></tr>));
	}	
}
	TaskItem.propTypes={
		TaskProps:PropTypes.object.isRequired
	}