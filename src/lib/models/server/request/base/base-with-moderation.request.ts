export interface IBaseModerationRequest<T> {
    moderation?: {
        SubmittedById?: string;
        ModerationBatchId?: string;
        SessionId?: string;
    };
    data: T;
}
