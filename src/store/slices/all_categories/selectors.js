import { useSelector } from "react-redux";

export const categorySelectors = () => {
  const { categories } = useSelector((state) => state.products);

  return { categories };
};
