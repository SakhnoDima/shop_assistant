import { NextResponse } from "next/server";
import axios from "axios";
import * as fs from "fs";
import path from "path";

export const fileName = "databaseData.txt";
export const filePath = path.join(process.cwd(), "data", fileName);

const authData = {
  username: process.env.U_NAME,
  password: process.env.U_PSS,
};

export const GET = async (req, res) => {
  const dataFromDatabase = await axios.get(
    process.env.BASE_URL + "products/categories",
    {
      auth: authData,
    }
  );

  const categoriesData = dataFromDatabase.data.map(({ id, name }) => ({
    name,
    id,
  }));

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(categoriesData));

  return NextResponse.json({
    status: 200,
    message: "Data is successfully saved",
  });
};
