export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface IFindVolunteersCriteria {
    minAge: number,
    maxAge: number,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number
}