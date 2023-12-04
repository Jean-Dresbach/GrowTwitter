import { randomUUID } from "crypto"
import { tweetAccounts } from "../database/tweetAccounts"

export class Like {
    private id: string
    
    constructor(private _likesOwnerUsername: string) {
        this.id = randomUUID()

        if (!tweetAccounts.find(tweetAccount => tweetAccount.username === this._likesOwnerUsername)) {
            throw new Error("User not found")
        }
    }

    get likesOwnerUsername(): string {
        return this._likesOwnerUsername
    }
}