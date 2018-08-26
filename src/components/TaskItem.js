import React from 'react';
import PropTypes from 'prop-types';


export default class TaskItem extends React.Component{
	constructor(props){
		super(props);
	}

	setFavoriteEvent=task=>{
		if(this.props.setFavorite)
			this.props.setFavorite(task);
		return;
	}

	render(){
		let taskProps=this.props.TaskProps;
		let {name,descr,group,date,filterVisible,favorite}=taskProps;
		let cName;
		let yyyymmdd=date?date.toLocaleDateString():'';
		let hhmmss=date||date?date.toLocaleTimeString():'Нет срока';
		if(group=='Выполнить')
			cName='todo';
		if(group=='Выполняется')
			cName='doing';
		if(group=='Выполнено')
			cName='done';
	return (filterVisible?(<tr>
	<td className={favorite?'fav':'nofav'}>
	<span className={this.props.replaceIcon} onClick={()=>this.props.replaceFunction(taskProps)}>
	{this.props.replaceIcon==='x'?(<span>&#10008;</span>):(<span>&#10004;</span>)}
		</span>
		<span className='favorite' onClick={()=>this.setFavoriteEvent(taskProps)}>&#9733;</span>{name}
		</td>
	<td>{descr}{descr===undefined||descr===''?(<span>-</span>):(<span></span>)}</td>
	<td className={cName}>{group}</td>
	<td>{yyyymmdd} <span style={{fontStyle:'italic'}}>{hhmmss}</span></td></tr>):(<tr></tr>));
	}	
}
