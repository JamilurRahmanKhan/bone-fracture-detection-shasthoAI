import React from 'react';
import { FileText, ImageIcon, Video, Clipboard, MessageSquare, Eye, Download, Share, CheckCircle2 } from 'lucide-react';

/**
 * RecordsTab Component
 * 
 * Displays medical records and analysis history with responsive design.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.analysisHistory - Array of analysis objects
 * @param {string} props.analysisHistory[].id - Unique identifier
 * @param {string} props.analysisHistory[].date - Analysis date
 * @param {string} props.analysisHistory[].type - Analysis type: "image" | "video" | "lab" | "text"
 * @param {string} props.analysisHistory[].query - Analysis query
 * @param {string} props.analysisHistory[].result - Analysis result
 * @param {boolean} props.analysisHistory[].hasFracture - Fracture detection
 * @param {number} props.analysisHistory[].confidence - AI confidence percentage
 * @param {string} props.analysisHistory[].status - Analysis status
 * @param {string} props.analysisHistory[].urgency - Urgency level
 * @param {boolean} props.analysisHistory[].doctorReviewed - Doctor review status
 * 
 * @example
 * const analysisHistory = [
 *   {
 *     id: "1",
 *     date: "2024-01-15",
 *     type: "image",
 *     query: "X-ray analysis for wrist pain",
 *     result: "No fracture detected",
 *     hasFracture: false,
 *     confidence: 94,
 *     status: "completed",
 *     urgency: "low",
 *     doctorReviewed: true
 *   }
 * ];
 * 
 * <RecordsTab analysisHistory={analysisHistory} />
 */

const RecordsTab = ({ analysisHistory }) => {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Main Container */}
      <div className="border-0 shadow-lg sm:shadow-xl lg:shadow-2xl bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6">
        
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center mb-3 sm:mb-4 lg:mb-6">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mr-3 sm:mr-4 text-blue-600 flex-shrink-0" />
            Medical Records & Analysis History
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            Your complete medical history and AI analysis reports
          </p>
        </div>
        
        {analysisHistory.length === 0 ? (
          /* Empty State - Responsive */
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <FileText className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 text-slate-400 mx-auto mb-4 sm:mb-6 lg:mb-8" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-700 mb-3 sm:mb-4">
              No medical records yet
            </h3>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              Start your first AI medical analysis today
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
              Start Your First Analysis
            </button>
          </div>
        ) : (
          /* Records List - Responsive */
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {analysisHistory.map((analysis) => (
              <div 
                key={analysis.id} 
                className="
                  border border-slate-200/60 
                  shadow-lg sm:shadow-xl lg:shadow-xl 
                  hover:shadow-xl sm:hover:shadow-2xl lg:hover:shadow-2xl 
                  transition-all duration-500 
                  hover:-translate-y-0.5 sm:hover:-translate-y-1
                  rounded-xl sm:rounded-2xl 
                  p-4 sm:p-5 lg:p-6 xl:p-8
                "
              >
                {/* Header Row - Responsive Layout */}
                <div className="
                  flex 
                  flex-col 
                  lg:flex-row 
                  lg:items-start 
                  lg:justify-between 
                  gap-4 
                  sm:gap-5 
                  lg:gap-6 
                  mb-4 
                  sm:mb-5 
                  lg:mb-6
                ">
                  
                  {/* Left Section - Analysis Info */}
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                    
                    {/* Type Icon - Responsive Sizing */}
                    <div className={`
                      w-10 h-10 
                      sm:w-11 sm:h-11 
                      lg:w-12 lg:h-12 
                      rounded-lg 
                      sm:rounded-xl 
                      lg:rounded-2xl 
                      flex items-center justify-center 
                      shadow-md 
                      sm:shadow-lg 
                      flex-shrink-0
                      ${analysis.type === "image" ? "bg-gradient-to-r from-blue-600 to-indigo-600" :
                        analysis.type === "video" ? "bg-gradient-to-r from-purple-600 to-pink-600" :
                        analysis.type === "lab" ? "bg-gradient-to-r from-emerald-600 to-teal-600" :
                        "bg-gradient-to-r from-orange-600 to-red-600"}
                    `}>
                      {analysis.type === "image" ? (
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      ) : analysis.type === "video" ? (
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      ) : analysis.type === "lab" ? (
                        <Clipboard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      ) : (
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      
                      {/* Type Badge */}
                      <span className={`
                        px-2.5 py-1 
                        sm:px-3 sm:py-1
                        rounded-full 
                        text-xs 
                        sm:text-sm 
                        font-medium 
                        mb-2 
                        inline-block 
                        border
                        ${analysis.type === "image" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          analysis.type === "video" ? "bg-purple-100 text-purple-800 border-purple-200" :
                          analysis.type === "lab" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                          "bg-orange-100 text-orange-800 border-orange-200"}
                      `}>
                        {analysis.type === "image" ? "X-ray Analysis" :
                         analysis.type === "video" ? "Video Consultation" :
                         analysis.type === "lab" ? "Lab Results" : "Text Consultation"}
                      </span>

                      {/* Metadata Row - Responsive Layout */}
                      <div className="
                        flex 
                        flex-col 
                        sm:flex-row 
                        sm:items-center 
                        gap-2 
                        sm:gap-3
                      ">
                        <span className="text-xs sm:text-sm text-slate-500 font-medium">
                          {new Date(analysis.date).toLocaleDateString()}
                        </span>
                        
                        {/* Badges Container */}
                        <div className="flex flex-wrap items-center gap-2">
                          {analysis.urgency && (
                            <span className={`
                              px-2 py-1 
                              rounded-full 
                              text-xs 
                              font-medium 
                              border
                              ${analysis.urgency === "emergency" ? "bg-red-100 text-red-800 border-red-200 animate-pulse" :
                                analysis.urgency === "high" ? "bg-orange-100 text-orange-800 border-orange-200" :
                                analysis.urgency === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                "bg-green-100 text-green-800 border-green-200"}
                            `}>
                              {analysis.urgency.toUpperCase()}
                            </span>
                          )}
                          
                          {analysis.doctorReviewed && (
                            <span className="
                              bg-blue-100 
                              text-blue-800 
                              border border-blue-200 
                              px-2 py-1 
                              rounded-full 
                              text-xs 
                              font-medium
                              flex items-center
                            ">
                              <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" />
                              Doctor Reviewed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Action Buttons - Responsive Layout */}
                  <div className="
                    flex 
                    flex-row 
                    lg:flex-col 
                    items-center 
                    justify-center 
                    lg:items-end 
                    lg:justify-start
                    gap-2 
                    sm:gap-3
                    lg:gap-2
                    w-full 
                    lg:w-auto
                  ">
                    <button className="
                      text-slate-600 
                      hover:text-blue-600 
                      transition-colors 
                      flex items-center 
                      py-2 px-3
                      rounded-lg
                      hover:bg-blue-50
                      text-sm
                      sm:text-base
                    ">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </button>
                    
                    <button className="
                      text-slate-600 
                      hover:text-emerald-600 
                      transition-colors 
                      flex items-center 
                      py-2 px-3
                      rounded-lg
                      hover:bg-emerald-50
                      text-sm
                      sm:text-base
                    ">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline">Download</span>
                      <span className="sm:hidden">Download</span>
                    </button>
                    
                    <button className="
                      text-slate-600 
                      hover:text-purple-600 
                      transition-colors 
                      flex items-center 
                      py-2 px-3
                      rounded-lg
                      hover:bg-purple-50
                      text-sm
                      sm:text-base
                    ">
                      <Share className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline">Share</span>
                      <span className="sm:hidden">Share</span>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <h3 className="
                  text-lg 
                  sm:text-xl 
                  lg:text-xl 
                  font-bold 
                  text-slate-900 
                  mb-2 
                  sm:mb-3
                  leading-tight
                ">
                  {analysis.query}
                </h3>
                
                <p className="
                  text-slate-600 
                  mb-3 
                  sm:mb-4
                  leading-relaxed 
                  text-sm 
                  sm:text-base 
                  lg:text-lg
                ">
                  {analysis.result}
                </p>

                {/* Footer Metadata - Responsive Layout */}
                {analysis.hasFracture !== undefined && (
                  <div className="
                    flex 
                    flex-col 
                    sm:flex-row 
                    sm:items-center 
                    gap-3 
                    sm:gap-4 
                    lg:gap-6 
                    pt-3 
                    sm:pt-4 
                    border-t 
                    border-slate-200
                  ">
                    <span className={`
                      font-semibold 
                      px-2.5 py-1 
                      sm:px-3 sm:py-1
                      rounded-full 
                      text-sm 
                      border
                      w-fit
                      ${analysis.hasFracture ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200"}
                    `}>
                      {analysis.hasFracture ? "Fracture Detected" : "No Fracture Found"}
                    </span>
                    
                    {analysis.confidence && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm text-slate-500 font-medium">
                          AI Confidence:
                        </span>
                        <span className="
                          bg-blue-100 
                          text-blue-800 
                          border border-blue-200 
                          px-2 py-1 
                          rounded-full 
                          text-xs 
                          sm:text-sm 
                          font-medium
                        ">
                          {analysis.confidence}%
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        Status:
                      </span>
                      <span className={`
                        px-2 py-1 
                        rounded-full 
                        text-xs 
                        sm:text-sm 
                        font-medium 
                        border
                        ${analysis.status === "completed" ? "bg-green-100 text-green-800 border-green-200" :
                          analysis.status === "in-progress" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-gray-100 text-gray-800 border-gray-200"}
                      `}>
                        {analysis.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsTab;