export * from '../repositories/match.repository';
export * from '../repositories/pitch.repository';
export * from '../repositories/team.repository';
export * from '../repositories/user.repository';
import { IMatchRepository, IPitchRepository, ITeamRepository, IUserRepository } from '../IRepositories';
import { MatchRepository, PitchRepository, TeamRepository, UserRepository } from '../repositories';

class DBContext {
    private static instance: DBContext;
    private match: IMatchRepository;
    private team: ITeamRepository;
    private user: IUserRepository;
    private pitch: IPitchRepository;
    constructor() {
        this.match = new MatchRepository();
        this.pitch = new PitchRepository();
        this.team = new TeamRepository();
        this.user = new UserRepository();
    }

    public static getInstance() {
        if (!DBContext.instance) {
            DBContext.instance = new DBContext();
        }
        return DBContext.instance;
    }
    public getUser() {
        return this.user;
    }
    public getMatch() {
        return this.match;
    }
    public getTeam() {
        return this.team;
    }
    public getPitch() {
        return this.pitch;
    }

}
export const DBContextSingleton = DBContext.getInstance();
