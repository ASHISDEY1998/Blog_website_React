import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                this.login(email, password)
            } else {
                return userAccount;
            }
        } catch (error) {
            return false
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            return false
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            return null;
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            return false
        }
    }

}
const authService = new AuthService


export default authService;