import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
export default class TaskItem extends React.Component{
	constructor(props){
		super(props);
	}

	setFavoriteEvent=task=>{
		if(this.props.setFavorite)
			this.props.setFavorite(this.props.id);
		return;
	}
	statusBtnClick(event){
		this.props.changeStatus(this.props.id);
	}
	delBtnClick(event){
		this.props.replaceFunction(this.props.id);
	}
	render(){
		let {TaskProps,match}=this.props;
		let {id,name,descr,group,date,filterVisible,favorite,isDeleted}=TaskProps;
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
				<div className={'status '+cName} onClick={this.statusBtnClick.bind(this)}>					
						{cName=='todo'?(<span></span>):(cName=='doing'?(<span>&#9658;</span>):(<span>&#10004;</span>))}
					
				</div>
				<div>
					<Link to={`${match.path}/${this.props.id}`}>
						{name}<span style={{fontStyle:'italic',textAlign:'right'}}>до {hhmmss+' '+yyyymmdd}</span>
					</Link>
				</div>
				<div>
					<Link to={`${match.path}/task-${this.props.id}/edit`}><span>&#9998;</span ></Link>
					<span style={{color:favorite?'gold':'black'}} onClick={()=>this.setFavoriteEvent(TaskProps)}>&#9733;</span>
					<span onClick={this.delBtnClick.bind(this)}>
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
