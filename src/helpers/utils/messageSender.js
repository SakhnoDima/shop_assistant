import { BASE_URL_MESSANGER, CHAT_ID } from "@/constants/constants";
import axios from "axios";

export const messageSender = async (userMessage) => {
  const message = `You have received a client message. Please contact the customer as quickly as possible. Email: ${userMessage.email}, Message: ${userMessage.message}`;
  const url = `${BASE_URL_MESSANGER}sendMessage?chat_id=${CHAT_ID}&text=${message}`;
  try {
    await axios.post(url);
    return "Your message was sent successful. Our manager will contact you soon";
  } catch (error) {
    console.log(error);
    return "Something went wrong try again later";
  }
};
