import { IUserRepository } from '../IRepositories';
import { IUser, IUserModel, UserModel, RemoveObject, IError } from '../models';


export class UserRepository implements IUserRepository {
    find(query: any): Promise<IUser[] | IError> {
        return UserModel.find(query).then((users: IUserModel[]) => {
            return Promise.resolve(users.map((user) => user.toObject() as IUser));
        }).catch(err => {
            return Promise.reject({
                statusCode: 400,
                message: 'bla bla'
            });
        });
    }
    findOne(query: any): Promise<IUser> {
        return UserModel.findOne(query).then(user => {
            if (user) {
                return Promise.resolve(user.toObject() as IUser);
            } else {
                return Promise.reject('User does not exist');
            }

        }).catch(err => {
            return Promise.reject(err);
        });
    }
    insert(newUser: IUser): Promise<IUser> {
        return UserModel.findOne({ 'email': newUser.email }).then(user => {
            if (user) {
                return Promise.reject('user already exists');
            } else {
                const newUser1 = new UserModel({
                    name: newUser.name,
                    gender: newUser.gender,
                    email: newUser.email,
                    phone: newUser.phone,
                    avatar: newUser.avatar,
                    position: newUser.position,
                    role: newUser.role,
                    location: newUser.location,
                    team: newUser.team,
                    password: newUser.password,
                    salt: newUser.salt,
                    birthday: newUser.birthday,
                });

                return newUser1.save().then(newUserr => {
                    return Promise.resolve(newUserr.toObject() as IUser);
                }).catch(err => Promise.reject(err));
            }
        }).catch(err => {
            return Promise.reject(err + '');
        });

    }

    update(newUser: IUser): Promise<IUser> {
        return UserModel.findOne({ email: newUser.email }).then((user: IUserModel) => {
            if (user) {
                user.name = newUser.name;
                user.email = newUser.email;
                user.gender = newUser.gender;
                user.avatar = newUser.avatar;
                user.phone = newUser.phone;
                user.position = newUser.position;
                user.role = newUser.role;
                user.location = newUser.location;
                user.team = newUser.team;
                user.password = newUser.password;
                user.salt = newUser.salt;
                user.birthday = newUser.birthday;
                return user.save().then(userUpdate => {
                    return Promise.resolve(userUpdate.toObject() as IUser);
                })
                    .catch(err => {
                        return Promise.reject(err + '');
                    });
            } else {
                return Promise.reject('User does not exist');
            }
        }).catch(err => {
            return Promise.reject(err + '');
        });
    }

    // findById(id: string): Promise<any> {
    //     return UserModel.findOne({
    //         _id: id
    //     }).then((user) => {
    //         if (user) {
    //             return Promise.resolve(user.toObject() as IUser);
    //         } else {
    //             return Promise.reject('User dose not exist');
    //         }
    //     }).catch((err) => {
    //         return Promise.reject({
    //             message: err.message
    //         });
    //     });
    // }

    delete(email: String): Promise<RemoveObject | string> {
        return UserModel.findOne({ 'email': email }).then(user => {
            if (!user) {
                return Promise.reject('user dose not exist');
            } else {
                return UserModel.remove({ 'email': email }).then((result: any) => {
                    return Promise.resolve(result as RemoveObject);
                }).catch(err => {
                    return Promise.resolve(err + '');
                });
            }
        });
    }
    toObject(user: any): IUser {
        return user.toObject() as IUser;
    }
}
