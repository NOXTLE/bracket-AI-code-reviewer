import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [code, setCode] = useState({ code: "", intent: "" });

  const [machine, setMachine] = useState();
  const callAPI = async () => {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAOJ158EIrfv0WU7HqK7x-_Er80_OXA-1Y`,
      {
        contents: [
          {
            parts: [
              {
                text: `you have to review the code provided ${code.code} with its purpose ${code.intent} and give a response in an object with following properties {rating , explanation, original code , refinedCode} leave refined code as refinedCode:"" if no issues.
                `,
              },
            ],
          },
        ],
      }
    );
    setMachine(
      JSON.parse(
        response.data.candidates[0].content.parts[0].text
          .replaceAll("```", "")
          .replace("json", "")
      )
    );
    console.log(machine);
  };
  return (
    <div className="bg-zinc-900  text-white w-full h-screen">
      <h1 className="h-[40px]  text-2xl flex items-center justify-center">
        {"< B R A C K E T / >"}
      </h1>
      <div className="flex max-sm:flex-col">
        <div className="bg-zinc-900 w-[50%] h-[calc(100vh-40px)] max-sm:w-full p-2">
          <div className="flex items-center justify-center pt-4">
            <input
              className="w-[50%] h-10 rounded p-2 bg-zinc-700 text-white"
              placeholder="Enter your Intent here"
              onChange={(e) => {
                setCode({ ...code, intent: e.target.value });
              }}
            ></input>
          </div>
          <textarea
            onChange={(e) => {
              setCode({ ...code, code: e.target.value });
            }}
            placeholder="Enter your code here"
            style={{ resize: "none" }}
            className="rounded-lg bg-zinc-700 text-white h-[85%] p-2 mt-4  w-full"
          ></textarea>
          <div className="flex items-center justify-center mt-1 ">
            <button
              onClick={() => callAPI()}
              className="bg-green-600 px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-green-700 "
            >
              Analyze
            </button>
          </div>
        </div>
        <div className="bg-zinc-700 h-[calc(100vh-40px)]  overflow-scroll w-[50%] max-sm:w-full max-sm:h-[100vh] p-4">
          {machine && (
            <div>
              <div className="flex items-center justify-center text-2xl gap-2 mb-10">
                <h1 className="text-center">CODE REPORT</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-data"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                  <path d="M9 17v-4" />
                  <path d="M12 17v-1" />
                  <path d="M15 17v-2" />
                  <path d="M12 17v-1" />
                </svg>
              </div>

              <div className="text-xl border-2 w-fit px-4 py-1 bg-slate-950 ">
                Rating : {machine.rating}/5{" "}
              </div>

              <div className="p-10  ">
                <h2 className="text-2xl mb-2">Explaination</h2>
                <p className="border-2 px-2 py-4 bg-zinc-950 text-xl">
                  {machine.explanation}
                </p>
              </div>
              <div className="text-2xl mb-2">original code</div>
              <p className="bg-slate-950 p-5 text-xl mb-10">
                {machine.originalCode}
              </p>
              <div className={`${machine.refinedCode ? "" : "hidden"}`}>
                <div className="text-2xl mb-2">Refined code</div>
                <p className="bg-slate-950 p-5 text-xl mb-10">
                  <p>{machine.refinedCode}</p>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
