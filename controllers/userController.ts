import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.json({ error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error(`No users under id: ${id}`);

    res.json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailExists = await User.findOne({ where: { email: body.email } });

    if (emailExists)
      throw new Error(
        `There is a user already registered under ${body.email}.`
      );

    const user = User.build(body); //build prepara el objecto

    await user.save(); //save lo guarda

    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      msg: 'contact Admin',
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error(`No user under specified id: ${id}`);

    await user.update(body);

    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      msg: 'contact Admin',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error(`No user under specified id: ${id}`);

    await user.update({ estado: false });

    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      msg: 'contact Admin',
    });
  }
};
