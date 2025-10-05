import React from 'react';
import { Bot, User, ImageIcon } from 'lucide-react';

/**
 * Message Bubble Component
 * 
 * Individual message display with:
 * - Different styling for user vs AI messages
 * - Support for attachments (images, files)
 * - Timestamp display
 * - Responsive design
 */
const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-md'
            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 rounded-2xl rounded-bl-md border border-slate-200'
        } p-4 shadow-lg`}
      >
        <div className="flex items-start space-x-3">
          {/* AI Icon for AI messages */}
          {!isUser && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Message Content */}
          <div className="flex-1">
            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
            
            {/* Attachments */}
            {message.attachments && (
              <div className="mt-3 space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white/20 rounded-lg">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-xs">{attachment.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Timestamp */}
            <div className="text-xs opacity-70 mt-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          {/* User Icon for user messages */}
          {isUser && (
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;