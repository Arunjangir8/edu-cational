import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };
  
  return (
    <footer className="w-full" style={{ backgroundColor: '#F5EFFF' }}>
      {/* Top curved separator */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="none" className="w-full">
          <path d="M0 48H1440V0C1440 0 1088 48 720 48C352 48 0 0 0 0V48Z" fill="#F5EFFF" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#A594F9' }}>Company Name</h3>
            <p className="text-gray-600 mb-6">Providing quality education and resources to help you succeed in your learning journey.</p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full" style={{ backgroundColor: '#CDC1FF' }}>
                <Facebook size={18} color="#F5EFFF" />
              </a>
              <a href="#" className="p-2 rounded-full" style={{ backgroundColor: '#CDC1FF' }}>
                <Twitter size={18} color="#F5EFFF" />
              </a>
              <a href="#" className="p-2 rounded-full" style={{ backgroundColor: '#CDC1FF' }}>
                <Instagram size={18} color="#F5EFFF" />
              </a>
              <a href="#" className="p-2 rounded-full" style={{ backgroundColor: '#CDC1FF' }}>
                <Linkedin size={18} color="#F5EFFF" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#A594F9' }}>Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Courses', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ChevronRight size={16} style={{ color: '#A594F9' }} />
                    <span className="ml-2">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#A594F9' }}>Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} style={{ color: '#A594F9' }} className="mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">123 Education Street, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} style={{ color: '#A594F9' }} className="mr-3 flex-shrink-0" />
                <span className="text-gray-600">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} style={{ color: '#A594F9' }} className="mr-3 flex-shrink-0" />
                <span className="text-gray-600">info@companyname.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#A594F9' }}>Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and special offers.</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l w-full focus:outline-none border border-r-0"
                style={{ borderColor: '#CDC1FF', backgroundColor: '#E5D9F2' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="px-3 py-2 rounded-r flex items-center justify-center"
                style={{ backgroundColor: '#A594F9' }}
              >
                <Send size={18} color="#F5EFFF" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px my-8" style={{ backgroundColor: '#CDC1FF' }}></div>
        
        {/* Bottom copyright section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}