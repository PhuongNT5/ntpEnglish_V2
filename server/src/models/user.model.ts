import * as mongoose from 'mongoose';
import { ITeam, Location } from '../models';
import constant from '../constant';

export interface IUser {
    id?: string;
    name: String;
    gender: String;
    email: String;
    phone: String;
    avatar?: String;
    position?: [String];
    role?: String;
    location?: Location;
    team?: [String];
    password: String;
    salt?: String;
    birthday: Date;
}

export interface IUserModel extends IUser, mongoose.Document { }

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: String,
    salt: String,
    gender: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    avatar: {
        type: String,
        default: ''
    },
    position: [{
        type: String,
        default: ''
    }],
    location: {
        type: {
            address: String,
            long: Number,
            lat: Number
        },
        default: null

    },
    role: {
        type: String,
        default: constant.ROLE.USER,
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
    }],
    birthday: {
        type: Date,
        default: Date.now(),
    }
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });
// Duplicate the ID field.
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
export const UserModel = mongoose.model<IUserModel>('User', userSchema);
