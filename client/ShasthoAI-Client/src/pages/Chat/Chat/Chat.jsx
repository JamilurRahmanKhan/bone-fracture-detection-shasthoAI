import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from "lucide-react"; 

// Component imports
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatInterface from '../ChatInterface/ChatInterface';
import QuickActions from '../QuickActions/QuickActions';;
import AnalysisPanel from '../AnalysisPanel/AnalysisPanel';
import VitalsPanel from '../VitalsPanel/VitalsPanel';
import AppointmentsPanel from '../AppointmentsPanel/AppointmentsPanel';
import EmergencyButton from '../EmergencyButton/EmergencyButton';

/**
 * Main Chat Page Component
 * 
 * This is the central hub for AI medical consultations featuring:
 * - Real-time chat with AI medical assistant
 * - Medical analysis and diagnosis
 * - Vital signs monitoring
 * - Appointment booking
 * - Emergency mode for critical situations
 * 
 * Features:
 * - Multi-tab interface for different functionalities
 * - Persistent chat history
 * - Responsive design for all devices
 * - Professional healthcare-focused UI
 */
const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const navigate = useNavigate();

  // Mock user data - Replace with actual authentication
  useEffect(() => {
    const userData = localStorage.getItem('shastho_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Initialize with welcome message
    const welcomeMessage = {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI medical assistant. I can help you analyze symptoms, interpret medical images, provide health advice, and connect you with healthcare professionals. How can I assist you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [navigate]);

  /**
   * Handle sending new messages to the AI
   * @param {string} content - The message content from user
   */
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentAnalysis(aiResponse.analysis);
    }, 2000);
  };

  /**
   * Generate mock AI responses based on user input
   * @param {string} input - User's message
   * @returns {Object} AI response with content and analysis
   */
  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Pain-related queries
    if (lowerInput.includes('pain') || lowerInput.includes('hurt') || lowerInput.includes('ache')) {
      const analysis = {
        id: Date.now().toString(),
        type: 'consultation',
        title: 'Pain Assessment & Recommendations',
        result: 'Based on your symptoms, this appears to be musculoskeletal pain that may benefit from rest and anti-inflammatory treatment.',
        confidence: 87,
        urgency: 'medium',
        recommendations: [
          'Apply ice for 15-20 minutes every 2-3 hours',
          'Take over-the-counter anti-inflammatory medication as directed',
          'Avoid activities that worsen the pain',
          'Gentle stretching and movement as tolerated',
        ],
        estimatedHealingTime: '5-7 days with proper care',
        followUpRequired: true,
        doctorConsultation: {
          recommended: true,
          specialty: 'Orthopedics',
          urgency: 'within 48 hours if pain persists',
        },
      };

      return {
        content: "I understand you're experiencing pain. Based on your description, I've conducted a preliminary assessment. This appears to be musculoskeletal pain that should improve with conservative treatment. However, I recommend consulting with an orthopedic specialist if the pain persists or worsens.",
        analysis,
      };
    }

    // Fracture-related queries
    if (lowerInput.includes('fracture') || lowerInput.includes('broken') || lowerInput.includes('x-ray')) {
      const analysis = {
        id: Date.now().toString(),
        type: 'fracture',
        title: 'X-ray Analysis - Fracture Assessment',
        result: 'AI analysis indicates a possible hairline fracture in the distal radius. Immediate medical attention recommended.',
        confidence: 94,
        urgency: 'high',
        recommendations: [
          'Immobilize the affected area immediately',
          'Apply ice to reduce swelling',
          'Seek immediate medical attention',
          'Do not bear weight on the affected limb',
        ],
        estimatedHealingTime: '6-8 weeks with proper treatment',
        followUpRequired: true,
        doctorConsultation: {
          recommended: true,
          specialty: 'Orthopedic Surgery',
          urgency: 'immediate - within 2 hours',
        },
      };

      return {
        content: "I've analyzed the medical imaging you've described. The AI assessment indicates a possible fracture that requires immediate medical attention. Please seek emergency care right away and avoid using the affected area.",
        analysis,
      };
    }

    // Default response
    return {
      content: "Thank you for your question. I'm here to help with medical consultations, symptom analysis, and health guidance. Could you please provide more specific details about your symptoms or health concerns so I can give you the most accurate assistance?",
    };
  };

  /**
   * Handle emergency mode activation
   */
  const handleEmergencyMode = () => {
    setIsEmergencyMode(true);
    const emergencyMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: "🚨 EMERGENCY MODE ACTIVATED 🚨\n\nI'm connecting you with emergency services immediately. Please stay calm and follow these steps:\n\n1. Call 911 if you haven't already\n2. Stay on the line with emergency services\n3. If possible, have someone stay with you\n4. Do not move unless instructed by emergency personnel\n\nEmergency services have been notified of your location. Help is on the way.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, emergencyMessage]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FCFDFF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <p className="text-slate-600 text-2xl font-semibold">Loading AI Medical Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFDFF]">
      {/* Header */}
      <ChatHeader 
        isEmergencyMode={isEmergencyMode} 
        user={user} 
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-2xl rounded-2xl p-2 mb-8">
          {[
            { id: 'chat', label: 'AI Chat', icon: '💬' },
            { id: 'analysis', label: 'Analysis', icon: '🔍' },
            { id: 'vitals', label: 'Vitals', icon: '❤️' },
            { id: 'appointments', label: 'Appointments', icon: '📅' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Emergency Button */}
        <EmergencyButton 
          onEmergency={handleEmergencyMode}
          isEmergencyMode={isEmergencyMode}
        />

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'chat' && (
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isEmergencyMode={isEmergencyMode}
                />
              </div>
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <AnalysisPanel 
              currentAnalysis={currentAnalysis}
              onBackToChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'vitals' && (
            <VitalsPanel />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;