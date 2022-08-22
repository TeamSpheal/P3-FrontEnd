import User from "./User"
import UserMiniDTO from './UserMiniDTO'

export default class Post {
    id: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]
    users: UserMiniDTO[]
    createdDate: Date

    constructor (id: number, text: string, imageUrl: string, author: User, comments: Post[], users: UserMiniDTO[], createdDate: Date) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
        this.users = users;
        this.createdDate = createdDate;

    }
}