import { assert } from "chai";
import { connect, disconnect, plugin } from "mongoose";
import UserModel from "./UserModel";
import mongooseIntl from 'mongoose-intl';
import { MongooseIntlDocument } from "mongoose";


describe('UserModel', function() {
    before(async function() {
        plugin(mongooseIntl, {
            languages: ['en', 'ar', 'he'],
            defaultLanguage: ['en'],
            fallback: true
        })
        await connect('mongodb://localhost:27017/test')
    })

    after(async function() {
        await UserModel.collection.drop();
        await disconnect()
    })
    it('Create User', async function() {
        const user = new UserModel();
        user.email = "tesqwqwt@mail.cc"
        user.profile = { firstname: 'tester', lastname: 'tester', profilePicture: 'tester'}
        user.preferences = { language: 'en', theme: 'default', mode: "light" }
        user.credentials = { hash: 'xxx', activated: false, activationCode: '' }

        await user.save()
        assert.isFalse(user.isNew);
    })
})