import OpenAI from 'openai';
import { Request, Response } from 'express';
import { Beta } from 'openai/resources';
import { Assistants } from 'openai/resources/beta/assistants/assistants';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'OpenAI-Beta': 'Assistants=v1',
  },
});

export const thread = async () => {
  const assistant = await openai.beta.assistants.create({
    name: 'Math Tutor',
    instructions:
      'You are a personal pet detective. Answer questions related to lost pets.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-3.5-turbo-1106',
  });
  return await openai.beta.threads.create();
};

export async function main(req: Request, res: Response) {
  const message = await openai.beta.threads.messages.create(
    'thread_69qBMcJBm474tD1XVvO6FBXa',
    {
      role: 'user',
      content: 'Hey, I lost my dog. Can you help me find it?',
    }
  );

  const threadMessages = await openai.beta.threads.messages.list(
    'thread_69qBMcJBm474tD1XVvO6FBXa'
  );

  // const run = await openai.beta.threads.runs.create(
  //   'thread_69qBMcJBm474tD1XVvO6FBXa',
  //   {
  //     assistant_id: assistant.id,
  //   }
  // );

  // const runState = await openai.beta.threads.runs.retrieve(
  //   'thread_69qBMcJBm474tD1XVvO6FBXa',
  //   run.id
  // );
  const messages = await openai.beta.threads.messages.list(
    'thread_69qBMcJBm474tD1XVvO6FBXa'
  );
  res.send(messages);
  // console.log(emptyThread);
}
