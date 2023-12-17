import { Request, Response } from 'express';
import { main, thread } from '../oai/init';
import dbInitFunction from '../models';
const db = dbInitFunction();

const User = db?.user;

export const oai = (req: Request, res: Response) => {
  main(req, res);
};

export const createThread = async (req: Request, res: Response) => {
  const thread_id = await thread();
  const { user_id } = req.body;
  await User!.update({ thread_id: thread_id.id }, { where: { user_id: 1 } });
  res.send(thread_id);
};
