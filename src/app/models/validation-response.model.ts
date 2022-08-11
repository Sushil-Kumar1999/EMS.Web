export interface ValidationErrorsResponse {
    errors: readonly ValidationError[];
}

export interface ValidationError {
    message: string;
}