export interface IEvent {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
}

export interface ICreateEventRequest extends IEvent {}