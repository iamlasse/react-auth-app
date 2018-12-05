// import { createSelector } from 'reselect';

const getAuthUser = state => state.auth.user;
const getAuthenticated = state => state.auth.authenticated;
const getAuthFetchStatus = state => state.auth.fetching;
// export const getVisibleTodos = createSelector(
//   [getUser],
//   (user) => {
//     switch (user) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )

export default {
	getAuthUser,
	getAuthFetchStatus,
	getAuthenticated
};
