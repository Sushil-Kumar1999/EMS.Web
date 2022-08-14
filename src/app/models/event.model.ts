export interface IEvent {
    name: string;
    startDate: Date;
    endDate: Date;
}

export interface ICreateEventRequest extends IEvent {}