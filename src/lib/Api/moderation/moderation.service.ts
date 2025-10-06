import ModerationApi from "./moderation.endpoint";

export class ModerationService {
    private moderationApi: ModerationApi;

    constructor() {
        this.moderationApi = new ModerationApi();
    }
    async createBatchId(SubmittedById: string): Promise<string | null> {
        const response = await this.moderationApi.getBatchId(SubmittedById);

        return response?.Id || null;
    }
    async createSessionId(): Promise<string | null> {
        const response = await this.moderationApi.createSessionId();

        return response?.sessionId || null;
    }
    async createSessionIds(
        count: number
    ): Promise<{ sessionId: string }[] | null> {
        const response = await this.moderationApi.createSessionIds(count);

        return response;
    }
    async getModerationData(SubmittedById: string) {
        const [batchId, sessionId] = await Promise.all([
            this.createBatchId(SubmittedById),
            this.createSessionId(),
        ]);
        if (!batchId || !sessionId) {
            console.log('console.log("cant get batchId or sessionId")');
            return null;
        }
        return {
            ModerationBatchId: batchId,
            SessionId: sessionId,
            SubmittedById: SubmittedById,
        };
    }
}
