import { NextFunction, Request, Response } from 'express';
import { main, thread } from '../oai/init';
import dbInitFunction from '../models';
import { nextTick } from 'process';
const db = dbInitFunction();

const User = db?.user;

export const oai = (req: Request, res: Response) => {
  main(req, res);
};

export const createThread = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const thread_id = await thread();
  await User!.update({ thread_id: thread_id.id }, { where: { user_id } });
  res.send(thread_id);
};

export const isUserThread = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const user = await User!.findOne({ where: { user_id: user_id } });

  if (user!.thread_id) {
    res.send({ thread: true });
  } else {
    res.send({ thread: false });
  }
};
