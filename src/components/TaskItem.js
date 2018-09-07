import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
		let {TaskProps,match,id}=this.props;
		let {name,descr,group,date,filterVisible,favorite}=TaskProps;
		let cName;
		let yyyymmdd=date?date.toLocaleDateString():'';
		let hhmmss=date||date?date.toLocaleTimeString():'Нет срока';
		if(group=='Выполнить')
			cName='todo';
		if(group=='Выполняется')
			cName='doing';
		if(group=='Выполнено')
			cName='done';
	return (filterVisible?(
		<div className={'TaskItem '+(favorite?' fav':' nofav')}>
			<div>
				<div className={'status '+cName}>					
						{cName=='todo'?(<span></span>):(cName=='doing'?(<span>&#9658;</span>):(<span>&#10004;</span>))}
					
				</div>
				<div>
					<Link to={`${match.path}/${id}`}>
						{name}<span style={{fontStyle:'italic',textAlign:'right'}}>до {hhmmss+' '+yyyymmdd}</span>
					</Link>
				</div>
				<div>
					<span>&#9998;</span >
					<span style={{color:favorite?'gold':'black'}} onClick={()=>this.setFavoriteEvent(TaskProps)}>&#9733;</span>
					<span onClick={()=>this.props.replaceFunction(TaskProps)}>
						{this.props.replaceIcon=='v'?(<span>&#8634;</span>):(<span>&#128465;</span>)}
					</span>
				</div>
		</div>
			<div className='clear'>
			</div>
		</div>
		):(<div></div>));
	}	
}
















/*
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
*/