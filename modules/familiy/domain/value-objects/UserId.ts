export class UserId{
    private static readonly MAX_LENGTH = 10;
    constructor(public readonly value:string){
        if (!value || value.trim().length === 0) {
            throw new Error('UserId cannot be empty');
        }

        if (value.length > UserId.MAX_LENGTH) {
            throw new Error(`UserId cannot be longer than ${UserId.MAX_LENGTH} characters`);
        }
        
    }
}