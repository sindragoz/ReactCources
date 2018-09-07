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
		if(!this.props.show)
			return(<div></div>);
				else
				
		return(<div className='Additive'>
			<select value={this.state.status} style={{width:'inherit'}} onChange={this.handleAddTaskStatus.bind(this)}>
				<option>Выполнить</option>
				<option>Выполняется</option>
				<option>Выполнено</option>
			</select>
			<input placeholder='Наименование' onBlur={this.handleAddTaskName.bind(this)}/>
			<input placeholder='Описание' onBlur={this.handleAddTaskDescr.bind(this)}/>
			
			<input placeholder='(гггг,мм,дд ч:м:с)' onBlur={this.handleAddTaskDate.bind(this)}/>				
			<button onClick={()=>this.props.addTask(name,descr,status,dateString)}>Добавить</button>
		</div>);
	}
}