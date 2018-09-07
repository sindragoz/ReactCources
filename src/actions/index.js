export const addTaskAction = (newTask) => ({
  type: 'ADD_TASK',
  newTask
})

export const changeTaskStatusAction = (id) => ({
  type: 'CHANGE_TASK_STATUS',
  id
})

export const editTaskAction = (id,editedTask) => ({
  type: 'EDIT_TASK',
  id,
  editedTask
})

export const deleteTaskAction = (id) => ({
  type: 'DELETE_TASK',
  id
})

export const recoverTaskAction = (id) => ({
  type: 'RECOVER_TASK',
  id
})

export const sortTasksByNameAction = (direction) => ({
  type: 'SORT_TASKS_BY_NAME',
  direction
})

export const sortTasksByDateAction= (direction) => ({
  type: 'SORT_TASKS_BY_DATE',
  direction
})

export const filterTasksAction = (groups) => ({
  type: 'FILTER_TASKS',
  groups
})

export const setFavoriteAction= (id) => ({
  type: 'SET_FAVORITE_TASK',
  id
})

