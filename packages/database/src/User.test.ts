import { assert, expect } from "chai";
import { connect, disconnect, Document, Mongoose, mongoose, Error } from "mongoose";
import { exit } from "process";
import DbUser from "./DbUser";
import User from "./User";

const name = ['John', 'McGowan']
const profilePicture = "/src/profile.png"
const preferedLanguage = "en"
const preferedTheme = "default"
const preferedMode = "light"

const testUser = new User({
    firstname: name[0],
    lastname: name[1],
    profilePicture,
    preferences: {
        language: preferedLanguage,
        theme: preferedTheme,
        mode: preferedMode
    }
})

describe('User', function() {
    // before(async function() {
    //     await connect('mongodb://localhost:27017/test', { 
    //         useNewUrlParser: true, 
    //         useUnifiedTopology: true, 
    //         useCreateIndex: true
    //     })
    // })

    // after(async function() {
    //     await User.collection.drop();
    //     await disconnect()
    // })

    it('Validate firstname empty string', function(done) {
        User.validate({firstname: ""}, ['firstname'])
            .then(() => done('empty string is not allowed'))
            .catch((e: Error.ValidationError) => {
                expect(e.errors.firstname).to.exist;
                done();
            })
    })
    it('Validate lastname empty string', function(done) {
        User.validate({lastname: ""}, ['lastname'])
            .then(() => done('empty string is not allowed'))
            .catch((e: Error.ValidationError) => {
                expect(e.errors.lastname).to.exist;
                done();
            })
    })
    it('Validate preferences theme mode', function(done){
        User.validate({preferences: { mode: 'val'}}, ['preferences'])
            .then(() => done('value is not allowed'))
            .catch((e: Error.ValidationError) => {
                expect(e.errors['preferences.mode']).to.exist;
                done();
            })
    })
})