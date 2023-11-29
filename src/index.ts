import { Tweet } from "./modules/Tweet";
import { User } from "./modules/User";

function createUser(name: string, username: string, email: string, password: string) {
    try {
        return new User(name, username, email, password)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const user1 = createUser("JEAN", "jean", "jean@gmai.com", "1234abcd")
const user2 = createUser("JOÃO", "joão", "joao@gmai.com", "1234abcd")
const user3 = createUser("Daphne", "daphne", "daphne@gamil.com", "1234abcd")
// Exemple of creating a user with a username that already exists:
// const user3 = createUser("Jean Rafael", "jean", "jean.rafael@gmai.com", "1234abcd")

// Example of a user following himself
// user1.follow(user1)

user1.follow(user3)
user2.follow(user3)

user3.showFollowers()


const tweet1 = user1.sendTweet("Olá mundo")
const tweet2 = user1.sendTweet("Olá Growdevers")
const tweet3 = user1.sendTweet("Growdev é TOP!")

tweet1.like("jean")
// Exemple of a user liking a tweet more than once
// tweet1.like("jean")
tweet1.show()

tweet3.reply("É verdade esse bilhete!", "jean")
tweet3.reply("É verdade esse bilhete!", "joão")
tweet3.showReplies()
tweet3.like("joão")
tweet3.like("jean")
tweet3.like("daphne")
tweet3.showReplies()

user1.showTweets()
