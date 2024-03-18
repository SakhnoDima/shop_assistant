import axios from "axios";

const Brand = async () => {
  const foo = async () => {
    try {
      const resMess = await axios.get(
        `https://main.d1ec9vk8kzbx8u.amplifyapp.com/api/get_categories`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resMess.data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const res = await foo();
  return <div>{res}</div>;
};

export default Brand;
