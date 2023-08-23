import CreateChatbotForm from "./create-chatbot-form";
import ChatboxPreviewer from "./chatbox-previewer";

export default function NewChatbot() {
  return (
    <main className="container flex gap-16 py-16 items-start">
      <div className="w-96 max-lg:mx-auto">
        <h2 className="text-2xl font-bold mb-6">Let&apos;s create a Chatbot</h2>
        <CreateChatbotForm />
      </div>
      <div className="flex-1 bg-gradient-to-bl from-[#15B8FB] to-[#2563EB] rounded-2xl flex items-center justify-center py-16 max-lg:hidden">
        <ChatboxPreviewer />
      </div>
    </main>
  );
}
