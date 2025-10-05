import React from "react";
import {
  Calendar,
  Video,
  Phone,
  MapPin,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

/**
 * AppointmentsTab Component
 *
 * Displays and manages healthcare appointments with responsive design.
 * Supports video, phone, and in-person appointment types with appropriate actions.
 *
 * @param {Object} props - Component props
 * @param {Array} props.appointments - Array of appointment objects
 * @param {string} props.appointments[].id - Unique appointment identifier
 * @param {string} props.appointments[].doctorName - Name of the healthcare provider
 * @param {string} props.appointments[].specialty - Medical specialty of the doctor
 * @param {string} props.appointments[].date - Appointment date
 * @param {string} props.appointments[].time - Appointment time
 * @param {string} props.appointments[].type - Type of appointment: "video" | "phone" | "in-person"
 * @param {string} props.appointments[].status - Appointment status: "scheduled" | "completed" | "cancelled" | "rescheduled"
 * @param {string} props.appointments[].location - Physical location (for in-person appointments)
 * @param {string} props.appointments[].notes - Additional appointment notes
 *
 * @returns {JSX.Element} Responsive appointments management interface
 */
const AppointmentsTab = ({ appointments }) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* 
        Main Appointments Container
        Contains header, description, and appointment cards
      */}
      <div
        className="
        border-0 
        shadow-lg lg:shadow-2xl 
        bg-white lg:bg-white/90 
        backdrop-blur-sm 
        rounded-xl lg:rounded-2xl 
        p-4 sm:p-5 lg:p-6
      "
      >
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h2
            className="
            text-xl sm:text-2xl lg:text-3xl 
            font-bold text-slate-900 
            flex items-center
            mb-2 sm:mb-3
          "
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 lg:mr-4 text-purple-600 flex-shrink-0" />
            Appointment Management
          </h2>
          <p
            className="
            text-sm sm:text-base lg:text-lg 
            text-slate-600
          "
          >
            Manage your healthcare appointments and consultations
          </p>
        </div>

        {/* 
          Appointments List
          Vertical stack of appointment cards with responsive layout
        */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="
                border border-slate-200 
                shadow-lg lg:shadow-xl 
                hover:shadow-xl lg:hover:shadow-2xl 
                transition-all duration-300 
                rounded-xl lg:rounded-2xl 
                p-4 sm:p-5 lg:p-6
              "
            >
              {/* 
                Appointment Card Content
                Flex layout that stacks on mobile, horizontal on larger screens
              */}
              <div
                className="
                flex 
                flex-col 
                lg:flex-row 
                lg:items-center 
                lg:justify-between 
                gap-4 sm:gap-5 lg:gap-6
              "
              >
                {/* Left Section - Appointment Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 flex-1">
                  {/* Appointment Type Icon */}
                  <div
                    className={`
                    w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                    rounded-lg sm:rounded-xl lg:rounded-2xl 
                    flex items-center justify-center 
                    shadow-md lg:shadow-lg 
                    flex-shrink-0
                    ${
                      appointment.type === "video"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : appointment.type === "phone"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                        : "bg-gradient-to-r from-purple-600 to-pink-600"
                    }
                  `}
                  >
                    {appointment.type === "video" ? (
                      <Video className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    ) : appointment.type === "phone" ? (
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    ) : (
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    )}
                  </div>

                  {/* Appointment Information */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="
                      text-lg sm:text-xl lg:text-xl 
                      font-bold text-slate-900 
                      mb-1
                    "
                    >
                      {appointment.doctorName}
                    </h3>

                    <p
                      className="
                      text-slate-600 font-medium 
                      text-sm sm:text-base
                      mb-2 sm:mb-3
                    "
                    >
                      {appointment.specialty}
                    </p>

                    {/* Appointment Metadata */}
                    <div
                      className="
                      flex 
                      flex-col 
                      sm:flex-row 
                      sm:items-center 
                      gap-2 sm:gap-4
                    "
                    >
                      <p
                        className="
                        text-xs sm:text-sm text-slate-500 
                        flex items-center
                      "
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        {appointment.date} at {appointment.time}
                      </p>

                      <span
                        className={`
                        px-2 py-1 sm:px-3 sm:py-1 
                        rounded-full 
                        text-xs sm:text-sm font-medium 
                        border
                        w-fit
                        ${
                          appointment.status === "scheduled"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      `}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    {/* Location (for in-person appointments) */}
                    {appointment.location && (
                      <p
                        className="
                        text-xs sm:text-sm text-slate-500 
                        flex items-center 
                        mt-1 sm:mt-2
                      "
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        {appointment.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* 
                  Right Section - Action Buttons
                  Stacked vertically, full width on mobile
                */}
                <div
                  className="
                  flex 
                  flex-col 
                  sm:flex-row 
                  lg:flex-col 
                  gap-2 
                  w-full 
                  sm:w-auto 
                  lg:w-48 
                  flex-shrink-0
                "
                >
                  {appointment.status === "scheduled" && (
                    <>
                      {/* Primary Action Button */}
                      <button
                        className="
                        bg-gradient-to-r from-blue-600 to-indigo-600 
                        hover:from-blue-700 hover:to-indigo-700 
                        text-white font-medium 
                        py-2 px-3 sm:py-2 sm:px-4 
                        rounded-lg 
                        transition-all duration-200 
                        flex items-center justify-center
                        text-sm sm:text-base
                      "
                      >
                        {appointment.type === "video" ? (
                          <>
                            <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                            Join Call
                          </>
                        ) : appointment.type === "phone" ? (
                          <>
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                            Call Doctor
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                            Get Directions
                          </>
                        )}
                      </button>

                      {/* Secondary Action Button */}
                      <button
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
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        Reschedule
                      </button>
                    </>
                  )}

                  {appointment.status === "completed" && (
                    <button
                      className="
                      border border-emerald-200 
                      hover:bg-emerald-50 
                      text-emerald-600 font-medium 
                      py-2 px-3 sm:py-2 sm:px-4 
                      rounded-lg 
                      transition-all duration-200 
                      flex items-center justify-center
                      text-sm sm:text-base
                    "
                    >
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      View Report
                    </button>
                  )}
                </div>
              </div>

              {/* 
                Appointment Notes
                Collapsible notes section that appears below main content
              */}
              {appointment.notes && (
                <div
                  className="
                  mt-3 sm:mt-4 
                  p-3 
                  bg-slate-50 
                  rounded-lg lg:rounded-xl
                "
                >
                  <p
                    className="
                    text-xs sm:text-sm text-slate-600 font-medium
                  "
                  >
                    Notes: {appointment.notes}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* 
            New Appointment Button
            Full-width call-to-action with hover effects
          */}
          <button
            className="
            w-full 
            bg-gradient-to-r from-purple-600 to-pink-600 
            hover:from-purple-700 hover:to-pink-700 
            text-white font-semibold 
            py-3 sm:py-4 
            rounded-xl lg:rounded-2xl 
            transition-all duration-300 
            transform hover:-translate-y-1 
            shadow-lg lg:shadow-xl 
            hover:shadow-xl lg:hover:shadow-2xl 
            text-base sm:text-lg
            flex items-center justify-center
          "
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
            Book New Appointment
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTab;
