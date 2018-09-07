import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class TaskItemView extends React.Component{
	
		constructor({match}){	
		let deletedTasks=[];
		super(...match);		
	}
	render(){

		const {match}=this.props;
		const{name,descr,date,group}=this.props.list[+match.params.item_id];
		const yyyymmdd=date?date.toLocaleDateString():'';
		const hhmmss=date||date?date.toLocaleTimeString():'Нет срока';

		return(
		<div>
			<h1>Задача № {+match.params.item_id+1}</h1>
			<hr/>
			<div>
				<h3>Наименование:</h3>
				<p>{name}</p>
			</div>
			<div>
				<h3>Описание:</h3>
				<p>{descr}{descr===undefined||descr===''?(<span>-</span>):(<span></span>)}</p>
			</div>
			<div>
				<h3>Статус:</h3>
				<p>{group}</p>
			</div>
			<div>
				<h3>Срок:</h3>
				<p>до {hhmmss+' '+yyyymmdd}</p>
			</div>
			<Link to="/list">назад</Link>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {list:state.tasks};
	}
export default connect(mapStateToProps)(TaskItemView);