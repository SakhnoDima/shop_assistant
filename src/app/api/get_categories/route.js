import { NextResponse } from "next/server";
import axios from "axios";
import * as fs from "fs";
import path from "path";
import { FILE_NAME } from "@/constants/constants";

export const filePath = path.join(process.cwd(), "src", "tmp", FILE_NAME);

const authData = {
  username: process.env.U_NAME,
  password: process.env.U_PSS,
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

  const categoriesData = categoriesFromDatabase.data.map(({ id, name }) => ({
    name,
    id,
  }));

  const attributesData = attributesFromDatabase.data.map(({ id, name }) => ({
    name,
    id,
  }));

  const data = {
    categories: categoriesData,
    attributes: attributesData,
  };

  // if (!fs.existsSync(path.dirname(filePath))) {
  //   fs.mkdirSync(path.dirname(filePath), { recursive: true });
  // }

  // fs.writeFileSync(filePath, JSON.stringify(data));

  return NextResponse.json({
    status: 200,
    message: JSON.stringify(data),
  });
};
