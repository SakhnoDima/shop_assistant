import { useSelector } from "react-redux";

export const soloProdSelectors = () => {
  const { product, isLoading } = useSelector((state) => state.product);
  return { product, isLoading };
};
