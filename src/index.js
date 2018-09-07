import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TaskList from './components/TaskList';
import Additive from './components/Additive';
import TaskEditor from './components/TaskEditor';
import TaskItemView from './components/TaskItemView';
import './style.css';
import allReducers from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const store=createStore(allReducers);

const App=()=>(
	<div>
		<ComponentRouter />
	</div>
	);

const ComponentRouter=()=>(
<Router>
<div>
  <Route exact path="/" component={Home} />  
  <Route exact path="/list" component={TaskList} />
  <Route exact path="/list/task/add" component={Additive}/>
  <Route exact path="/list/task-:item_id/edit" component={TaskEditor}/>
  <Route exact path="/list/:item_id" component={TaskItemView}/>
</div>
</Router>
);


const Home =()=>(

    <div>
    <h1>TODO List</h1>     
    <p>
    	Данное приложение позволяет отслеживать ваши задачи, создавать или удалять их. 
    	Показать <Link to="/list">список задач</Link>                                                        
         	</p>
      <hr />
    </div>
	);

  

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
,
  document.getElementById('app')
);
module.hot.accept();