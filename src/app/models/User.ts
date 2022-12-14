import UserMiniDTO from '../models/UserMiniDTO';

export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    username: string
    profileImg: string
    followers: UserMiniDTO[]
    following: UserMiniDTO[]


    constructor(id: number, email: string, firstName: string, lastName: string, username: string, profileImg: string, // NOSONAR
        followers: UserMiniDTO[], following: UserMiniDTO[]) { 
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.profileImg = profileImg
        this.followers = followers
        this.following = following
    }
}