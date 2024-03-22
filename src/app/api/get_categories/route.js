import { NextResponse } from "next/server";
import axios from "axios";
import * as fs from "fs";
import path from "path";
import { FILE_NAME, CATEGORIES } from "@/constants/constants";

export const filePath = path.join(process.cwd(), "data", FILE_NAME);
export const filePathNewText = path.join(
  process.cwd(),
  "new-data",
  "categories",
  CATEGORIES
);

const authData = {
  username: process.env.U_NAME,
  password: process.env.U_PSS,
};

const toString = (data) => {
  return data
    .map(
      ({ id, name }, indx) =>
        `Какие товары у вас есть? name: ${name}, id: ${id}${
          indx === data.length - 1 ? "." : ";"
        }\n`
    )
    .join("");
};

export const GET = async (req, res) => {
  const categoriesFromDatabase = await axios.get(
    process.env.BASE_URL + "products/categories",
    {
      auth: authData,
    }
  );

  const attributesFromDatabase = await axios.get(
    process.env.BASE_URL + "products/attributes",
    {
      auth: authData,
    }
  );

  const data = {
    categories: categoriesFromDatabase.data.map(({ id, name }) => ({
      name,
      id,
    })),
    attributes: attributesFromDatabase.data.map(({ id, name }) => ({
      name,
      id,
    })),
  };

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  if (!fs.existsSync(path.dirname(filePathNewText))) {
    fs.mkdirSync(path.dirname(filePathNewText), { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data));
  fs.writeFileSync(filePathNewText, `${toString(categoriesFromDatabase.data)}`);

  return NextResponse.json({
    status: 200,
    message: data,
  });
};
