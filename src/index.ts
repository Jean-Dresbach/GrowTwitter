import { User } from "./modules/User"
import { Admin } from "./modules/Admin"

function createUser(name: string, username: string, email: string, password: string): User | null {
    try {
        return new User(name, username, email, password)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

function createAdmin(name: string, username: string, email: string, password: string): Admin | null {
    try {
        return new Admin(name, username, email, password)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const user1 = createUser("Jean", "jean", "jean@gmai.com", "1234abcd")
const user2 = createUser("Daphne", "daphne", "daphne@gamil.com", "1234abcd")
const user3 = createUser("João", "joão", "joao@gmai.com", "1234abcd")
            
user1.follow(user3)
user1.follow(user2)

user2.follow(user3)

user1.showFollowers()
user2.showFollowers()
user3.showFollowers()

const tweet1 = user1.sendTweet("Olá mundo")
const tweet2 = user1.sendTweet("Olá Growdevers")
const tweet3 = user1.sendTweet("Growdev é TOP!")

user2.sendTweet("Hello world!")
user2.sendTweet("Hello Growdevers")
user2.sendTweet("Growdev is the best!")

user3.sendTweet("Hola mundo")
user3.sendTweet("Hola Growdevers")
user3.sendTweet("Growdev es la mejor!")

tweet2.like("jean")
tweet3.like("joão")
tweet3.like("jean")
tweet3.like("daphne")

tweet1.show()
tweet2.show()
tweet3.show()

tweet3.reply("Based!", "daphne")
tweet3.reply("La más pura verdad!", "joão")
tweet3.reply("Só falo verdades.", "jean")

user3.showFeed()

const admin = createAdmin("Elon", "musk", "musk@growtwitter.com", "1234abcd")

admin.show()
admin.banUser(user2)
user2.showTweets()
admin.unbanUser(user2)
user2.showTweets()