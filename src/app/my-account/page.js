import { Loader } from "@/components/loader/Loader";

const MyAccount = () => {
  console.log(11);
  console.log(process.env.CURRENT_URL);
  return (
    <div>
      My account
      {process.env.CURRENT_URL}
    </div>
  );
};

export default MyAccount;
