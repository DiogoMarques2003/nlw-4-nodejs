import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {

    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body);
        } catch (e) {
            throw new AppError(e)
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExiste = await usersRepository.findOne({ email });

        if (userAlreadyExiste) {
            throw new AppError("User already exist!");
        }

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return res.status(201).json({ user });
    }

}

export { UserController };
