import React from 'react';

export default class Additive extends React.Component{
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
		return(<tr>
					<td><input placeholder='введите наименование задачи' onBlur={this.handleAddTaskName.bind(this)}/></td>
					<td><input placeholder='введите описание задачи' onBlur={this.handleAddTaskDescr.bind(this)}/></td>
					<td><select value={this.state.status} style={{width:'inherit'}} onChange={this.handleAddTaskStatus.bind(this)}>
					<option>Выполнить</option>
					<option>Выполняется</option>
					<option>Выполнено</option>
					</select></td>
					<td><input placeholder='введите срок (гггг,мм,дд ч:м:с")' onBlur={this.handleAddTaskDate.bind(this)}/></td>
					<td style={{border:'none',textAlign:'left',paddingLeft:'2px'}}>
					<button onClick={()=>this.props.addTask(name,descr,status,dateString)}>Добавить</button></td>
					</tr>);
	}
}