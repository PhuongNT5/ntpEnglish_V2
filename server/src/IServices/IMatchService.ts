import { IMatch, RemoveObject, IError } from '../models';
export interface IMatchService {
    createMatch(newMatch: IMatch): Promise<IMatch>;
    updateMatch(match: IMatch): Promise<IMatch>;
    deleteMatch(id: string): Promise<RemoveObject>;
    find(): Promise<IMatch[] | IError>;//find all
    findMatchByUser(email: string): Promise<IMatch[] | IError>;
    findMatchInMonth(id: string): Promise<IMatch[] | IError>;
    // findMatch(query: object): Promise<IMatch[] | IError>;
}

