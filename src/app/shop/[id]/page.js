"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirect, useParams } from "next/navigation";

import s from "./id.module.scss";
import { ProductInformation } from "@/components/product_page/ProductPage";
import { ImgForAlbum } from "@/components/product_page/ProductPageComponent";
import { getProductById } from "@/store/slices/soloProduct-slice";
import { soloProdSelectors } from "@/store/slices/selectors";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { product, isLoading } = soloProdSelectors();

  let { id } = useParams();
  id = +id;

  if (!id) {
    redirect("/shop");
  }

  useEffect(() => {
    dispatch(getProductById({ id }));
  }, []);

  return (
    <div className={s.product_page}>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <div className={s.photo_album}>
            {product?.images?.map((prod, index) => (
              <ImgForAlbum prod={prod} key={index} />
            ))}
          </div>
          <div className={s.product_information_container}>
            <ProductInformation product={product} />
          </div>
        </>
      )}
    </div>
  );
};
export default ProductPage;
