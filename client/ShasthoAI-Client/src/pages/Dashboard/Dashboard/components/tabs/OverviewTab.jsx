import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  MessageCircle, 
  ShoppingCart, 
  Video, 
  Upload,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  TrendingUp,
  Moon
} from 'lucide-react';

const OverviewTab = ({ healthMetrics }) => {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 flex items-center">
            <Zap className="w-8 h-8 mr-4 text-blue-600" />
            Quick Actions
          </h2>
          <p className="text-lg text-slate-600 mt-2">
            Access your most-used features instantly
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/chat"
            className="h-28 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex flex-col items-center justify-center space-y-3 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl text-white"
          >
            <MessageCircle className="w-10 h-10" />
            <span className="font-bold text-lg">AI Consultation</span>
          </Link>
          <Link
            to="/store"
            className="h-28 flex flex-col items-center justify-center space-y-3 border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
          >
            <ShoppingCart className="w-10 h-10 text-emerald-600" />
            <span className="font-bold text-lg text-emerald-600">Medical Store</span>
          </Link>
          <button className="h-28 flex flex-col items-center justify-center space-y-3 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl">
            <Video className="w-10 h-10 text-purple-600" />
            <span className="font-bold text-lg text-purple-600">Video Call Doctor</span>
          </button>
          <button className="h-28 flex flex-col items-center justify-center space-y-3 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl">
            <Upload className="w-10 h-10 text-orange-600" />
            <span className="font-bold text-lg text-orange-600">Upload Lab Results</span>
          </button>
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Vital Signs */}
        <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center mb-6">
            <Heart className="w-7 h-7 mr-3 text-red-600" />
            Vital Signs Overview
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
              <Heart className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <div className="text-3xl font-bold text-red-600 mb-1">{healthMetrics?.heartRate || 72} BPM</div>
              <div className="text-sm text-red-700 font-medium">Heart Rate</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block">
                Normal
              </span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <Activity className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-3xl font-bold text-blue-600 mb-1">{healthMetrics?.bloodPressure || "120/80"}</div>
              <div className="text-sm text-blue-700 font-medium">Blood Pressure</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block">
                Normal
              </span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
              <Thermometer className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <div className="text-3xl font-bold text-orange-600 mb-1">{healthMetrics?.temperature || 98.6}°F</div>
              <div className="text-sm text-orange-700 font-medium">Temperature</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block">
                Normal
              </span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
              <Droplets className="w-8 h-8 mx-auto mb-3 text-emerald-500" />
              <div className="text-3xl font-bold text-emerald-600 mb-1">{healthMetrics?.oxygenSaturation || 98}%</div>
              <div className="text-sm text-emerald-700 font-medium">Oxygen Sat</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block">
                Normal
              </span>
            </div>
          </div>
        </div>

        {/* Health Trends */}
        <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center mb-6">
            <TrendingUp className="w-7 h-7 mr-3 text-emerald-600" />
            Health Trends
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Weight Management</div>
                  <div className="text-sm text-slate-600">On track with goals</div>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                +2.5%
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Exercise Activity</div>
                  <div className="text-sm text-slate-600">150 min/week achieved</div>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Goal Met
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Sleep Quality</div>
                  <div className="text-sm text-slate-600">7.5 hours average</div>
                </div>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Excellent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;