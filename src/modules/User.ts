import { TweetAccount } from "./TweetAccount";

export class User extends TweetAccount {
    constructor(name: string, username: string, email: string, password: string) {
        super(name, username, email, password, false)
    }

    
    get isBanned() : boolean {
        return this._isBanned
    }
    
    
    set isBanned(isBannedNewValue: boolean) {
        this._isBanned = isBannedNewValue
    }

    show(): void | null {
        if (this._isBanned) {
            console.log("Your account was suspended")
            return null
        }
        console.log(this.name)
        console.log(`@${this._username}`)
    }
}