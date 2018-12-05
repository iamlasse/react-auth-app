const getUsers = state => state.user.users;
const getFetchStatus = state => state.user.fetching;

export default {
	getUsers,
	getFetchStatus
};
