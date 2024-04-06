import { useState } from "react";
import "./App.css";
import ChatInput from "./components/ChatInput";
import { Input, Modal, Spin } from "antd";
import { fetchText } from "./lib/api";
import { Message } from "./types/chat";
import { ChatMessage } from "./components/Message";

function App() {
  const [siteModal, setSiteModal] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState<null | string>(null);
  const [chatInputValue, setChatInputValue] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [aiLoading, setAILoading] = useState(false);

  return (
    <div className="w-full h-[95vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl">Scrapeanything</h1>
      <Modal
        open={siteModal}
        title="Pick website to scrape from"
        onOk={() => {
          if (urlInputValue) {
            setWebsiteUrl(urlInputValue);
            setSiteModal(false);
          }
        }}
        onCancel={() => setSiteModal(false)}
      >
        <Input
          placeholder="Website URL"
          onChange={(e) => setUrlInputValue(e.target.value)}
        />
      </Modal>
      <div className="w-full flex justify-center mt-2">
        <ChatInput
          value={chatInputValue}
          setValue={(value: string) => setChatInputValue(value)}
          toggleModal={() => setSiteModal(true)}
          websiteUrl={websiteUrl}
          onSubmit={async () => {
            setAILoading(true);
            setMessages((prev) => [
              ...prev,
              { content: chatInputValue, from: "user" },
            ]);
            setChatInputValue("");
            const response = await fetchText(urlInputValue, chatInputValue);
            if (response) {
              setMessages((prev) => [
                ...prev,
                { content: response, from: "ai" },
              ]);
              setAILoading(false);
            }
          }}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[60%]">
          {messages.length > 0 &&
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          <Spin spinning={aiLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
