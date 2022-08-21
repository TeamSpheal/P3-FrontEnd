export default class UserMiniDTO {
    id: number
    email: string
    username: string
    profileImg: string

    
    constructor(id: number, email: string, username: string, profileImg: string) {
        this.id = id
        this.email = email
        this.username = username
        this.profileImg = profileImg
    } // NOSONAR
}