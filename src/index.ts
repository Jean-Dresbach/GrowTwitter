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

// function createTweet(content: string) {
//     return new Tweet(content, "normal")
// }

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


const tweet1Id = user1.sendTweet("Olá mundo")
const tweet2Id = user1.sendTweet("Olá Growdevers")
const tweet3Id = user1.sendTweet("Growdev é TOP!")

user1.showTweets()