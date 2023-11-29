import { randomUUID } from "crypto"
import { users } from "../database/users"
import { Tweet } from "./Tweet"

export class User {
    private id: string
    private tweets: Tweet[]
    private followers: User[]

    constructor(private name: string, private _username: string, private email: string, private password: string) {
        this.id = randomUUID()
        this.followers = []
        this.tweets = []

        if (users.find(user => user.username == this._username)) {
            throw new Error("This username already exist!");
        }

        users.push(this)
    }

    get username(): string {
        return this._username
    }

    sendTweet(content: string): string {
        const newTweet = new Tweet(content, "normal")
        this.tweets.push(newTweet)
        console.log("New tweet added!")

        return newTweet.id
    }

    follow(user: User) {
        try {
            if (user === this) {
                throw new Error("You can't follow yourself!")
            }
            user.followers.push(this)
        } catch (error) {
            console.log(error.message)
            return null
        }
    }

    show() {
        console.log(this.name)
        console.log(`@${this._username}`)
        console.log("------------------------------")
    }

    showFollowers() {
        console.log("Followers:")
        this.followers.forEach(follower => follower.show())
    }

    showTweets() {
        this.tweets.forEach(tweet => {
            console.log(`@${this.username}: ${tweet.content}`)

        })
    }
}