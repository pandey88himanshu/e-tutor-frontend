"use client";

import { useState } from "react";
import { FaSearch, FaPlus, FaEllipsisH, FaPaperclip, FaPaperPlane, FaArrowLeft } from "react-icons/fa";

// Mock conversations data
const mockConversations = [
    { id: "1", name: "Jane Cooper", avatar: "", lastMessage: "Yeah sure, tell me zafor", time: "just now", unread: false, active: true },
    { id: "2", name: "Jenny Wilson", avatar: "", lastMessage: "Thank you so much, sir", time: "2d", unread: false, active: false },
    { id: "3", name: "Marvin McKinney", avatar: "", lastMessage: "You're Welcome", time: "1m", unread: true, active: false },
    { id: "4", name: "Eleanor Pena", avatar: "", lastMessage: "Thank you so much, sir", time: "1m", unread: true, active: false },
    { id: "5", name: "Ronald Richards", avatar: "", lastMessage: "Sorry, I can't help you", time: "2m", unread: false, active: false },
    { id: "6", name: "Kathryn Murphy", avatar: "", lastMessage: "new message", time: "2m", unread: true, active: false },
    { id: "7", name: "Jacob Jones", avatar: "", lastMessage: "Thank you so much, sir", time: "6m", unread: false, active: false },
    { id: "8", name: "Cameron Williamson", avatar: "", lastMessage: "It's okay, no problem brother, I will fix everythin...", time: "6m", unread: false, active: false },
    { id: "9", name: "Arlene McCoy", avatar: "", lastMessage: "Thank you so much, sir", time: "9m", unread: false, active: false },
    { id: "10", name: "Dianne Russell", avatar: "", lastMessage: "You're Welcome", time: "9m", unread: false, active: false },
];

// Mock messages for the active conversation
const mockMessages = [
    { id: "1", sender: "them", text: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊", time: "Time", isToday: true },
    { id: "2", sender: "me", text: "Hello, Good Evening.", time: "Time", isToday: false },
    { id: "3", sender: "me", text: "I'm Zafor", time: "Time", isToday: false },
    { id: "4", sender: "me", text: "I only have a small doubt about your lecture. can you give me some time for this?", time: "Time", isToday: false },
    { id: "5", sender: "them", text: "Yeah sure, tell me zafor", time: "Time", isToday: false },
];

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: boolean;
    active: boolean;
}

const MessageContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
    const [messageInput, setMessageInput] = useState("");
    const [conversations, setConversations] = useState(mockConversations);
    const [showChatOnMobile, setShowChatOnMobile] = useState(false);

    // Get initials from name
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Handle selecting a conversation
    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setConversations(prev => prev.map(c => ({
            ...c,
            active: c.id === conversation.id
        })));
        // On mobile, show the chat view
        setShowChatOnMobile(true);
    };

    // Handle back button on mobile
    const handleBackToList = () => {
        setShowChatOnMobile(false);
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Add message logic here
            setMessageInput("");
        }
    };

    return (
        <div className="w-full bg-white min-h-[600px]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex bg-white border border-[rgb(var(--gray-200))] rounded-lg overflow-hidden min-h-[600px]">

                    {/* Left Panel - Conversations List */}
                    <div className={`
                        w-full md:w-80 flex-shrink-0 md:border-r border-[rgb(var(--gray-200))] flex flex-col
                        ${showChatOnMobile ? 'hidden md:flex' : 'flex'}
                    `}>
                        {/* Header */}
                        <div className="p-4 border-b border-[rgb(var(--gray-200))]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-[rgb(var(--gray-900))]">Message</h3>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[rgb(var(--primary-500))] text-white rounded body-sm-500 hover:bg-[rgb(var(--primary-600))] transition-colors">
                                    <FaPlus className="text-xs" />
                                    Compose
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                />
                            </div>
                        </div>

                        {/* Conversations List */}
                        <div className="flex-1 overflow-y-auto">
                            {conversations.filter(c =>
                                c.name.toLowerCase().includes(searchQuery.toLowerCase())
                            ).map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => handleSelectConversation(conversation)}
                                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${conversation.active
                                            ? "bg-[rgb(var(--primary-100))]"
                                            : "hover:bg-[rgb(var(--gray-50))]"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-[rgb(var(--warning-200))] flex items-center justify-center">
                                            <span className="body-sm-600 text-[rgb(var(--warning-700))]">
                                                {getInitials(conversation.name)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="body-sm-600 text-[rgb(var(--gray-900))] truncate">
                                                {conversation.name}
                                            </span>
                                            <span className="body-xs-400 text-[rgb(var(--gray-500))] flex-shrink-0 ml-2">
                                                {conversation.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <p className="body-xs-400 text-[rgb(var(--gray-500))] truncate flex-1">
                                                {conversation.lastMessage}
                                            </p>
                                            {conversation.unread && (
                                                <span className="w-2 h-2 rounded-full bg-[rgb(var(--primary-500))] flex-shrink-0" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel - Chat View */}
                    <div className={`
                        flex-1 flex flex-col
                        ${showChatOnMobile ? 'flex' : 'hidden md:flex'}
                    `}>
                        {selectedConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--gray-200))]">
                                    <div className="flex items-center gap-3">
                                        {/* Back button - Mobile only */}
                                        <button
                                            onClick={handleBackToList}
                                            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgb(var(--gray-100))] transition-colors"
                                        >
                                            <FaArrowLeft className="text-[rgb(var(--gray-600))]" />
                                        </button>

                                        <div className="w-10 h-10 rounded-full bg-[rgb(var(--warning-200))] flex items-center justify-center">
                                            <span className="body-sm-600 text-[rgb(var(--warning-700))]">
                                                {getInitials(selectedConversation.name)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="body-md-600 text-[rgb(var(--gray-900))]">
                                                {selectedConversation.name}
                                            </h4>
                                            <p className="body-xs-400 text-[rgb(var(--success-500))]">Active Now</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgb(var(--gray-100))] transition-colors">
                                        <FaEllipsisH className="text-[rgb(var(--gray-500))]" />
                                    </button>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Today Divider */}
                                    <div className="flex justify-center">
                                        <span className="px-3 py-1 bg-[rgb(var(--gray-100))] rounded-full body-xs-400 text-[rgb(var(--gray-500))]">
                                            Today
                                        </span>
                                    </div>

                                    {/* Messages */}
                                    {mockMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {message.sender === 'them' && (
                                                <div className="flex items-start gap-2 max-w-[85%] md:max-w-[70%]">
                                                    <div className="w-8 h-8 rounded-full bg-[rgb(var(--warning-200))] flex items-center justify-center flex-shrink-0">
                                                        <span className="body-xs-600 text-[rgb(var(--warning-700))]">
                                                            {getInitials(selectedConversation.name)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="body-xs-400 text-[rgb(var(--gray-500))] mb-1">{message.time}</p>
                                                        <div className="bg-[rgb(var(--gray-100))] rounded-lg rounded-tl-none p-3">
                                                            <p className="body-sm-400 text-[rgb(var(--gray-700))]">{message.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {message.sender === 'me' && (
                                                <div className="max-w-[85%] md:max-w-[70%]">
                                                    <p className="body-xs-400 text-[rgb(var(--gray-500))] mb-1 text-right">{message.time}</p>
                                                    <div className="bg-[rgb(var(--primary-500))] rounded-lg rounded-tr-none p-3">
                                                        <p className="body-sm-400 text-white">{message.text}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-[rgb(var(--gray-200))]">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgb(var(--gray-100))] transition-colors flex-shrink-0">
                                            <FaPaperclip className="text-[rgb(var(--gray-500))]" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Type your message"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 px-4 py-2.5 border border-[rgb(var(--gray-200))] rounded-lg body-sm-400 text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-[rgb(var(--primary-500))] text-white rounded-lg body-sm-500 hover:bg-[rgb(var(--primary-600))] transition-colors flex-shrink-0"
                                        >
                                            Send
                                            <FaPaperPlane className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-[rgb(var(--gray-500))]">Select a conversation to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageContent;
