"use client";
import { redirect, usePathname } from "next/navigation";
import s from "./id.module.scss";
import { ProductInformation } from "@/components/product_page/ProductPage";
import { ImgForAlbum } from "@/components/product_page/ProductPageComponent";
import { productsSelectors } from "@/store/slices/newProdThunk/selectors";

const ProductPage = () => {
  const id = +usePathname().split("/").pop();

  const { products } = productsSelectors();

  const prod = products.find((prod) => prod.id === id);

  if (!prod) {
    redirect("/shop");
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(getProduct({id}))
  // }, []);

  return (
    <div className={s.product_page}>
      <div className={s.photo_album}>
        {prod?.images.map((prod, index) => (
          <ImgForAlbum prod={prod} key={index} />
        ))}
      </div>
      <div className={s.product_information_container}>
        <ProductInformation product={prod} />
      </div>
    </div>
  );
};
export default ProductPage;
