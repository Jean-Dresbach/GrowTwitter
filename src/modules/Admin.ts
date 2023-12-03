import { TweetAccount } from "./TweetAccount"
import { User } from "./User"

class Admin extends TweetAccount {
    constructor(name: string, username: string, email: string, password: string) {
        super(name, username, email, password, true)
    }
    
    show(): void {
        console.log(this.name, "(Admin at GrowTwitter)")
        console.log(`@${this._username}`)
        console.log("------------------------------")
    }

    banUser(user: User): void | null {
        if (user.isBanned) {
            console.log(`${user.username} has already been banned`)   
            return null
        }
        user.isBanned = true
        console.log(`${user.username} was banned successfully`)   
    }

    unbanUser(user: User): void | null {
        if (!user.isBanned) {
            console.log(`${user.username} was not banned`)   
            return null
        }
        user.isBanned = false
        console.log(`${user.username} was unbanned successfully`)   
    }
}