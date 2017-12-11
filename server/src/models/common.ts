import { IUser } from '../models';
export interface Coordinate {
    latitude: number;
    longtitde: number;
}

export interface Location {
    address: String;
    coordinate: Coordinate;
}
export interface SaltAndPass {
    hashPass: String;
    salt: String;
}

export interface Payload {
    user: IUser;
    token: String;
}

export interface RemoveObject {
    n: Number;
    ok: Number;
}

export interface IError {
    statusCode: number;
    message: string;
}

