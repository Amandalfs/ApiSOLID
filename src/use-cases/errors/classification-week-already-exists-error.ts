export class ClassificationWeekAlreadyExists extends Error{
	constructor(){
		super("Classification week already exists");
	}
}