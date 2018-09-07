import React from 'react';
import ReactDOM from 'react-dom';
const title = 'My Minimal React Webpack Babel Setup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TaskList from './components/TaskList';
import TaskItemView from './components/TaskItemView';
import './style.css';


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
  <App />,
  document.getElementById('app')
);
module.hot.accept();