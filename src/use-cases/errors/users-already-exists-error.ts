export class UsersAlreadyExists extends Error{
	constructor(){
		super("users already exists");
	}
}