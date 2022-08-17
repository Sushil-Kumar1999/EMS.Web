export interface IEvent extends ICreateEventRequest
{
    id: number
}

export interface ICreateEventRequest
{ 
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
}