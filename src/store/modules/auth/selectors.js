const getAuthUser = state => state.auth.user;
const getAuthenticated = state => state.auth.authenticated;
const getAuthFetchStatus = state => state.auth.fetching;

export default {
	getAuthUser,
	getAuthFetchStatus,
	getAuthenticated
};

/**
 * Eample code
 */
// Selector file (selectors.js)
// import { createSelector } from 'reselect';
// export const getVisibleTodos = createSelector(
// 	[getVisibilityFilter, getTodos],
// 	(visibilityFilter, todos) => {
// 		switch (visibilityFilter) {
// 			case 'SHOW_ALL':
// 				return todos
// 			case 'SHOW_COMPLETED':
// 				return todos.filter(t => t.completed)
// 			case 'SHOW_ACTIVE':
// 				return todos.filter(t => !t.completed)
// 		}
// 	}
// )

// Container (VisibleTodoList.js)
// import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
// import TodoList from '../components/TodoList'
// import { getVisibleTodos } from '../selectors'

// const mapStateToProps = state => {
// 	return {
// 		todos: getVisibleTodos(state)
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onTodoClick: id => {
// 			dispatch(toggleTodo(id))
// 		}
// 	}
// }

// const VisibleTodoList = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(TodoList)

// export default VisibleTodoList
