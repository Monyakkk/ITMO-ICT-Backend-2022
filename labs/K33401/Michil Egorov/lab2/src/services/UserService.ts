import { User } from "../orm/models/User"
import {getConnection} from "typeorm";

class UserService {
    public async getById(id: number): Promise<User> {
        return await getConnection().getRepository(User).findOne({ where: { id: id } }).then((user) => {
            if (!user) {
                throw new Error(`User (id=${id}) does not exist`);
            }

            return user;
        });
    }

    public async getByEmail(email: string): Promise<User> {
        return await getConnection().getRepository(User).findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                throw new Error(`User (email=${email}) does not exist`);
            }

            return user;
        });
    }

    public async create(userData: {email: string, password: string}): Promise<User> {
        const userRepo = getConnection().getRepository(User);

        await userRepo.findOne({ where: { email: userData.email } }).then((user) => {
            if (user !== null) {
                throw new Error('User with such email already exists');
            }
        });

        // todo hash pass
        return userRepo.save(userData);
    }

    public async delete(id: number): Promise<void> {
        const user = await this.getById(id);
        await getConnection().getRepository(User).remove(user);
    }

    public async list(): Promise<User[]> {
        return await getConnection().getRepository(User).find();
    }

    public async update(userData: {id: number, email: string, password: string}): Promise<User> {
        const user = await this.getById(userData.id);
        try {
            await this.getByEmail(userData.email);
            throw new Error('email is already taken')
        } catch {
            return await getConnection().getRepository(User).save({
                id: user.id,
                ...userData
            });
        }
    }
}

export default UserService
