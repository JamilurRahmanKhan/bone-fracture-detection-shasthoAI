import React from 'react';
import { 
  Pill, 
  CheckCircle2, 
  Bell, 
  FileText, 
  Plus, 
  Sparkles,
  Clock,
  AlertTriangle
} from 'lucide-react';

/**
 * MedicationsTab Component
 * 
 * A responsive medication management interface that displays and manages
 * prescription medications with comprehensive details and actions.
 * 
 * Features:
 * - Responsive grid layout adapting to all screen sizes
 * - Medication cards with status indicators
 * - Interactive action buttons
 * - Side effects display
 * - Add new medication functionality
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.medications - Array of medication objects
 * @param {string} props.medications[].id - Unique medication identifier
 * @param {string} props.medications[].name - Name of the medication
 * @param {string} props.medications[].dosage - Dosage information
 * @param {string} props.medications[].frequency - Administration frequency
 * @param {string} props.medications[].startDate - Start date of medication
 * @param {string} props.medications[].endDate - End date of medication (optional)
 * @param {string} props.medications[].prescribedBy - Prescribing doctor's name
 * @param {string} props.medications[].status - Medication status: "active" | "completed" | "discontinued"
 * @param {string} props.medications[].instructions - Administration instructions
 * @param {Array} props.medications[].sideEffects - Array of potential side effects
 * 
 * @returns {JSX.Element} Responsive medication management interface
 * 
 * @example
 * const medications = [
 *   {
 *     id: "1",
 *     name: "Ibuprofen",
 *     dosage: "400mg",
 *     frequency: "Twice daily",
 *     startDate: "2024-01-10",
 *     endDate: "2024-01-24",
 *     prescribedBy: "Dr. Sarah Johnson",
 *     status: "active",
 *     instructions: "Take with food to avoid stomach irritation",
 *     sideEffects: ["Stomach upset", "Dizziness"]
 *   }
 * ];
 * 
 * <MedicationsTab medications={medications} />
 */

const MedicationsTab = ({ medications = [] }) => {
  /**
   * Get status badge styling based on medication status
   * @param {string} status - Medication status
   * @returns {Object} Tailwind CSS classes for the status badge
   */
  const getStatusStyles = (status) => {
    const baseStyles = "px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-200";
    
    switch (status) {
      case "active":
        return `${baseStyles} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case "completed":
        return `${baseStyles} bg-blue-50 text-blue-700 border-blue-200`;
      case "discontinued":
        return `${baseStyles} bg-gray-50 text-gray-700 border-gray-200`;
      default:
        return `${baseStyles} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  /**
   * Get medication type icon styling
   * @param {string} status - Medication status
   * @returns {Object} Tailwind CSS classes for the medication icon
   */
  const getMedicationIconStyles = (status) => {
    const baseStyles = "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 flex-shrink-0";
    
    switch (status) {
      case "active":
        return `${baseStyles} bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600`;
      case "completed":
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600`;
      default:
        return `${baseStyles} bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600`;
    }
  };

  /**
   * Format date string to localized format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Handle marking medication as taken
   * @param {string} medicationId - ID of the medication
   */
  const handleMarkTaken = (medicationId) => {
    console.log(`Marking medication ${medicationId} as taken`);
    // Implement actual mark taken logic here
  };

  /**
   * Handle setting medication reminder
   * @param {string} medicationId - ID of the medication
   */
  const handleSetReminder = (medicationId) => {
    console.log(`Setting reminder for medication ${medicationId}`);
    // Implement actual reminder logic here
  };

  /**
   * Handle viewing medication details
   * @param {string} medicationId - ID of the medication
   */
  const handleViewDetails = (medicationId) => {
    console.log(`Viewing details for medication ${medicationId}`);
    // Implement actual view details logic here
  };

  /**
   * Handle adding new medication
   */
  const handleAddMedication = () => {
    console.log('Opening add medication form');
    // Implement actual add medication logic here
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Main Container */}
      <div className="border-0 shadow-lg lg:shadow-2xl bg-white lg:bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6">
        
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center mb-2 sm:mb-3">
            <Pill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 lg:mr-4 text-emerald-600 flex-shrink-0" />
            Medication Management
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            Track your prescriptions and medication schedule
          </p>
        </div>

        {/* Medications List */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {medications.length === 0 ? (
            // Empty State
            <div className="text-center py-8 sm:py-12 lg:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Pill className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-700 mb-2 sm:mb-3">
                No Medications Found
              </h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
                You haven't added any medications yet. Start by adding your first prescription to track your medication schedule.
              </p>
            </div>
          ) : (
            medications.map((medication) => (
              <div
                key={medication.id}
                className="
                  border border-slate-200
                  shadow-lg lg:shadow-xl
                  hover:shadow-xl lg:hover:shadow-2xl
                  transition-all duration-300
                  rounded-xl lg:rounded-2xl
                  p-4 sm:p-5 lg:p-6
                "
              >
                {/* Medication Card Content */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-5 lg:gap-6">
                  
                  {/* Left Section - Medication Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 flex-1">
                    
                    {/* Medication Icon */}
                    <div className={getMedicationIconStyles(medication.status)}>
                      <Pill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>

                    {/* Medication Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                        <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-slate-900 truncate">
                          {medication.name}
                        </h3>
                        <span className={getStatusStyles(medication.status)}>
                          {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                        </span>
                      </div>

                      <p className="text-slate-600 font-medium text-sm sm:text-base mb-2">
                        {medication.dosage} • {medication.frequency}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                          Prescribed by {medication.prescribedBy}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span>
                          {formatDate(medication.startDate)}
                          {medication.endDate && ` - ${formatDate(medication.endDate)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Action Buttons */}
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    lg:flex-col
                    gap-2
                    w-full
                    sm:w-auto
                    lg:w-48
                    flex-shrink-0
                  ">
                    {/* Active Medication Actions */}
                    {medication.status === "active" && (
                      <>
                        <button
                          onClick={() => handleMarkTaken(medication.id)}
                          className="
                            bg-gradient-to-r from-emerald-500 to-teal-500
                            hover:from-emerald-600 hover:to-teal-600
                            text-white font-medium
                            py-2 px-3 sm:py-2 sm:px-4
                            rounded-lg
                            transition-all duration-200
                            flex items-center justify-center
                            text-sm sm:text-base
                            shadow-lg hover:shadow-xl
                          "
                        >
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                          Mark Taken
                        </button>

                        <button
                          onClick={() => handleSetReminder(medication.id)}
                          className="
                            border border-slate-200
                            hover:bg-slate-50
                            font-medium
                            py-2 px-3 sm:py-2 sm:px-4
                            rounded-lg
                            transition-all duration-200
                            flex items-center justify-center
                            text-sm sm:text-base
                            text-slate-700 hover:text-slate-900
                          "
                        >
                          <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                          Set Reminder
                        </button>
                      </>
                    )}

                    {/* View Details Button (Always Visible) */}
                    <button
                      onClick={() => handleViewDetails(medication.id)}
                      className="
                        border border-blue-200
                        hover:bg-blue-50
                        text-blue-600 font-medium
                        py-2 px-3 sm:py-2 sm:px-4
                        rounded-lg
                        transition-all duration-200
                        flex items-center justify-center
                        text-sm sm:text-base
                      "
                    >
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Instructions Section */}
                <div className="mt-4 p-3 sm:p-4 bg-slate-50 rounded-lg lg:rounded-xl">
                  <p className="text-sm text-slate-600 font-medium mb-2">
                    Instructions:
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {medication.instructions}
                  </p>
                </div>

                {/* Side Effects Section */}
                {medication.sideEffects && medication.sideEffects.length > 0 && (
                  <div className="mt-3 p-3 sm:p-4 bg-orange-50 rounded-lg lg:rounded-xl border border-orange-100">
                    <p className="text-sm text-orange-800 font-medium mb-2 flex items-center">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      Possible Side Effects:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {medication.sideEffects.map((effect, index) => (
                        <span
                          key={index}
                          className="
                            bg-orange-100 text-orange-700
                            border border-orange-200
                            px-2 py-1
                            rounded-full
                            text-xs
                            transition-colors duration-200
                            hover:bg-orange-200
                          "
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add New Medication Button */}
        <button
          onClick={handleAddMedication}
          className="
            w-full
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            text-white font-semibold
            py-3 sm:py-4
            rounded-xl lg:rounded-2xl
            transition-all duration-300
            transform hover:-translate-y-1
            shadow-lg lg:shadow-xl
            hover:shadow-xl lg:hover:shadow-2xl
            text-base sm:text-lg
            flex items-center justify-center
            mt-6 sm:mt-8
          "
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
          Add New Medication
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
};

export default MedicationsTab;