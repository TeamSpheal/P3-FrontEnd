export default class UserMiniDTO {
    id: number
    username: string
    profileImg: string

    
    constructor(id: number, username: string, profileImg: string) {
        this.id = id
        this.username = username
        this.profileImg = profileImg
    } // NOSONAR
}