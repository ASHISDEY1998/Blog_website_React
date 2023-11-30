import { config } from "../config/config"
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(props) {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title: title,
                    content: content,
                    featuredIamge: featuredImage,
                    status: status,
                    userId: userId
                }
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title: title,
                    content: content,
                    featuredIamge: featuredImage,
                    status: status
                }
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPosts(query = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query,
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //file uplaod sevice
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }
    //file delete 
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }
    //very quic so no need of async
    getFilePreview(fileId) {

        return this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )

    }
}


const service = new Service()
export default Service