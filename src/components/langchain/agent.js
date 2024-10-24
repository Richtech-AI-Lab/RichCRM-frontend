import React, { useEffect, useState } from "react";

import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { set } from "lodash";

import { responseSchema, updateCasesTool, getCasesByKeywordTool } from "./tools";

const LangChainAgent = () => {
    const prompt = [
        ['system', 'You are an assistant helping housing lawyers with their cases, please use RichCRM API tools with the informations from the chat to help them query case infomations, creating new cases, updating case details, and managing their contacts.'],
        ['placeholder', '{chat_history}'],
        ['human', '{input}'],
        ['placeholder', '{agent_scratchpad}']
    ]; // prompt ["system", "..."], ["human", "..."]
    const [agentExecutor, setAgentExecutor] = useState(null);
    const tools = [updateCasesTool, getCasesByKeywordTool];
    const [chatHistory, setChatHistory] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const llm = new ChatOpenAI({
            // openAIApiKey: "",
            model: "gpt-4o",
            temperature: 0,
        })
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
        const response = await agentExecutor.invoke({
            input: message,
            chat_history: chatHistory,
        });
        console.log("Response from agent:", response);

        setChatHistory([...chatHistory, new HumanMessage(message), new AIMessage(response.output)]);
        setMessages([...messages, {
            text: message,
            role: "human",
        },
        {
            text: response.output,
            role: "agent",
        }]);
    };

    return (
        <div>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 p-2 rounded ${msg.role === "human" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-300">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Type your message..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                                handleSendMessage(e.target.value.trim());
                                e.target.value = "";
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default LangChainAgent;