import { useSelector } from "react-redux";

export const productsSelectors = () => {
  const { products, isFetching, totalCount, isLoading } = useSelector(
    (state) => state.products
  );

  return { products, isFetching, totalCount, isLoading };
};
