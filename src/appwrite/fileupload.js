import { config } from "../config/config"
import { Storage, ID } from "appwrite";

export class FileuploadService {
    bucket;

    constructor(props) {
        this.bucket = new Storage(this.client);
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


const fileUploadService = new FileuploadService()
export default fileUploadService