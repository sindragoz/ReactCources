import React from 'react';
import ReactDOM from 'react-dom';
const title = 'My Minimal React Webpack Babel Setup';

class Counter extends React.Component{

	constructor() {
		super();
		this.state = {started: false, date:new Date(), startDate:new Date(),interval:1 };
		setInterval(this.tickTime.bind(this),1000);
	}
	changeCounterState(){		
		this.setState({started:!this.state.started});
	}
	resetCounterState(){	
		let tmp_date=new Date(this.state.startDate);			
		this.setState({started:false,date:tmp_date});
	}
	tickTime(){
		if(this.state.started){
			let tmp_date=this.state.date;
		tmp_date.setSeconds(this.state.date.getSeconds()+this.state.interval);	
		this.setState({date:tmp_date});
		}
	}
	
	setTickInterval(sign){
		let tmp_interval=this.state.interval+1*sign;
		if(tmp_interval<1)
			tmp_interval=1;
		this.setState({interval:tmp_interval});
	}
	
	render (){		
		let state_text=this.state.started?"STOP":"START";
		let zero_sec=this.state.date.getSeconds()/10<1?"0":"";
		let zero_min=this.state.date.getMinutes()/10<1?"0":"";
		let zero_hour=this.state.date.getHours()/10<1?"0":"";
		return (		
		<div style={ {fontSize: '30px',textAlign: 'center',lineHeight:'40px',userSelect:'none' } }> 
		<p style={{fontSize: '50px', fontWeight: 'bold',margin:'60px 0', border:'1px solid black', display:'inline-block', padding:'15px'}}>{zero_hour}{this.state.date.getHours()} : {zero_min}{this.state.date.getMinutes()} : {zero_sec}{
			this.state.date.getSeconds()}</p>
		<div style={ {cursor: 'pointer', fontSize: '30px',textAlign: 'center',marginBottom:'10px'} } onClick={this.changeCounterState.bind(this)}>{state_text}</div>
		<div style={ {cursor: 'pointer', fontSize: '30px',textAlign: 'center'} } onClick={this.resetCounterState.bind(this)}>RESET</div>
		<div style={ {cursor: 'pointer', fontSize: '30px',textAlign: 'center'} } onClick={this.resetCounterState.bind(this)}></div>
		<div style={ {cursor: 'pointer', lineHeight:'40px',marginTop:'20px'} }><span onClick={this.setTickInterval.bind(this,1)}>&#9650;</span><br/><span style={{border:'2px solid black',padding:'5px'}}>{this.state.interval}</span><br/><span onClick={this.setTickInterval.bind(this,-1)}>&#9660;</span></div>
		</div>
		
		);
		
	}
	
}

ReactDOM.render(
  <Counter/>,
  document.getElementById('app')
);
module.hot.accept();