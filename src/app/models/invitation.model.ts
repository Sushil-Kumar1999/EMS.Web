export interface ISendInvitationRequest {
    eventId: number;
    volunteerDetails: Array<VolunteerDetails>;
}

export class VolunteerDetails {
    volunteerId: string;
    volunteerEmail: string;

    constructor(id: string, email: string) {
        this.volunteerId = id;
        this.volunteerEmail = email;
    }
}

export interface UpdateInvitationRequest extends ISendInvitationRequest {}