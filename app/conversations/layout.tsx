import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";

interface ConversationsLayoutProps {
    children: React.ReactNode;
}

async function ConversationsLayout({
    children
}: ConversationsLayoutProps) {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationsLayout
