
import { Document } from "mongoose";

import DbUserCredentials from "./DbUserCredentials";
import DbUserPreferences from "./DbUserPreferences";
import DbUserProfile from "./DbUserProfile";


export default interface DbUser extends Document {
    email: string
    profile: DbUserProfile
    credentials: DbUserCredentials
    preferences: DbUserPreferences
}