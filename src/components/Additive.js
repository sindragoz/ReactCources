import React from 'react';
import {connect} from 'react-redux';
import {deleteTaskAction, addTaskAction, changeTaskStatusAction, editTaskAction} from '../actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Additive extends React.Component{
	constructor(props){
		super(props);
		this.state={name:'',descr:undefined,status:'Выполнить',dateString:''}
	}

	handleAddTaskName(event){
		this.setState({name:event.target.value});
	}
	handleAddTaskDescr(event){
		this.setState({descr:event.target.value});
	}
	handleAddTaskStatus(event){
		this.setState({status:event.target.value});
	}
	handleAddTaskDate(event){
		this.setState({dateString:event.target.value});		
	}
	componentDidMount(){
	}
	render(){
		const {name,descr,status,dateString}=this.state;
		let date=isNaN(new Date(dateString).getTime())?undefined:new Date(dateString);
		return(<div className='Additive'>
			<select value={this.state.status} style={{width:'inherit'}} onChange={this.handleAddTaskStatus.bind(this)}>
				<option>Выполнить</option>
				<option>Выполняется</option>
				<option>Выполнено</option>
			</select>
			<input placeholder='Наименование' onBlur={this.handleAddTaskName.bind(this)}/>
			<input placeholder='Описание' onBlur={this.handleAddTaskDescr.bind(this)}/>
			
			<input placeholder='(гггг,мм,дд ч:м:с)' onBlur={this.handleAddTaskDate.bind(this)}/>				
			<button onClick={()=>this.props.addTask({id:this.props.last_id, name, descr, group:status, date, filterVisible:true,favorite:false,isDeleted:false })}>Добавить</button>
			<Link to="/list">назад</Link>
		</div>);
	}
}

function mapDispatchToProps(dispatch){
	return{
		addTask:newTask=>{dispatch(addTaskAction(newTask))}
	}
}
function mapStateToProps(state){
	return {last_id:state.tasks.length};
	}
export default connect(mapStateToProps,mapDispatchToProps)(Additive);
