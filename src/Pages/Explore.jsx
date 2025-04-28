import React, { useState } from 'react';
import { 
  Book, Compass, Search, User, MessageSquare, BarChart2, 
  Calendar, BookOpen, Award,  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function ExplorePage() {
  const [activeTab, setActiveTab] = useState('discover');
  const navigator = useNavigate()
  
  const navigateTabs = [
    { id: 'discover', name: 'Discover', icon: <Compass size={20} /> },
    { id: 'library', name: 'Library', icon: <Book size={20} /> },
    { id: 'chat', name: 'Chatbot', icon: <MessageSquare size={20} /> },
    { id: 'profile', name: 'Profile', icon: <User size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-white pt-40 px-4 md:px-8 pb-16 ">
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <header className="mb-10 animate-fade-down">
          <h1 className="text-3xl md:text-4xl font-bold text-[#A594F9] text-center mb-6">
            Explore Your Digital World
          </h1>
          
         
          
          {/* Navigation Tabs */}
          <nav className="mt-8">
            <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-2 md:justify-center">
              {navigateTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 md:px-6 md:py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-[#A594F9] text-white shadow-md transform -translate-y-1' 
                      : 'bg-[#F5EFFF] text-[#A594F9] hover:bg-[#E5D9F2]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {/* Featured Section */}
          <section className="mb-12 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Digital Library */}
              <div className="bg-gradient-to-br from-[#F5EFFF] to-[#E5D9F2] rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white/70 p-3 rounded-xl">
                    <BookOpen size={24} className="text-[#A594F9]" />
                  </div>
                  <span className="bg-[#CDC1FF] text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
                </div>
                <h2 className="text-xl font-bold text-[#A594F9] mb-2">Digital Library</h2>
                <p className="text-gray-700 mb-4">Access thousands of books across various genres. Read anywhere, anytime.</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center"><Book size={16} className="mr-1" /> 10,000+ Books</span>
                  <span className="flex items-center"><User size={16} className="mr-1" /> 5,000+ Readers</span>
                </div>
                <button onClick={()=>navigator("/Books")} className="w-full bg-white text-[#A594F9] font-medium py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  Browse Library
                </button>
              </div>
              
              {/* Chatbot Assistant */}
              <div className="bg-gradient-to-br from-[#F5EFFF] to-[#E5D9F2] rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white/70 p-3 rounded-xl">
                    <MessageSquare size={24} className="text-[#A594F9]" />
                  </div>
                  <span className="bg-[#A594F9] text-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                </div>
                <h2 className="text-xl font-bold text-[#A594F9] mb-2">Outlaw Chatbot</h2>
                <p className="text-gray-700 mb-4">Get instant answers, summaries, and research assistance with our AI-powered chatbot.</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center"><MessageSquare size={16} className="mr-1" /> 24/7 Support</span>
                  <span className="flex items-center"><Star size={16} className="mr-1" /> 4.9 Rating</span>
                </div>
                <button onClick={()=> navigator("/AI")} className="w-full bg-white text-[#A594F9] font-medium py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  Start Chatting
                </button>
              </div>
              
              {/* Progress Tracker */}
              <div className="bg-gradient-to-br from-[#F5EFFF] to-[#E5D9F2] rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white/70 p-3 rounded-xl">
                    <BarChart2 size={24} className="text-[#A594F9]" />
                  </div>
                  <span className="bg-[#CDC1FF] text-white px-3 py-1 rounded-full text-sm font-medium">Trending</span>
                </div>
                <h2 className="text-xl font-bold text-[#A594F9] mb-2">Profile</h2>
                <p className="text-gray-700 mb-4">Track your reading habits, set goals, and monitor your achievements.</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center"><Calendar size={16} className="mr-1" /> Daily Stats</span>
                  <span className="flex items-center"><Award size={16} className="mr-1" /> Personal Goals</span>
                </div>
                <button onClick={()=> navigator("/my-profile")} className="w-full bg-white text-[#A594F9] font-medium py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  View Progress
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      {/* Animation Styles */}
  
    </div>
  )
}

export default ExplorePage;