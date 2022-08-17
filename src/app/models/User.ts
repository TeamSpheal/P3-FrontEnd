export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    username: string
    profileImg: string

    constructor (id: number, email: string, firstName: string, lastName: string, username:string, profileImg:string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.profileImg = profileImg
    }
}