import User from "./User"

export default class Post {
    id: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]
    users: User[]

    constructor (id: number, text: string, imageUrl: string, author: User, comments: Post[], users: User[]) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
        this.users = users;

    }
}