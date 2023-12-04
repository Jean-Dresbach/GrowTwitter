import { randomUUID } from "crypto"
import { Tweet } from "./Tweet"
import { tweetAccounts } from "../database/tweetAccounts"

export abstract class TweetAccount {
    protected id: string
    protected tweets: Tweet[]
    protected followers: TweetAccount[]
    protected feed: Tweet[]
    protected _isBanned: boolean

    constructor(protected name: string, protected _username: string, protected email: string, protected password: string, protected isAdmin: boolean) {
        this.id = randomUUID()
        this.followers = []
        this.tweets = []
        this.feed = []
        this._isBanned = false

        if (tweetAccounts.find(tweetAccount => tweetAccount.username === this._username)) {
            throw new Error("This username already exist!")
        }

        tweetAccounts.push(this)
    }

    get username(): string {
        return this._username
    }

    sendTweet(content: string): Tweet | null {
        try {
            if (this._isBanned) {
                throw new Error("Your account was suspended!")
            }
            const newTweet = new Tweet(content, "normal", this._username)
            this.tweets.push(newTweet)
            console.log(`New tweet added by @${this._username}`)
            console.log("------------------------------------------------------")
            return newTweet
        } catch (error) {
            console.log(error.message)
            console.log("------------------------------------------------------")
            return null
        }
    }

    follow(user: TweetAccount): void | null {
        try {
            if (this._isBanned) {
                throw new Error("Your account was suspended!")
            }
            if (user === this) {
                throw new Error("You can't follow yourself!")
            }
            user.followers.push(this)
            console.log(`You followed @${user.username}.`)
            console.log("------------------------------------------------------")
        } catch (error) {
            console.log(error.message)
            console.log("------------------------------------------------------")
            return null
        }
    }

    abstract show(): void

    showFollowers(): void | null {
        if (this._isBanned) {
            console.log("Your account was suspended")
            console.log("------------------------------------------------------")
            return null
        }
        if (this.followers.length === 0) {
            console.log(`This user has no followers`)
            console.log("------------------------------------------------------")
            return null
        }
        console.log("Followers:")
        this.followers.forEach(follower => follower.show())
        console.log("------------------------------------------------------")
    }

    showTweets(): void | null {
        if (this._isBanned) {
            console.log("Your account was suspended")
            console.log("------------------------------------------------------")
            return null
        }
        this.tweets.forEach(tweet => tweet.showReplies())
    }

    showFeed(): void | null {
        if (this._isBanned) {
            console.log("Your account was suspended")
            return null
        }
        this.feed.push(...this.tweets)
        this.followers.forEach(follower => this.feed.push(...follower.tweets))
        this.feed.sort((data1, data2) => data1.timeOfCreation.getTime() - data2.timeOfCreation.getTime())
        this.feed.forEach(tweet => tweet.showReplies())
    }
}