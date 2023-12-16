import dbInitFunction from '../models';

const db = dbInitFunction();

export function initial() {
  const Role: any = db && db.role;
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'moderator',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
}
