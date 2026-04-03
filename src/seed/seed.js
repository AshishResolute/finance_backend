import bcrypt from "bcrypt";
import db from "../database/db.js";

const seed = async () => {
  const adminHashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const analystHashedPassword = await bcrypt.hash(process.env.ANALYST_PASSWORD, 10);

  const insertValue = await db.query(
    `insert into users(username,email,hashed_password,role) values('admin','admin@finance.com',$1,'admin'),('analyst','analyst@finance.com',$2,'analyst')`,
    [adminHashedPassword, analystHashedPassword],
  );
  if (insertValue.rowCount === 0) return console.log(`Seeding failed`);
  console.log("Seeded admin and analyst successfully");
  process.exit()
};


seed()