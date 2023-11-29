import { randomUUID } from "crypto"
import { users } from "../database/users"

type TweetType = "normal" | "reply"

export class Tweet {
    private _id: string
    private replies: Tweet[]
    private likes: string[]

    constructor(private _content: string, private type: TweetType, private tweetOwner: string) {
        this._id = randomUUID()
        this.replies = []
        this.likes = []

        if (!users.find(user => user.username == this.tweetOwner)) {
            throw new Error("User not found")
        }
    }

    reply(content: string, username: string): Tweet {
        try {
            const newReply = new Tweet(content, "reply", username)
            this.replies.push(newReply)
            return newReply
        } catch (error) {
            console.log(error.message)
            return null
        }
    }

    like(username: string) {
        try {
            if (!users.find(user => user.username === username)) {
                throw new Error("User not found")
            }
            if (this.likes.find(like => like === username)) {
                throw new Error("This user already liked this tweet")
            }
            this.likes.push(username)
        } catch (error) {
            console.log(error.message)
            return null
        }
    }

    show() {
        console.log(`@${this.tweetOwner}: ${this._content}`)
        if (this.likes.length !== 0) {
            if (this.likes.length === 1) {
                this.likes.forEach(like => console.log(`[${like === this.tweetOwner ? "You" : "@" + like} liked this!]`))
            } else {
                console.log(`[${this.likes[0] === this.tweetOwner ? "You" : "@" + this.likes[0]} and other ${this.likes.length - 1} user(s) liked this!]`)
            }
        }
        this.replies.length === 0 ? console.log("------------------------------------------------------") : ""
    }

    showReplies() {
        this.show()
        this.replies.forEach(reply => console.log(`   > ${this.tweetOwner === reply.tweetOwner ? "You" : "@" + reply.tweetOwner}: ${reply._content}`))
        this.replies.length === 0 ? "" : console.log("------------------------------------------------------")
    }
}