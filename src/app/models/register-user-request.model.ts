export interface IRegisterUserRequest {
    firstName: string,
    lastname: string,
    email: string,
    role: string
}

export interface ICreateVolunteerRequest {
    firstName: string,
    lastname: string,
    email: string,
    dateOfBirth: Date,
    height: number,
    weight: number
}