import User from "./User"
import UserMiniDTO from './UserMiniDTO'

export default class Post {
    id: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]
    users: UserMiniDTO[]

    constructor (id: number, text: string, imageUrl: string, author: User, comments: Post[], users: UserMiniDTO[]) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
        this.users = users;
    }
}