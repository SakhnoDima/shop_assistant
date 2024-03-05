"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import FilterIcon from "@/../public/filterIcon.png";
import Product from "@/components/product/Product";
import { getProducts, setFetching } from "@/store/slices/products-slice";
import s from "./shop.module.scss";
import Filter from "@/components/filter/Filter";
import SkeletonForShop from "@/components/sceleton_for_shop/SkeletonForShop";
import ChoiceCategory from "@/components/choice_category/ChoiceCategory";
import { getNewProducts } from "@/store/slices/newProdThunk/thunkProd";
import { getAllCategories } from "@/store/slices/allCategories/getAllCategories";
import { productsSelectors } from "@/store/slices/newProdThunk/selectors";
import { ThemeProvider } from "@/helpers/hooks/useFiltersContext";

import { assistant } from "@/app/api/assistant/assistant";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, isFetching, totalCount, isLoading, categoryLoading } =
    productsSelectors();

  useEffect(() => {
    dispatch(getAllCategories());
    // assistant();
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      dispatch(getProducts());
    }
  }, [isFetching]);

  const scrollHandle = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          400 &&
        products.length < totalCount
      ) {
        dispatch(setFetching(true));
      }
    },
    [products, totalCount]
  );

  useEffect(() => {
    document.addEventListener("scroll", scrollHandle);

    return function () {
      document.removeEventListener("scroll", scrollHandle);
    };
  }, [scrollHandle]);

  return (
    <ThemeProvider>
      <div className={s.shop_page}>
        <ChoiceCategory />
        <div className={s.products}>
          {products.map((product) => (
            <div key={product.id}>
              <Product info={product} />
            </div>
          ))}
          {isLoading ? <SkeletonForShop count={totalCount ? 5 : 10} /> : ""}
        </div>

        <Filter />
      </div>
    </ThemeProvider>
  );
};

export default Shop;
