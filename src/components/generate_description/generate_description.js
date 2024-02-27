import axios from "axios";
import s from "./generate_description.module.scss";
import { useState } from "react";

export const GenerateDescription = ({ keyWords, name, category }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isShowBtn, setShowBtn] = useState(true);

  const generateTextToImg = () => {
    return (
      "Please create an SEO description for this product, considering its name: " +
      name +
      ", category: " +
      category +
      ", photo, and the following key phrases: " +
      keyWords +
      ". Please include features, benefits, and any other important information for maximum optimization for search engines. 40-70 words"
    );
  };

  const text = generateTextToImg();

  const getDescription = async () => {
    setShowBtn(false);
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/generate_post_description",
        {
          text: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDescription(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDescription("Oops... Assistant is busy. Try again in a moment.");
    }
  };
  return (
    <>
      <div>
        {isShowBtn ? (
          <div
            className={s.btn_for_generate_description}
            onClick={getDescription}
          >
            generate description
          </div>
        ) : (
          ""
        )}

        <div className={s.description_block}>
          {isLoading ? "Loading..." : <div>{description}</div>}
        </div>
      </div>
    </>
  );
};
