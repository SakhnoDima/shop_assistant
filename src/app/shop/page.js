"use client";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import Product from "@/components/product/Product";
import { getProducts, setFetching } from "@/store/slices/products-slice";
import s from "./shop.module.scss";
import Filter from "@/components/filter/Filter";
import SkeletonForShop from "@/components/sceleton_for_shop/SkeletonForShop";
import ChoiceCategory from "@/components/choice_category/ChoiceCategory";

import { getAllCategories } from "@/store/slices/all_categories/getAllCategories";
import { productsSelectors } from "@/store/slices/new_prod_thunk/selectors";
import { ThemeProvider } from "@/helpers/hooks/useFiltersContext";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, isFetching, totalCount, isLoading } = productsSelectors();

  useEffect(() => {
    dispatch(getAllCategories());
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
