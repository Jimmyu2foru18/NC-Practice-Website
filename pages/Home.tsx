import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, FileText, Bus, ChevronRight, AlertTriangle, ArrowRight, Sun, CloudRain, ExternalLink, Loader, Search, MapPin, Calendar, Landmark, Info } from 'lucide-react';
import { generateSafetyAlert, fetchRealNews } from '../services/geminiService';
import { NewsItem } from '../types';

const Home: React.FC = () => {
  const [safetyAlert, setSafetyAlert] = useState<string>('Checking for active advisories...');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    generateSafetyAlert().then(setSafetyAlert);
    
    fetchRealNews().then(items => {
        setNews(items);
        setLoadingNews(false);
    });
  }, []);

  const quickLinks = [
    { icon: CreditCard, label: 'Pay Taxes', path: '/services', desc: 'Property & General' },
    { icon: FileText, label: 'Records', path: '/services', desc: 'Deeds & Vital' },
    { icon: Landmark, label: 'Permits', path: '/services', desc: 'Building & Business' },
    { icon: Bus, label: 'Transit', path: '/transportation', desc: 'Bus, Rail & Air' },
    { icon: MapPin, label: 'Parks', path: '/map', desc: 'Find a Destination' },
  ];

  return (
    <div className="flex flex-col font-sans bg-white">
      {/* Alert Banner */}
      <div className="bg-amber-500 text-blue-950 px-4 py-2 flex items-center justify-center text-sm font-medium shadow-sm relative z-30">
        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="mr-2 font-bold uppercase tracking-wider text-xs">Advisory:</span>
        <span className="truncate">{safetyAlert}</span>
        <Link to="/news" className="underline hover:text-white text-xs ml-3 font-bold">View Details</Link>
      </div>

      {/* Modern Government Hero */}
      <section className="relative bg-blue-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1560170433-1087796d8339?q=80&w=2069&auto=format&fit=crop"
            alt="Nassau County Architecture" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800/90"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight font-serif">
              Official Portal of <br/>
              <span className="text-amber-400">Nassau County, NY</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 font-light leading-relaxed">
              Connecting 1.3 million residents to government services, <br className="hidden md:block"/> community resources, and public safety information.
            </p>

            {/* Central Service Search */}
            <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-2 transform hover:scale-[1.01] transition-transform duration-300">
               <div className="flex-1 flex items-center px-4 w-full h-14">
                 <Search className="w-6 h-6 text-slate-400 mr-3" />
                 <input 
                   type="text" 
                   placeholder="I need help with..." 
                   className="w-full h-full outline-none text-slate-700 text-lg placeholder:text-slate-400 bg-transparent"
                   onFocus={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()}
                 />
               </div>
               <button 
                  onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md h-14 flex items-center justify-center"
               >
                 Search
               </button>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
               <span className="opacity-70">Popular:</span>
               <button onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()} className="hover:text-white underline decoration-amber-400 decoration-2 underline-offset-4">Jury Duty</button>
               <button onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()} className="hover:text-white underline decoration-amber-400 decoration-2 underline-offset-4">Building Permits</button>
               <button onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()} className="hover:text-white underline decoration-amber-400 decoration-2 underline-offset-4">Civil Service Exams</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Bar */}
      <section className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 divide-x divide-slate-200">
            {quickLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path}
                className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-white transition-colors cursor-pointer"
              >
                <link.icon className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2 transition-colors" />
                <span className="text-slate-700 font-bold text-sm group-hover:text-blue-900 text-center">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
         <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: News & Updates */}
            <div className="lg:w-2/3">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center">
                    <span className="w-2 h-8 bg-amber-400 mr-3 rounded-sm"></span>
                    Latest News
                  </h2>
                  <Link to="/news" className="text-blue-600 font-bold hover:text-blue-800 flex items-center text-sm">
                    View Newsroom <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
               </div>

               <div className="space-y-6">
                {loadingNews ? (
                    <div className="flex flex-col items-center justify-center h-48 bg-slate-50 rounded-xl border border-slate-100">
                        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                        <p className="text-slate-500 font-medium text-sm">Fetching updates...</p>
                    </div>
                ) : (
                    news.slice(0, 4).map((item, idx) => (
                      <div key={item.id || idx} className="flex flex-col sm:flex-row gap-6 group bg-white border-b border-slate-100 pb-6 last:border-0">
                        <div className="sm:w-1/3 h-48 sm:h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                             <img 
                                src={`https://picsum.photos/seed/${idx}news/400/300`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                alt="News Thumbnail" 
                             />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{item.source}</span>
                             <span className="text-slate-300">•</span>
                             <span className="text-xs text-slate-500">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition leading-snug font-serif">
                            <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-3">
                             {item.summary}
                          </p>
                          {item.url && (
                             <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs font-bold flex items-center hover:underline">
                                 Read Full Story <ExternalLink className="w-3 h-3 ml-1" />
                             </a>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Right Column: Services & Info */}
            <div className="lg:w-1/3 space-y-8">
               {/* Executive Card */}
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                     <img src="https://picsum.photos/seed/politician/100/100" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" alt="Executive" />
                     <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">County Executive</p>
                        <h3 className="text-lg font-bold text-slate-900 font-serif">Bruce Blakeman</h3>
                     </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                     "We are committed to making Nassau County safer, more affordable, and economically vibrant for all families."
                  </p>
                  <Link to="/government" className="block w-full text-center py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-sm hover:bg-slate-100 transition">
                     Government Directory
                  </Link>
               </div>

               {/* Calendar Widget */}
               <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif flex items-center"><Calendar className="w-5 h-5 mr-2 text-amber-500" /> Upcoming Events</h3>
                  <ul className="space-y-4">
                    {[
                      { d: '04', m: 'NOV', title: 'Legislative Meeting' },
                      { d: '11', m: 'NOV', title: 'Veterans Day Parade' },
                      { d: '24', m: 'NOV', title: 'Thanksgiving Closures' }
                    ].map((e, i) => (
                       <li key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors -mx-2">
                          <div className="bg-blue-50 text-blue-800 rounded-lg px-3 py-1 text-center min-w-[3.5rem]">
                             <span className="block text-xs font-bold">{e.m}</span>
                             <span className="block text-lg font-black">{e.d}</span>
                          </div>
                          <span className="font-bold text-slate-700 text-sm group-hover:text-blue-700">{e.title}</span>
                       </li>
                    ))}
                  </ul>
                  <Link to="/events" className="mt-4 inline-block text-xs font-bold text-blue-600 hover:underline">View Full Calendar</Link>
               </div>

               {/* Weather Mini */}
               <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                   <CloudRain className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-20" />
                   <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <p className="text-blue-200 text-xs font-bold uppercase">Mineola, NY</p>
                            <p className="text-3xl font-bold">58°F</p>
                         </div>
                         <Sun className="w-8 h-8 text-amber-300" />
                      </div>
                      <p className="text-sm text-blue-100">Partly Cloudy. High of 62°.</p>
                   </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Footer Banner */}
      <div className="bg-slate-100 py-12 border-t border-slate-200">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-4">Need Assistance?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
               <Link to="/contact" className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition shadow-sm">
                  Contact Departments
               </Link>
               <Link to="/emergency" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-sm flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 mr-2" /> Emergency Info
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;