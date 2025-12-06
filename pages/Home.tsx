import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, FileText, Bus, Calendar, ChevronRight, AlertTriangle, ArrowRight, Sun, CloudRain, ExternalLink, Loader, Search } from 'lucide-react';
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
    { icon: CreditCard, label: 'Pay Taxes', path: '/services' },
    { icon: Shield, label: 'Public Safety', path: '/emergency' },
    { icon: FileText, label: 'Public Records', path: '/services' },
    { icon: Bus, label: 'Transport', path: '/map' },
    { icon: Calendar, label: 'Events', path: '/events' },
  ];

  return (
    <div className="flex flex-col font-sans">
      {/* Alert Banner */}
      <div className="bg-amber-400 text-blue-950 font-bold px-4 py-3 flex items-center justify-center text-sm shadow-md relative overflow-hidden z-20">
        <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 text-blue-900" />
        <span className="truncate mr-2">{safetyAlert}</span>
        <Link to="/news" className="underline hover:text-white text-xs uppercase tracking-wider font-extrabold ml-auto sm:ml-2">Details</Link>
      </div>

      {/* Hero Section - Modern Gov Style */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/nassaucountyhero2/1920/1080" 
            alt="Nassau County Coastline" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center mt-[-60px]">
          <span className="inline-block py-1 px-4 bg-blue-900/50 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            Official Government Portal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg font-serif">
            Welcome to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Nassau County</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your gateway to government services, community resources, and the vibrant life of Long Island's Gold Coast.
          </p>

          {/* Modern Search Hero */}
          <div className="max-w-2xl mx-auto mb-12 relative group">
            <button 
                onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()}
                className="w-full bg-white/95 backdrop-blur-md text-left px-6 py-5 rounded-full shadow-2xl text-slate-500 flex items-center hover:bg-white hover:scale-[1.02] transition-all duration-300 border-4 border-white/20"
            >
                <Search className="w-6 h-6 mr-4 text-blue-600" />
                <span className="font-medium text-lg text-slate-400">How can we help you today?</span>
                <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">Ask AI</span>
            </button>
            <p className="text-blue-200 text-xs mt-3 font-medium opacity-80">Try asking: "Where do I pay taxes?" or "Find a park near me"</p>
          </div>
          
          {/* Quick Access Grid within Hero */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {quickLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path}
                className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-blue-800/90 border border-white/10 hover:border-amber-400/50 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <link.icon className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white font-bold text-sm tracking-wide">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Executive Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative group">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
                <img 
                  src="https://picsum.photos/seed/nassauexecutive/600/400" 
                  alt="County Executive" 
                  className="rounded-2xl shadow-2xl relative z-10 w-full"
                />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3">Government Leadership</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-serif">Working for You</h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Nassau County is committed to transparency, fiscal responsibility, and accessibility. We are dedicated to maintaining our world-class parks, ensuring public safety, and fostering economic growth from the South Shore beaches to the North Shore estates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/history" className="flex items-center justify-between p-5 bg-white rounded-xl hover:bg-blue-50 transition border border-slate-200 shadow-sm group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-700">Our History</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </Link>
                 <Link to="/government" className="flex items-center justify-between p-5 bg-white rounded-xl hover:bg-blue-50 transition border border-slate-200 shadow-sm group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-700">Departments</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 font-serif">Essential Services</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Access the most requested resources efficiently.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Residents', desc: 'Recycling schedules, library cards, and housing resources.', img: 'https://picsum.photos/seed/residents1/400/300' },
              { title: 'Business', desc: 'Permits, zoning, and economic development resources.', img: 'https://picsum.photos/seed/business1/400/300' },
              { title: 'Visitors', desc: 'Museums, beaches, parks and travel guides.', img: 'https://picsum.photos/seed/travel1/400/300' }
            ].map((item) => (
              <div key={item.title} className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                  <Link to="/services" className="inline-flex items-center text-blue-700 font-bold hover:text-amber-600 transition-colors">
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
          <div className="flex flex-col lg:flex-row gap-16">
            {/* News Feed */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-10 border-b border-slate-200 pb-4">
                <div>
                   <h2 className="text-3xl font-extrabold text-slate-900 font-serif">Latest News</h2>
                   <p className="text-slate-500 mt-2">Updates from News12, Newsday, and Official Sources</p>
                </div>
                <Link to="/news" className="text-blue-700 font-bold hover:text-blue-900 mt-4 sm:mt-0 flex items-center">View All News <ArrowRight className="w-4 h-4 ml-2"/></Link>
              </div>
              
              <div className="space-y-8">
                {loadingNews ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4 bg-white rounded-xl border border-slate-200">
                        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                        <p className="text-slate-500 font-medium">Fetching trusted news sources...</p>
                    </div>
                ) : (
                    news.map((item, idx) => (
                      <div key={item.id || idx} className="flex flex-col sm:flex-row gap-6 group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
                        <div className="sm:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                             <img 
                                src={`https://picsum.photos/seed/news${idx}/200/200`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                alt="News Thumbnail" 
                             />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                             <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">{item.category}</span>
                             <span className="text-xs font-bold text-slate-400">{item.source}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition leading-snug">
                            <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {item.summary}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                             <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                             {item.url && (
                                 <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs font-bold flex items-center hover:underline">
                                     Read Source <ExternalLink className="w-3 h-3 ml-1" />
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
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><CloudRain className="w-32 h-32" /></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center text-blue-200"><Sun className="w-4 h-4 mr-2" /> Live Weather</h3>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-6xl font-black tracking-tighter">58°</span>
                      <p className="text-blue-100 font-medium text-lg mt-1">Mineola, NY</p>
                    </div>
                    <div className="text-right">
                        <div className="text-amber-400 font-bold text-xl mb-1">Partly Cloudy</div>
                        <div className="text-sm text-blue-200">H: 62° L: 45°</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-center text-xs border-t border-blue-700 pt-6">
                    <div>
                      <span className="block text-blue-300 mb-1">Humidity</span>
                      <span className="font-bold text-lg">45%</span>
                    </div>
                    <div>
                      <span className="block text-blue-300 mb-1">Wind</span>
                      <span className="font-bold text-lg">12 mph</span>
                    </div>
                    <div>
                      <span className="block text-blue-300 mb-1">Precip</span>
                      <span className="font-bold text-lg">0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center border-b border-slate-100 pb-4"><Calendar className="w-5 h-5 mr-2 text-amber-500" /> Upcoming Events</h3>
                <ul className="space-y-6">
                  {[
                    { date: 'NOV 4', title: 'Legislative Session' },
                    { date: 'NOV 11', title: 'Veterans Day Ceremony' },
                    { date: 'NOV 30', title: 'Holiday Light Show' }
                  ].map((evt) => (
                    <li key={evt.title} className="flex items-start gap-4 group cursor-pointer">
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center w-16 shadow-sm group-hover:border-blue-300 transition-colors">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">{evt.date.split(' ')[0]}</span>
                        <span className="block text-xl font-black text-slate-900 leading-none">{evt.date.split(' ')[1]}</span>
                      </div>
                      <div>
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors block text-sm mb-1">{evt.title}</span>
                          <span className="text-xs text-slate-500 block">Add to calendar</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/events" className="block mt-8 text-center text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 py-3 rounded-lg hover:bg-blue-100 transition">View Full Calendar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;