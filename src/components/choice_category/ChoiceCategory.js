import { useDispatch } from "react-redux";
import Image from "next/image";

import { categorySelectors } from "@/store/slices/allCategories/selectors";
import { useFiltersContext } from "@/helpers/hooks/useFiltersContext";
import FilterIcon from "@/../public/filterIcon.png";

import s from "./СhoiceСategory.module.scss";
import { getNewProducts } from "@/store/slices/newProdThunk/thunkProd";
import { useEffect } from "react";

const ChoiceCategory = () => {
  const { setFilters, filters, deleteIndex, closeFilterMenu } =
    useFiltersContext();
  const { categories } = categorySelectors();
  const dispatch = useDispatch();

  const ChoiceCategory = (name) => {
    const index = filters?.findIndex((el) => el === name);
    if (index === -1) {
      setFilters([...filters, name]);
    } else {
      deleteIndex(name);
    }
  };
  useEffect(() => {
    if (filters.length > 0) {
      let params = [];
      filters.forEach((element) => {
        const newArr = categories.find((el) => el.name === element);
        const { id } = newArr;
        params.push(id);
      });

      dispatch(getNewProducts(params.join(",")));
    } else if (filters.length === 0) {
      dispatch(getNewProducts(""));
    }
  }, [dispatch, filters]);
  return (
    <div className={s.categorys_list}>
      <Image
        src={FilterIcon}
        alt="FilterIcon"
        width={30}
        onClick={closeFilterMenu}
      />
      {categories?.map(({ name, id }) => (
        <p
          className={`${filters?.includes(name) ? s.filter_choses : ""}`}
          key={id}
          onClick={() => ChoiceCategory(name)}
        >
          {name}
        </p>
      ))}
    </div>
  );
};

export default ChoiceCategory;
