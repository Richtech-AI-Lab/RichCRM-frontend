import React, { useEffect, useState, useContext, useRef } from "react";
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../constants/imagePath";
import { responseSchema, updateCasesTool, fetchCasesByKeywordTool, updateClientTool } from "./tools";
import { SlDislike, SlLike } from "react-icons/sl";
import { LangchainContext } from "./langchainContext";
import BubbleLoader from "../../components/bubbleLoader";

const ChatBox = () => {
  const { openaiAPIKey, setOpenaiAPIKey } = useContext(LangchainContext);
  const prompt = [
    ['system', 'You are an assistant helping housing lawyers with their cases, please use RichCRM API tools with the informations from the chat to help them query case infomations, creating new cases, updating case details, and managing their contacts.'],
    ['placeholder', '{chat_history}'],
    ['human', '{input}'],
    ['placeholder', '{agent_scratchpad}']
  ];
  const [agentExecutor, setAgentExecutor] = useState(null);
  const tools = [updateCasesTool, fetchCasesByKeywordTool, updateClientTool];
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(""); // New state to track input value
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const llm = new ChatOpenAI({
      openAIApiKey: openaiAPIKey,
      model: "gpt-4",
      temperature: 0,
    });
    const agent = createToolCallingAgent({
      llm,
      tools,
      prompt: ChatPromptTemplate.fromMessages(prompt),
      outputParser: new JsonOutputParser(responseSchema),
    });
    const executor = new AgentExecutor({
      agent,
      tools,
    });
    setAgentExecutor(executor);
  }, []);

  const handleSendMessage = async (message) => {
    setMessages([...messages,
    { text: message, role: "human" },
    { text: "loader...", role: "agent", loader: "true" }
    ]);
    const response = await agentExecutor.invoke({
      input: message,
      chat_history: chatHistory,
    });
    console.log("Response from agent:", response);

    setChatHistory([...chatHistory, new HumanMessage(message), new AIMessage(response.output)]);
    setMessages([...messages,
    { text: message, role: "human" },
    { text: response.output, role: "agent", loader: "false" }
    ]);

  };

  const handleSendMessageFromInput = () => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue.trim());
      setInputValue(""); // Clear input after sending
    }
  };
  console.log(messages, "message")
  return (
    <div className="card">
      <div className="msg_box">
        <div className="msg-box-head flex justify-between">
          <div className="col-span-2">
            <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">AI Assistant</p>
          </div>
          <div className="col-span-2">
            <BsThreeDotsVertical className="text-lg opacity-40" />
          </div>
        </div>
        <div ref={scrollRef}
          className="msg-box-cnt overflow-y-auto">
          {messages.map((msg, index) => {
            if (msg.role === "human") {
              return (
                <div key={index} className={`y-msg flex justify-end`}>
                  <p className="text-secondary-800 font-normal rounded-[50px] px-[25px] py-[10px] bg-gray-100 mb-[30px]">
                    {msg.text}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={index} className="agt-msg flex gap-3 pr-[10px] pb-[20px]">
                  <div className="ag-img" style={{minWidth: '37px'}}>
                    <img src={IMAGES.contact_avtar} alt="Profile" className="mr-3 rounded-full" />
                  </div>
                  {msg.loader == "true" ? <BubbleLoader loading={true} /> :
                    <div className="ag-msg">
                      <p className="text-[16px] text-secondary-800 font-normal pb-[20px]">
                        {msg.text}
                      </p>
                      <div className="like-dislike flex gap-3 mt-[5px]">
                        <SlLike className="text-lg opacity-40" />
                        <SlDislike className="text-lg opacity-40" />
                        <BsThreeDotsVertical className="text-lg opacity-40" />
                      </div>
                    </div>}
                </div>
              );
            }
          })}
        </div>

        <div className="chat-box rounded-[24px] p-[10px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessageFromInput();
            }}
          >
            <div className="type-msg">
              <textarea
                placeholder="Ask AI Assistant for any help!"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessageFromInput();
                  }
                }}
              ></textarea>
            </div>
            <div className="msg-act flex justify-between">
              <div className="col-span-2">
                <button className="atched shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium flex">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.125 3.94186V12.375C13.125 14.6532 11.2782 16.5 9 16.5C6.72183 16.5 4.875 14.6532 4.875 12.375V4.25C4.875 2.73122 6.10622 1.5 7.625 1.5C9.14378 1.5 10.375 2.73122 10.375 4.25V12.3343C10.375 13.0937 9.75939 13.7093 9 13.7093C8.24061 13.7093 7.625 13.0937 7.625 12.3343V4.98837"
                      stroke="#366093"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Attach
                </button>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  className="bg-primary text-base text-white py-[10px] px-6 rounded-[100px] ml-4"
                  onClick={handleSendMessageFromInput}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
