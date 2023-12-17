import { Request, Response } from 'express';
import { main, thread } from '../oai/init';
import dbInitFunction from '../models';

const db = dbInitFunction();
const User = db?.user;

export const oai = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const user = await User!.findOne({ where: { user_id: user_id } });
  const thread_id = user!.thread_id;
  const assistant_id = user!.assistant_id;
  const messages = await main(thread_id, assistant_id);
  console.log(messages);
  res.send(messages);
};

export const createThread = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const thread_id = (await thread()).thread.id;
  const assistant_id = (await thread()).assistant.id;
  await User!.update({ thread_id, assistant_id }, { where: { user_id } });
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
