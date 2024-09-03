import { IUser } from "../dto/user.dto";
import { userRepo } from "../repositories"

export const userService = {
    findById: async (id: string) => {
        return userRepo.findById(id);
    },

    create: async (id: string, name: string) => {
        // Create new user instance using data from parameters
        const user: IUser = {
            _id: id,
            name,
        };

        return userRepo.create(user);
    },

    update: async (id: string, name: string) => {
        // Create new user instance using data from parameters
        const user: IUser = {
            _id: id,
            name,
        };

        return userRepo.update(id, user);

    }
}