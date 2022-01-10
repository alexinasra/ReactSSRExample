import { model, Schema } from "mongoose";
import DbUser from "./DbUser";
import DbUserPreferences from "./DbUserPreferences";
import DbUserProfile from "./DbUserProfile";
const { text } = require('@react-ssrex/utils');

export const preferencesSchema = new Schema<DbUserPreferences>({
    language: {
        type: String,
        required: true,
        default: 'en'
    },
    theme: {
        type: String,
        required: true,
        default: 'default'
    },
    mode: {
        type: String,
        required: true,
        default: 'light',
        validate: [(mode: string) => mode === 'light' || mode === 'dark']
    }
})

export const userSchema = new Schema<DbUser>({
    firstname: {
        type: String,
        required: true,
        validate: [function(name: string) {
            const reg = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/
            return reg.test(name);
        }]
    },
    lastname: {
        type: String,
        required: true,
        validate: [function(name: string) {
            const reg = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/
            return reg.test(name);
        }]
    },
    profilePicture: {
        type: String,
        required: true
    },
    preferences: {
        type: preferencesSchema,
        default: {}
    }
})

userSchema.virtual('fullname').get(
    function(this: DbUserProfile) {
        return `${this.firstname} ${this.lastname}`
    }
)

export default model<DbUser>('User', userSchema)