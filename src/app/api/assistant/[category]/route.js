import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

import { BASE_URL, authData } from "@/constants/constants";

export const getProductsByCategory = async (categories) => {
  const searchCategories = JSON.parse(categories);
  console.log(searchCategories.category);
  try {
    const res = await axios.get(BASE_URL + `products`, {
      params: {
        category: searchCategories.category,
      },
      auth: authData,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error.message || "Failed to fetch products", {
      status: error.response ? error.response.status : 500,
    });
  }
};

export const GET = async (request, response) => {
  const category = request.url
    .split("/")
    .slice(request.url.split("/").length - 1)[0];

  try {
    const res = await axios.get(BASE_URL + `products`, {
      params: {
        category: category,
      },
      auth: authData,
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error.message || "Failed to fetch products", {
      status: error.response ? error.response.status : 500,
    });
  }
};
