import { exec } from 'child_process';
import { PrismaClient, ConsumableType } from '@prisma/client';
import { dishes } from './dishes';

const prisma = new PrismaClient();

async function main() {
  const dbExists = await checkIfDbExists();
  if (!dbExists) {
    console.log("Database doesn't exist, creating one...");
    await createDatabase();
    console.log("Database created with success");
    console.log("Running migrations...");
    await runMigrations();
    console.log("Migrations applied with success");
  } else {
    console.log("Database already exists");
  }

  const isEmpty = await checkIfDbIsEmpty();
  if (isEmpty) {
    console.log("Populating database...");
    await seedDatabase();
    console.log("Database populated with success");
  } else {
    console.log("Database already populated");
  }
}

async function checkIfDbExists(): Promise<boolean> {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    return false;
  }
}

async function createDatabase() {
  await prisma.$disconnect();
  await executeCommand('createdb -U grizzly -h localhost multipedidosDb');
  await prisma.$connect();
}

async function runMigrations() {
  return new Promise<void>((resolve, reject) => {
    exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration error: ${error}`);
        return reject(error);
      }
      console.log(`Migration stdout: ${stdout}`);
      console.error(`Migration stderr: ${stderr}`);
      resolve();
    });
  });
}

async function executeCommand(command: string) {
  return new Promise<void>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
}

async function checkIfDbIsEmpty() {
  const count = await prisma.consumableEntity.count();
  return count === 0;
}

async function seedDatabase() {
  for (const dish of dishes) {
    await prisma.consumableEntity.create({
      data: {
        name: dish.name,
        description: dish.description,
        price: dish.price,
        type: dish.type as ConsumableType,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
