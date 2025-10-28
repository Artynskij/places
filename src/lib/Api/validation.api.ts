import apiClient from "./base/ApiClient";

export class ValidationPersonServerService {
    private baseUrl = "/validate/person";
    constructor() {}
    async email(email: string): Promise<boolean> {
        try {
            const res = await apiClient.get<{
                exists: boolean;
                email: string;
            }>(`${this.baseUrl}/email-exists?email=${email}`);

            return !res.data.exists;
        } catch (error) {
            console.error(
                `error [get ${this.baseUrl}/email-exists?email=${email}`,
                error
            );
            return false;
        }
    }
    async nickname(nickname: string): Promise<boolean> {
        try {
            const res = await apiClient.get<{
                exists: boolean;
                nickname: string;
            }>(`${this.baseUrl}/nickname-exists?nickname=${nickname}`);

            return !res.data.exists;
        } catch (error) {
            console.error(
                `error [get ${this.baseUrl}/nickname-exists?nickname=${nickname}`,
                error
            );
            return false;
        }
    }
    async username(username: string): Promise<boolean> {
        try {
            const res = await apiClient.get<{
                exists: boolean;
                username: string;
            }>(`${this.baseUrl}/username-exists?username=${username}`);

            return !res.data.exists;
        } catch (error) {
            console.error(
                `error [get ${this.baseUrl}/username-exists?username=${username}`,
                error
            );
            return false;
        }
    }
}
