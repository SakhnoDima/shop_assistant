import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import { categorySelectors } from "@/store/slices/allCategories/selectors";
import { useFiltersContext } from "@/helpers/hooks/useFiltersContext";
import FilterIcon from "@/../public/filterIcon.png";

import s from "./СhoiceСategory.module.scss";
import { getNewProducts } from "@/store/slices/newProdThunk/thunkProd";

import { LOCAL_KEY } from "@/constants/constants";

const ChoiceCategory = () => {
  const { filters, deleteIndex, closeFilterMenu, setFiltersData, setFilters } =
    useFiltersContext();
  const { categories } = categorySelectors();
  const dispatch = useDispatch();

  useEffect(() => {
    const filtersFromLocal = localStorage.getItem(LOCAL_KEY);
    setFilters(filtersFromLocal ? JSON.parse(filtersFromLocal) : []);
  }, []);

  useEffect(() => {
    console.log(filters);
    if (filters.length > 0) {
      console.log(filters?.map((el) => el.id).join(","));
      dispatch(getNewProducts(filters.map((el) => el.id).join(",")));
    } else if (filters.length === 0) {
      console.log(1);
      dispatch(getNewProducts(""));
    }
  }, [dispatch, filters]);

  const ChoiceCategory = (id, name) => {
    const index = filters?.findIndex((el) => el.id === id);

    if (index === -1) {
      setFiltersData(id, name);
    } else {
      deleteIndex(id);
    }
  };

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
          className={`${
            filters?.find((el) => el.id === id) ? s.filter_choses : ""
          }`}
          key={id}
          onClick={() => ChoiceCategory(id, name)}
        >
          {name}
        </p>
      ))}
    </div>
  );
};

export default ChoiceCategory;
