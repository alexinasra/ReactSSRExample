
import { Document } from "mongoose";

import DbUserPreferences from "./DbUserPreferences";
import DbUserProfile from "./DbUserProfile";


export default interface DbUser extends Document, DbUserProfile {
    preferences: DbUserPreferences
}