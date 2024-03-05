"use client";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import s from "../../shop.module.scss";

import { BASE_URL, authData } from "@/constants/constants";
import Product from "@/components/product/Product";
import { useEffect, useState } from "react";

const FilteredResultPage = async () => {
  const [products, setProducts] = useState([]);
  let { id } = useParams();
  id = +id;

  if (!id) {
    redirect("/shop");
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BASE_URL + `products?category=${id}`, {
          auth: authData,
        });
        setProducts([...res.data]);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <div className={s.products}>
          {products.map((product) => (
            <div key={product.id}>
              <Product info={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={s.empty_box}>
          <p>Don't have result</p>
          <Link className={s.link} href="/shop">
            Go to main
          </Link>
        </div>
      )}
    </>
  );
};

export default FilteredResultPage;
