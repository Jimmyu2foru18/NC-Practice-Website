import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, FileText, Bus, Calendar, ChevronRight, AlertTriangle, ArrowRight, Sun, CloudRain, ExternalLink, Loader, Search, MapPin } from 'lucide-react';
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
    { icon: Shield, label: 'Public Safety', path: '/emergency', desc: 'Police & Alerts' },
    { icon: FileText, label: 'Public Records', path: '/services', desc: 'Deeds & Vital' },
    { icon: Bus, label: 'Transport', path: '/transportation', desc: 'Bus, Rail & Air' },
    { icon: MapPin, label: 'Destinations', path: '/map', desc: 'Parks & Beaches' },
  ];

  return (
    <div className="flex flex-col font-sans bg-slate-50">
      {/* Alert Banner */}
      <div className="bg-amber-400 text-blue-950 font-bold px-4 py-3 flex items-center justify-center text-sm shadow-md relative z-30">
        <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 text-blue-900" />
        <span className="truncate mr-2">{safetyAlert}</span>
        <Link to="/news" className="underline hover:text-white text-xs uppercase tracking-wider font-extrabold ml-auto sm:ml-2">Details</Link>
      </div>

      {/* Modern Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/nassaucountyhero2/1920/1080" 
            alt="Nassau County Coastline" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/50 to-slate-50/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center -mt-20">
          <div className="inline-flex items-center gap-2 py-1.5 px-5 bg-blue-900/40 backdrop-blur-md border border-blue-400/30 text-blue-100 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Official Government Portal
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg font-serif">
            Welcome to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">Nassau County</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Connecting 1.3 million residents to essential services, community resources, and the vibrant life of Long Island.
          </p>

          {/* Floating Search Hero */}
          <div className="max-w-3xl mx-auto relative group z-20">
            <button 
                onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()}
                className="w-full bg-white/95 backdrop-blur-xl text-left px-8 py-5 rounded-2xl shadow-2xl text-slate-500 flex items-center hover:bg-white hover:scale-[1.01] transition-all duration-300 border border-white/40 ring-4 ring-black/5"
            >
                <Search className="w-6 h-6 mr-4 text-blue-600" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-slate-700">How can we help you today?</span>
                    <span className="text-xs text-slate-400 font-medium">Try searching for "Permits", "Events", or "Pay Taxes"</span>
                </div>
                <div className="ml-auto flex items-center gap-3">
                   <span className="hidden md:inline-block text-xs font-bold text-slate-400 uppercase tracking-widest">Powered by AI</span>
                   <span className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition">
                      <ArrowRight className="w-5 h-5" />
                   </span>
                </div>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Quick Links - Overlapping Hero */}
      <section className="relative z-20 -mt-24 pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100">
            {quickLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path}
                className="group flex flex-col items-center justify-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                   <link.icon className="w-6 h-6" />
                </div>
                <span className="text-slate-900 font-bold text-sm">{link.label}</span>
                <span className="text-xs text-slate-500 mt-1 hidden lg:block">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Executive Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative group">
                <div className="absolute inset-0 bg-amber-400 rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
                <img 
                  src="https://picsum.photos/seed/nassauexecutive/800/600" 
                  alt="County Executive" 
                  className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[400px]"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur px-6 py-3 rounded-xl shadow-lg border-l-4 border-blue-600">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">County Executive</p>
                    <p className="text-xl font-bold text-slate-900 font-serif">Bruce Blakeman</p>
                </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center"><span className="w-8 h-0.5 bg-amber-600 mr-2"></span> Leadership</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-serif">Working for You</h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Nassau County is committed to transparency, fiscal responsibility, and accessibility. We are dedicated to maintaining our world-class parks, ensuring public safety, and fostering economic growth from the South Shore beaches to the North Shore estates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/history" className="flex items-center justify-between p-5 bg-white rounded-xl hover:bg-blue-50 hover:border-blue-200 transition border border-slate-200 shadow-sm group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-700">Our History</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </Link>
                 <Link to="/government" className="flex items-center justify-between p-5 bg-white rounded-xl hover:bg-blue-50 hover:border-blue-200 transition border border-slate-200 shadow-sm group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-700">Departments</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <img src="https://e7.pngegg.com/pngimages/876/46/png-clipart-freeport-suffolk-county-mineola-county-comptroller-others-emblem-logo.png" className="w-96 grayscale" alt="watermark" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 font-serif">Essential Services</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Access the most requested resources efficiently.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Residents', desc: 'Recycling schedules, library cards, and housing resources.', img: 'https://picsum.photos/seed/residents1/400/300' },
              { title: 'Business', desc: 'Permits, zoning, and economic development resources.', img: 'https://picsum.photos/seed/business1/400/300' },
              { title: 'Visitors', desc: 'Museums, beaches, parks and travel guides.', img: 'https://picsum.photos/seed/travel1/400/300' }
            ].map((item) => (
              <div key={item.title} className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">{item.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{item.desc}</p>
                  <Link to="/services" className="inline-flex items-center text-blue-700 font-bold hover:text-amber-600 transition-colors mt-auto">
                    Access Portal <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Weather */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* News Feed */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-10 border-b border-slate-200 pb-4">
                <div>
                   <h2 className="text-3xl font-extrabold text-slate-900 font-serif">Latest News</h2>
                   <p className="text-slate-500 mt-2">Updates from News12, Newsday, and Official Sources</p>
                </div>
                <Link to="/news" className="text-blue-700 font-bold hover:text-blue-900 mt-4 sm:mt-0 flex items-center bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow">View All News <ArrowRight className="w-4 h-4 ml-2"/></Link>
              </div>
              
              <div className="space-y-6">
                {loadingNews ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4 bg-white rounded-xl border border-slate-200">
                        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                        <p className="text-slate-500 font-medium">Fetching trusted news sources...</p>
                    </div>
                ) : (
                    news.slice(0, 5).map((item, idx) => (
                      <div key={item.id || idx} className="flex flex-col sm:flex-row gap-6 group bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg">
                        <div className="sm:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                             <img 
                                src={`https://picsum.photos/seed/news${idx}/200/200`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                alt="News Thumbnail" 
                             />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                             <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded border border-amber-100">{item.category}</span>
                             <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                {item.source}
                             </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition leading-snug">
                            <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                          </h3>
                          <div className="flex items-center justify-between mt-auto pt-2">
                             <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                             {item.url && (
                                 <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs font-bold flex items-center hover:underline bg-blue-50 px-3 py-1 rounded-full">
                                     Read Story <ExternalLink className="w-3 h-3 ml-1" />
                                 </a>
                             )}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Weather & Calendar Widget */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700"><CloudRain className="w-32 h-32" /></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center text-blue-100"><Sun className="w-4 h-4 mr-2 text-amber-300" /> Live Weather</h3>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-7xl font-black tracking-tighter">58°</span>
                      <p className="text-blue-100 font-medium text-lg mt-1 flex items-center"><MapPin className="w-4 h-4 mr-1"/> Mineola, NY</p>
                    </div>
                    <div className="text-right">
                        <div className="text-amber-300 font-bold text-xl mb-1">Partly Cloudy</div>
                        <div className="text-sm text-blue-100 font-mono bg-blue-900/30 px-2 py-1 rounded">H:62° L:45°</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-center text-xs border-t border-blue-500/50 pt-6">
                    <div>
                      <span className="block text-blue-200 mb-1">Humidity</span>
                      <span className="font-bold text-lg">45%</span>
                    </div>
                    <div>
                      <span className="block text-blue-200 mb-1">Wind</span>
                      <span className="font-bold text-lg">12 mph</span>
                    </div>
                    <div>
                      <span className="block text-blue-200 mb-1">Precip</span>
                      <span className="font-bold text-lg">0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center"><Calendar className="w-5 h-5 mr-2 text-amber-500" /> Upcoming Events</h3>
                    <Link to="/events" className="text-xs font-bold text-blue-600 hover:text-blue-800">View All</Link>
                </div>
                <ul className="space-y-6">
                  {[
                    { date: 'NOV 4', title: 'Legislative Session', time: '1:00 PM' },
                    { date: 'NOV 11', title: 'Veterans Day Ceremony', time: '11:00 AM' },
                    { date: 'NOV 30', title: 'Holiday Light Show', time: '5:00 PM' }
                  ].map((evt) => (
                    <li key={evt.title} className="flex items-start gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
                      <div className="bg-white border border-slate-200 rounded-xl p-2 text-center w-14 shadow-sm group-hover:border-blue-300 transition-colors">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">{evt.date.split(' ')[0]}</span>
                        <span className="block text-lg font-black text-slate-900 leading-none">{evt.date.split(' ')[1]}</span>
                      </div>
                      <div>
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors block text-sm mb-1">{evt.title}</span>
                          <span className="text-xs text-slate-500 block">{evt.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 py-3 border border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm flex items-center justify-center">
                    + Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;