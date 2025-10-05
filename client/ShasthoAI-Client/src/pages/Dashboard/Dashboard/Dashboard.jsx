import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import DashboardHeader from '../DashboardHeader/DashboardHeader';
import WelcomeSection from '../WelcomeSection/WelcomeSection';
import StatsCards from '../StatsCards/StatsCards';
import DashboardTabs from '../DashboardTabs/DashboardTabs';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("shastho_user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Sample static data for frontend
    const sampleHistory = [
      {
        id: "1",
        date: "2024-01-15",
        type: "image",
        query: "X-ray analysis for wrist pain after fall",
        result: "No fracture detected - Minor soft tissue injury",
        hasFracture: false,
        confidence: 94,
        status: "completed",
        urgency: "low",
        doctorReviewed: true,
      }
    ];

    const sampleHealthMetrics = {
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 98.6,
      weight: 70,
      height: 175,
      bmi: 22.9,
      oxygenSaturation: 98,
      glucoseLevel: 95,
      cholesterol: 180,
      lastUpdated: new Date(),
    };

    const sampleAppointments = [
      {
        id: "1",
        doctorName: "Dr. Sarah Johnson",
        specialty: "Orthopedic Surgery",
        date: "2024-01-20",
        time: "2:30 PM",
        type: "video",
        status: "scheduled",
        notes: "Follow-up for knee injury",
      }
    ];

    const sampleMedications = [
      {
        id: "1",
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Twice daily",
        startDate: "2024-01-10",
        endDate: "2024-01-24",
        prescribedBy: "Dr. Sarah Johnson",
        status: "active",
        instructions: "Take with food to avoid stomach irritation",
        sideEffects: ["Stomach upset", "Dizziness"],
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setAnalysisHistory(sampleHistory);
      setHealthMetrics(sampleHealthMetrics);
      setAppointments(sampleAppointments);
      setMedications(sampleMedications);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) return null;

  const queryUsagePercentage = ((user.queryCount || 2) / 5) * 100;
  const remainingQueries = Math.max(0, 5 - (user.queryCount || 2));
  const upcomingAppointments = appointments.filter((apt) => apt.status === "scheduled").length;
  const activeMedications = medications.filter((med) => med.status === "active").length;

  return (
    <div className="min-h-screen bg-[#FCFDFF]">
      {/* <DashboardHeader user={user} /> */}
      
      <div className="container mx-auto px-6 py-10">
        <WelcomeSection user={user} healthMetrics={healthMetrics} />
        
        <StatsCards 
          user={user}
          queryUsagePercentage={queryUsagePercentage}
          remainingQueries={remainingQueries}
          upcomingAppointments={upcomingAppointments}
          activeMedications={activeMedications}
        />
        
        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          healthMetrics={healthMetrics}
          appointments={appointments}
          medications={medications}
          analysisHistory={analysisHistory}
        />
      </div>
    </div>
  );
};

export default Dashboard;