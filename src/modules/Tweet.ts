import { randomUUID } from "crypto"

type TweetType = "normal" | "reply"

export class Tweet {
    private _id: string
    private replies: Tweet[]
    private likes: string[]

    constructor(private _content: string, private type: TweetType) {
        this._id = randomUUID()
        this.replies = []
        this.likes = []
    }

    get content(): string {
        return this._content
    }

    get id(): string {
        return this._id
    }

    reply(content) {

    }

    like() {
        
    }

    show() {

    }

    showReplies() {

    }
}