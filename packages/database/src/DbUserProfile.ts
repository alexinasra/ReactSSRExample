
export default interface DbUserProfile {
    firstname: string
    lastname: string
    profilePicture: string
    get fullname(): string
}