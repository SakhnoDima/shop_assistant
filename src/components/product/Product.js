import s from "./Product.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Size, SizeShop } from "@/components/product_page/ProductPageComponent";

const Product = ({ info }) => {
  // const [isVisible, setVisible] = useState(true);
  // const [sizeAddToBag, setSizeAddToBag] = useState("");

  return (
    <Link
      href={`shop/${info.id}`}
      className={s.product}
      key={info.id}
      // onMouseEnter={() => setVisible(false)}
      // onMouseLeave={() => setVisible(true)}
    >
      {/* {isVisible ? (
        <Image
          src={info.images[0].src}
          alt={""}
          className={s.product_photo}
          width={452}
          height={452}
          placeholder={"blur"}
          blurDataURL={"nothingtosay322.pythonanywhere.com"}
        />
      ) : (
        <Image
          src={info.images[0].src}
          alt={""}
          className={s.product_photo}
          width={452}
          height={452}
          placeholder={"blur"}
          blurDataURL={"nothingtosay322.pythonanywhere.com"}
        />
      )} */}

      <Image
        src={info.images[0].src}
        alt={info.name}
        className={s.product_photo}
        width={452}
        height={452}
        placeholder={"blur"}
        blurDataURL={"nothingtosay322.pythonanywhere.com"}
      />
      <h2 className={s.product_name}>{info.name}</h2>
      <p className={s.product_price}>₴{info.price}</p>
    </Link>
  );
};
export default Product;
