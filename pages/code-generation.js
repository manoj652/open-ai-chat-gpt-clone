import { useState } from "react";
import { openai } from "../utils/openai";

function CodeGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [arrayOfData, setArrayOfData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      let resData = response.data.choices[0].text;
      setArrayOfData([
        ...arrayOfData,
        { sender: "user", data: prompt },
        { sender: "AI", data: resData },
      ]);
      setLoading(false);
      setPrompt("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-[#343440] h-screen  text-white">
      <div className=" h-[80vh] overflow-auto scrollbar-hide">
        {arrayOfData.map((item) => (
          <div
            className={`${item.sender == "AI" ? "bg-[#444755]" : ""} py-6 px-2`}
          >
            <p>{item.data}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-6  px-6">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-2"
        >
          <textarea
            value={prompt}
            className="bg-[#40404E] outline-none w-[70vw] p-2 rounded-md"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <button type="submit">
            {loading ? (
              "Sending"
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                className="h-9 w-9 rotate-90 "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CodeGenerationPage;
