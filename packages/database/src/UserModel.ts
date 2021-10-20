import { Model, model, Schema } from "mongoose";
import DbUser from "./DbUser";
import DbUserCredentials from "./DbUserCredentials";
import DbUserPreferences from "./DbUserPreferences";
import DbUserProfile from "./DbUserProfile";


export const profileSchema = new Schema<DbUserProfile>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true
    }
})

export const preferencesSchema = new Schema<DbUserPreferences>({
    language: {
        type: String,
        required: true,
    },
})
export const credentialsSchema = new Schema<DbUserCredentials>({

})

export const userSchema = new Schema<DbUser>({
    email: {
        type: String,
        require: true,
        unique: true
    },
    profile: {
        type: profileSchema,
        require: true
    },
    credentials: {
        type: credentialsSchema,
        required: true
    },
    preferences: {
        type: preferencesSchema,
        required: true
    }
})
interface UserModel extends Model<DbUser>{
    
}
export default model<DbUser, UserModel>('User', userSchema)