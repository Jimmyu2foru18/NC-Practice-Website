import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Plane, FileText, Home, Droplets, Heart, GraduationCap, BookOpen, Truck, Key, Gavel, Umbrella, Coffee, ExternalLink, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'residents' | 'business' | 'visitors'>('residents');
  const navigate = useNavigate();

  const categories = {
    residents: [
      { name: 'Utilities', icon: Droplets, items: ['Water Authority', 'Sewer Districts', 'Power Outages', 'Recycling Schedule'] },
      { name: 'Health & Safety', icon: Heart, items: ['Public Clinics', 'Mental Health', 'Emergency Prep', 'Mosquito Control'] },
      { name: 'Education', icon: GraduationCap, items: ['School Districts', 'Community College', 'Adult Education'] },
      { name: 'Libraries', icon: BookOpen, items: ['Find a Library', 'Digital Catalog', 'Events'] },
      { name: 'Housing', icon: Home, items: ['Affordable Housing', 'Tenant Resources', 'Property Tax Exemptions'] },
      { name: 'Transportation', icon: Truck, items: ['NICE Bus Schedules', 'LIRR Stations', 'Road Work'] },
    ],
    business: [
      { name: 'Licensing', icon: Key, items: ['Business Licenses', 'Liquor Licenses', 'Contractor Consumer Affairs'] },
      { name: 'Permits & Zoning', icon: FileText, items: ['Building Permits', 'Land Use', 'Zoning Maps'] },
      { name: 'Resources', icon: Briefcase, items: ['Economic Development', 'Chamber of Commerce', 'Bids & RFP'] },
    ],
    visitors: [
      { name: 'Attractions', icon: Umbrella, items: ['Beaches', 'County Parks', 'Museum Row', 'Coliseum'] },
      { name: 'Dining & Stay', icon: Coffee, items: ['Restaurant Guide', 'Hotel Directory'] },
      { name: 'Transport', icon: Plane, items: ['Airports', 'Train Maps', 'Parking Info'] },
    ]
  };

  const handleLinkClick = (e: React.MouseEvent, item: string) => {
      e.preventDefault();
      
      if (item === 'School Districts') {
          navigate('/schools');
          return;
      }

      // Perform a functional search for the service in Nassau County
      const query = encodeURIComponent(`${item} Nassau County NY`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block py-1 px-3 bg-blue-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-700">Online Portal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif">Services</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Connecting you to the resources you need, efficiently and transparently.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex justify-center space-x-2 max-w-2xl mx-auto mb-16">
          {(['residents', 'business', 'visitors'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 rounded-lg font-bold text-sm sm:text-base capitalize transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md transform -translate-y-1' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab === 'residents' && <User className="w-5 h-5" />}
              {tab === 'business' && <Briefcase className="w-5 h-5" />}
              {tab === 'visitors' && <Plane className="w-5 h-5" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories[activeTab].map((cat) => (
            <div key={cat.name} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{cat.name}</h3>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item}>
                    <a 
                        href="#" 
                        onClick={(e) => handleLinkClick(e, item)}
                        className="text-slate-600 hover:text-blue-600 flex items-center justify-between text-base group/link p-2 rounded hover:bg-slate-50 transition"
                    >
                      <span className="flex items-center">
                         <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-3 group-hover/link:bg-amber-400 transition-colors"></span>
                         {item}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity text-slate-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action for Support */}
        <div className="mt-20 bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10"><User className="w-64 h-64 -mb-10 -mr-10" /></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3">Can't find what you're looking for?</h3>
            <p className="text-blue-200 text-lg">Our support team is available Mon-Fri, 9am - 5pm.</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
             <a href="#/contact" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg text-center">Contact Support</a>
             <button onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()} className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition text-center backdrop-blur-sm">Open AI Assistant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;