import { randomUUID } from "crypto"
import { tweetAccounts } from "../database/tweetAccounts"
import { Like } from "./Like" 

type TweetType = "normal" | "reply"

export class Tweet {
    private id: string
    private replies: Tweet[]
    private likes: Like[]
    private _timeOfCreation: Date

    constructor(private _content: string, private type: TweetType, private tweetOwnerUsername: string) {
        this.id = randomUUID()
        this.replies = []
        this.likes = []
        this._timeOfCreation = new Date()

        if (!tweetAccounts.find(tweetAccount => tweetAccount.username == this.tweetOwnerUsername)) {
            throw new Error("User not found")
        }

    }

    get timeOfCreation(): Date {
        return this._timeOfCreation
    }

    reply(content: string, username: string): Tweet | null {
        try {
            const newReply = new Tweet(content, "reply", username)
            this.replies.push(newReply)
            console.log("Reply added")
            console.log("------------------------------------------------------")
            return newReply
        } catch (error) {
            console.log(error.message)
            return null
        }
    }

    like(username: string): void | null {
        try {            
            if (this.likes.find(like => like.likesOwnerUsername === username)) {
                throw new Error("This user already liked this tweet!")
            }
            this.likes.push(new Like(username))
            console.log("Like added")
            console.log("------------------------------------------------------")
        } catch (error) {
            console.log(error.message)
            console.log("------------------------------------------------------")
            return null
        }
    }

    show(): void {
        console.log(`@${this.tweetOwnerUsername}: ${this._content}`)
        if (this.likes.length !== 0) {
            if (this.likes.length === 1) {
                this.likes.forEach(like => console.log(`[${like.likesOwnerUsername === this.tweetOwnerUsername ? "You" : "@" + like.likesOwnerUsername} liked this!]`))
            } else {
                console.log(`[${this.likes[0].likesOwnerUsername === this.tweetOwnerUsername ? "You" : "@" + this.likes[0].likesOwnerUsername} and other ${this.likes.length - 1} user(s) liked this]`)
            }
        }
        this.replies.length === 0 ? console.log("------------------------------------------------------") : ""
    }

    showReplies(): void {
        this.show()
        this.replies.forEach(reply => console.log(`   > ${this.tweetOwnerUsername === reply.tweetOwnerUsername ? "You" : "@" + reply.tweetOwnerUsername}: ${reply._content}`))
        this.replies.length === 0 ? "" : console.log("------------------------------------------------------")
    }
}