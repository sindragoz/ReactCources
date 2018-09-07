const initialTaskList=[
		{id:0,name:'Помыть посуду',group:'Выполнить',date:new Date(2018,4,12,6,55,43),filterVisible:true,favorite:false,isDeleted:false},
		{id:1,name:'Выгулять пса вечером',group:'Выполнить',date:new Date(2018,4,13,19,0,0),filterVisible:true,favorite:false,isDeleted:false},
		{id:2,name:'Доделать реферат',descr:'20+ листов',group:'Выполняется',date:new Date(2018,5,2,6,55,43),filterVisible:true,favorite:false,isDeleted:false},
		{id:3,name:'Выгулять пса утром',group:'Выполнено',filterVisible:true,favorite:false,isDeleted:false},
		{id:4,name:'Купить хлеба',descr:'ржаного по 20р',group:'Выполнить',date:new Date(2018,4,11,9,15,40),filterVisible:true,favorite:false,isDeleted:false},
		{id:5,name:'Сварить картошки',group:'Выполняется',filterVisible:true,favorite:false,isDeleted:false},
		{id:6,name:'Помыть полы',group:'Выполнено',date:new Date(2018,4,20,11,40,10),filterVisible:true,favorite:false,isDeleted:false},
		{id:7,name:'Зажарить куру',descr:'не забыть',group:'Выполнить',filterVisible:true,favorite:false,isDeleted:false}
		];

export default function tasks(state=initialTaskList,action){
	switch(action.type){
		case "EDIT_TASK":
			state[action.id]=action.editedTask;
		return state.slice();
		case "CHANGE_TASK_STATUS":
			state[action.id].group=state[action.id].group=='Выполнить'?state[action.id].group='Выполняется':state[action.id].group=='Выполняется'?state[action.id].group='Выполнено':state[action.id].group='Выполнить';
			return state.slice();
		case "ADD_TASK":
			state.push(action.newTask);
			return state.slice();
		case "DELETE_TASK":
			state[action.id].isDeleted=true;
			return state.slice();
		case "RECOVER_TASK":
			state[action.id].isDeleted=false;
			return state.slice();
		case "SORT_TASKS_BY_NAME":
			state=state.sort(function(a,b){
			if(a.name>=b.name)
				return 1*action.direction;
			if(a.name<b.name)
				return -1*action.direction;
		});
			return state.slice();
		case "SORT_TASKS_BY_DATE":
			state=state.sort(function(a,b){
			if(a.favorite&&!b.favorite)
				return 1*action.direction;
			if(!a.favorite&&b.favorite)
				return -1*action.direction;
			if(a.date<=b.date)
				return -1*action.direction;
			if(a.date>b.date)
				return 1*action.direction;
			if(typeof(a.date)!='object')
				return -1*action.direction;			
			if(typeof(b.date)!='object')
				return 1*action.direction;	
		});	
			return state.slice();
		case "FILTER_TASKS":

			state.map(task=>{
				if(task.group=='Выполнить')
					task.filterVisible=(action.groups['todo']);
				if(task.group=='Выполняется')
					task.filterVisible=(action.groups['doing']);
				if(task.group=='Выполнено')
					task.filterVisible=(action.groups['done']);
				});
			return state.slice();
		case "SET_FAVORITE_TASK":
			state[action.id].favorite=!state[action.id].favorite;
			return state.slice();
		default:
		return state;
	}
		
	}