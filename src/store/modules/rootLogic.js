import { logic as usersLogic } from './users';
import { logic as authLogic } from './auth';

export default [ ...usersLogic, ...authLogic ];
