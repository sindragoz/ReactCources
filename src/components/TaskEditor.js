import React from 'react';
import {connect} from 'react-redux';
import {deleteTaskAction, addTaskAction, changeTaskStatusAction, editTaskAction} from '../actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TaskEditor extends React.Component{
	constructor(props){
		super(props);
		const date=this.props.list[this.props.match.params.item_id].date;
		let dateString=date==undefined?'Нет срока':date.toLocaleDateString()+' '+date.toLocaleTimeString();
		this.state={
			...this.props.list[this.props.match.params.item_id], dateString

		}
	}

	handleEditTaskName(event){
		this.setState({name:event.target.value});
	}
	handleEditTaskDescr(event){
		this.setState({descr:event.target.value});
	}
	handleEditTaskStatus(event){
		this.setState({group:event.target.value});
	}
	handleEditTaskDate(event){
		this.setState({dateString:event.target.value});		
	}

	updateNameValue(event) {
    this.setState({
      name: event.target.value
    });
}
    updateDescrValue(event) {
    this.setState({
      descr: event.target.value
    })
}


    updateDateValue(event) {
    this.setState({
      dateString: event.target.value
    })

  }
	render(){
		const {id,name,descr,group,date,dateString}=this.state;
		const task_id=this.props.match.params.item_id
		let tmpDate=isNaN(new Date(dateString).getTime())?undefined:new Date(dateString);		
		return(<div className='Additive'>
			<select value={group} style={{width:'inherit'}} onChange={this.handleEditTaskStatus.bind(this)}>
				<option>Выполнить</option>
				<option>Выполняется</option>
				<option>Выполнено</option>
			</select>
			<input placeholder='Наименование' onChange={this.updateNameValue.bind(this)} value={name}/>
			<input placeholder='Описание'  onChange={this.updateDescrValue.bind(this)} value={descr}/>
			
			<input placeholder='(гггг,мм,дд ч:м:с)'  onChange={this.updateDateValue.bind(this)} value={dateString}/>				
			<button onClick={()=>this.props.editTask(task_id,{id, name, descr, group, date:tmpDate, filterVisible:true,favorite:false,isDeleted:false})}>Изменить</button>
			<Link to="/list">назад</Link>
		</div>);
	}
}

function mapDispatchToProps(dispatch){
	return{
		editTask:(id,newTask)=>{dispatch(editTaskAction(id,newTask))}
	}
}
function mapStateToProps(state){
	return {list:state.tasks};
	}
export default connect(mapStateToProps,mapDispatchToProps)(TaskEditor);
