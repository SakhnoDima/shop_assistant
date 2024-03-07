import { NextResponse } from "next/server";
import axios from "axios";

const authData = {
  username: process.env.U_NAME,
  password: process.env.U_PSS,
};

export const GET = async (req, res) => {
  console.log(process.env.BASE_URL);
  const categories = await axios.get(
    process.env.BASE_URL + "products/categories",
    {
      auth: authData,
    }
  );
  console.log(categories.data);
  return NextResponse.json("ok");
};
