import React, { useEffect, useState } from "react";
import { openai } from "../utils/openai";
const Image = () => {
  const [imageURL, setImageURL] = useState(
    "https://source.unsplash.com/random/1024x1024/?dog"
  );
  const [sizeOfImage, setSizeOfImage] = useState("1024x1024");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  let availableImageSize = ["1024x1024", "256x256", "512x512"];
  const getImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: sizeOfImage,
    });
    setImageURL(response.data.data[0].url);
    setLoading(false);
  };

  return (
    <div className=" bg-[#343440] h-screen  text-white ">
      <div className=" flex justify-center items-center p-10 ">
        <img src={imageURL} className="w-56 h-56" />
      </div>
      <div className="fixed bottom-10">
        <form className=" p-2 bg-[#343440] flex gap-2" onSubmit={getImage}>
          <select
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-[10vw]"
            onChange={(e) => setSizeOfImage(e.target.value)}
          >
            {availableImageSize.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <textarea
            type="text"
            className="w-[60vw] bg-[#40404E] p-2 rounded-md outline-none"
            placeholder="write details"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button type="submit">{loading ? "Generating..." : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default Image;
