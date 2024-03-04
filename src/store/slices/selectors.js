import { useSelector } from "react-redux";

export const soloProdSelectors = () => {
  const { product, isLoading, categoryLoading } = useSelector(
    (state) => state.product
  );

  return { product, isLoading, categoryLoading };
};
