import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, Facebook, Twitter, Instagram, ChevronDown, MapPin, Phone, FileText, Compass, User, Building, Gavel, Sparkles, History as HistoryIcon, Train } from 'lucide-react';
import { searchSite } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
}

// Mega Menu Data Structure
const megaMenuData: Record<string, { label: string; path: string; desc: string; icon?: React.ElementType }[]> = {
  Government: [
    { label: 'County Executive', path: '/government', desc: 'Leadership & Administration', icon: User },
    { label: 'Legislature', path: '/government', desc: 'County Laws & Budget', icon: Building },
    { label: 'Departments', path: '/government', desc: 'All Agencies A-Z', icon: FileText },
    { label: 'Courts', path: '/government', desc: 'Judicial Information', icon: Gavel },
    { label: 'Towns & Cities', path: '/government', desc: 'Local Municipalities', icon: MapPin },
  ],
  Services: [
    { label: 'Pay Taxes', path: '/services', desc: 'Property Tax Portal' },
    { label: 'Public Records', path: '/services', desc: 'Deeds, Mortgages & FOIL' },
    { label: 'Permits & Licensing', path: '/services', desc: 'Building & Business' },
    { label: 'School Districts', path: '/schools', desc: 'Education Directory' },
    { label: 'Social Services', path: '/emergency', desc: 'Assistance Programs' },
  ],
  Residents: [
    { label: 'Destinations', path: '/map', desc: 'Explore Parks & Beaches', icon: Compass },
    { label: 'Emergency Info', path: '/emergency', desc: 'Preparedness & Alerts' },
    { label: 'Transportation', path: '/transportation', desc: 'Bus, Rail & Air', icon: Train },
    { label: 'County History', path: '/history', desc: 'Timeline & Heritage', icon: HistoryIcon },
  ],
  Visitors: [
    { label: 'Attractions', path: '/map', desc: 'Museums & Landmarks' },
    { label: 'Events Calendar', path: '/events', desc: 'Festivals & Parades' },
    { label: 'Beaches', path: '/map', desc: 'South Shore & North Shore' },
    { label: 'Transit Guide', path: '/transportation', desc: 'Getting Around' },
  ]
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<number | null>(null);

  const handleSearch = async (e: React.FormEvent, overrideQuery?: string) => {
    e.preventDefault();
    const queryToUse = overrideQuery || searchQuery;
    if (!queryToUse.trim()) return;
    
    if (overrideQuery) setSearchQuery(overrideQuery);

    setIsSearching(true);
    setSearchResult(null);
    const result = await searchSite(queryToUse);
    setSearchResult(result);
    setIsSearching(false);
  };

  const handleMouseEnter = (category: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Top Bar */}
      <div className="bg-blue-950 text-white text-xs py-2 px-4 flex justify-between items-center z-50 relative border-b border-blue-900">
        <div className="flex items-center space-x-6">
          <span className="flex items-center hover:text-amber-400 transition cursor-default"><Phone className="w-3 h-3 mr-2 text-amber-400" /> 516-571-3000</span>
          <span className="hidden sm:flex items-center hover:text-amber-400 transition cursor-default"><MapPin className="w-3 h-3 mr-2 text-amber-400" /> 1550 Franklin Ave, Mineola, NY</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="hover:text-amber-400 transition font-medium">Contact</Link>
          <Link to="/emergency" className="hover:text-red-400 font-bold transition flex items-center text-amber-100"><Bell className="w-3 h-3 mr-1" /> Emergency</Link>
          <div className="hidden md:flex space-x-3 border-l border-blue-800 pl-4">
            <Facebook className="w-3 h-3 cursor-pointer hover:text-blue-400 transition opacity-80 hover:opacity-100" />
            <Twitter className="w-3 h-3 cursor-pointer hover:text-blue-400 transition opacity-80 hover:opacity-100" />
            <Instagram className="w-3 h-3 cursor-pointer hover:text-pink-400 transition opacity-80 hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Main Header with Mega Menu */}
      <header className="bg-white shadow-md sticky top-0 z-[50] border-b-4 border-amber-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo Area */}
            <Link to="/" className="flex items-center space-x-4 group z-50 relative">
              <img 
                src="https://e7.pngegg.com/pngimages/876/46/png-clipart-freeport-suffolk-county-mineola-county-comptroller-others-emblem-logo.png" 
                alt="Nassau County Seal" 
                className="w-16 h-16 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-blue-900 leading-none tracking-tight font-serif">NASSAU COUNTY</span>
                <span className="text-xs md:text-sm text-amber-600 font-bold tracking-[0.2em] uppercase">State of New York</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center h-full">
              <Link to="/" className="px-4 py-2 font-bold text-slate-700 hover:text-blue-900 transition relative group text-sm uppercase tracking-wide">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </Link>
              
              {/* Mega Menu Triggers */}
              {Object.keys(megaMenuData).map((category) => (
                <div 
                  key={category}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={`px-4 py-2 font-bold flex items-center transition-colors relative group text-sm uppercase tracking-wide ${
                      activeDropdown === category ? 'text-blue-700' : 'text-slate-700 hover:text-blue-900'
                    }`}
                  >
                    {category} <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === category ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-amber-500 transition-all ${activeDropdown === category ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeDropdown === category && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-b-xl border-t border-slate-100 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 z-[100]">
                       {megaMenuData[category].map((item) => (
                         <Link 
                           key={item.label} 
                           to={item.path} 
                           className="flex items-start p-3 rounded-lg hover:bg-slate-50 transition group"
                           onClick={() => setActiveDropdown(null)}
                         >
                           <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                             {item.icon ? <item.icon className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 -rotate-90" />}
                           </div>
                           <div>
                             <h4 className="font-bold text-slate-900 group-hover:text-blue-700 text-sm">{item.label}</h4>
                             <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                           </div>
                         </Link>
                       ))}
                    </div>
                  )}
                </div>
              ))}

              <Link to="/news" className="px-4 py-2 font-bold text-slate-700 hover:text-blue-900 transition relative group text-sm uppercase tracking-wide">
                News
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </Link>
              
              <Link to="/about" className="px-4 py-2 font-bold text-slate-700 hover:text-blue-900 transition relative group text-sm uppercase tracking-wide">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </Link>

              <button 
                onClick={() => (document.getElementById('search-modal') as HTMLDialogElement)?.showModal()}
                className="ml-6 p-2.5 bg-blue-50 text-blue-900 rounded-full hover:bg-blue-100 transition shadow-sm border border-blue-200 flex items-center gap-2 group active:scale-95"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold pr-1 uppercase tracking-wide">AI Helper</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden p-2 text-blue-900 bg-slate-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Accordion */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 shadow-xl max-h-[80vh] overflow-y-auto absolute w-full z-50">
            <div className="flex flex-col">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold text-slate-800 border-b border-slate-100 hover:bg-slate-50">Home</Link>
              
              {Object.keys(megaMenuData).map((category) => (
                <div key={category} className="border-b border-slate-100">
                  <div className="px-6 py-4 font-bold text-blue-900 bg-slate-50/80">{category}</div>
                  <div className="bg-white px-6 py-2 space-y-1 pb-4">
                    {megaMenuData[category].map((item) => (
                      <Link 
                        key={item.label} 
                        to={item.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm font-medium text-slate-600 py-2 hover:text-blue-700 pl-4 border-l-2 border-slate-100 hover:border-blue-500 transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <Link to="/news" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold text-slate-800 border-b border-slate-100 hover:bg-slate-50">News</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-6 py-4 font-bold text-slate-800 border-b border-slate-100 hover:bg-slate-50">About</Link>
              <button 
                 onClick={() => { setIsMenuOpen(false); (document.getElementById('search-modal') as HTMLDialogElement)?.showModal(); }}
                 className="px-6 py-4 font-bold text-blue-700 flex items-center bg-blue-50"
              >
                <Search className="w-4 h-4 mr-2" /> Open AI Assistant
              </button>
            </div>
          </div>
        )}
      </header>

      {/* AI Assistant Modal */}
      <dialog id="search-modal" className="modal p-0 rounded-2xl shadow-2xl backdrop:bg-slate-900/60 w-full max-w-3xl bg-white open:animate-in open:fade-in open:zoom-in-95 backdrop:animate-in backdrop:fade-in z-[1000]">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Sidebar / Branding */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-6 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <Sparkles className="w-6 h-6 text-amber-400" />
                 <h3 className="text-xl font-bold">Nassau AI</h3>
              </div>
              <p className="text-blue-200 text-sm mb-4">
                Your intelligent assistant for county services. Ask about forms, events, or plan your visit.
              </p>
            </div>
            <div className="relative z-10 space-y-2">
               <div className="text-xs font-bold text-blue-300 uppercase tracking-widest">Capabilities</div>
               <ul className="text-sm space-y-2">
                 <li className="flex items-center gap-2"><FileText className="w-4 h-4 text-amber-400"/> Form Finder</li>
                 <li className="flex items-center gap-2"><Compass className="w-4 h-4 text-amber-400"/> Itinerary Planner</li>
                 <li className="flex items-center gap-2"><Search className="w-4 h-4 text-amber-400"/> Service Search</li>
               </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:w-2/3 flex flex-col">
            <div className="flex justify-end mb-4">
              <form method="dialog">
                <button onClick={() => {setSearchResult(null); setSearchQuery('');}} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"><X className="w-6 h-6" /></button>
              </form>
            </div>
            
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="How can we help you today?" 
                className="flex-1 border border-slate-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition shadow-md"
                disabled={isSearching}
              >
                {isSearching ? '...' : 'Ask'}
              </button>
            </form>

            {!searchResult && !isSearching && (
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={(e) => handleSearch(e, "How do I apply for a building permit?")} className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium transition border border-transparent hover:border-blue-200">
                    🏗️ Building Permit
                  </button>
                  <button onClick={(e) => handleSearch(e, "Plan a weekend family trip to a park")} className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium transition border border-transparent hover:border-blue-200">
                    🌳 Plan a Trip
                  </button>
                  <button onClick={(e) => handleSearch(e, "Where do I pay my property taxes?")} className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium transition border border-transparent hover:border-blue-200">
                    💰 Pay Taxes
                  </button>
                  <button onClick={(e) => handleSearch(e, "Find the nearest recycling center")} className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium transition border border-transparent hover:border-blue-200">
                    ♻️ Recycling
                  </button>
                </div>
              </div>
            )}
            
            {searchResult && (
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl animate-in fade-in slide-in-from-top-2 flex-1 overflow-y-auto max-h-[300px]">
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                     <Sparkles className="w-4 h-4 text-blue-600" />
                   </div>
                   <div className="prose prose-sm max-w-none text-slate-700">
                     <p className="whitespace-pre-wrap leading-relaxed">{searchResult}</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://e7.pngegg.com/pngimages/876/46/png-clipart-freeport-suffolk-county-mineola-county-comptroller-others-emblem-logo.png" 
                  alt="Nassau County Seal" 
                  className="w-10 h-10 object-contain grayscale opacity-80"
                />
                <span className="text-xl font-bold text-white tracking-tight font-serif">NASSAU COUNTY</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-slate-400">
                Serving the people of Nassau County with transparency, efficiency, and dedication to public service since 1899.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition" />
                <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition" />
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 border-b border-amber-500 pb-2 inline-block">Government</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/government" className="hover:text-amber-400 transition">Executive Leadership</Link></li>
                <li><Link to="/government" className="hover:text-amber-400 transition">Legislature</Link></li>
                <li><Link to="/government" className="hover:text-amber-400 transition">Departments</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition">Employee Directory</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 border-b border-amber-500 pb-2 inline-block">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-amber-400 transition">Services</Link></li>
                <li><Link to="/history" className="hover:text-amber-400 transition">County History</Link></li>
                <li><Link to="/events" className="hover:text-amber-400 transition">Events Calendar</Link></li>
                <li><Link to="/map" className="hover:text-amber-400 transition">Destination Explorer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 border-b border-amber-500 pb-2 inline-block">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-1 text-amber-500" /> 1550 Franklin Ave<br/>Mineola, NY 11501</li>
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2 text-amber-500" /> 516-571-3000</li>
                <li className="flex items-center"><Bell className="w-4 h-4 mr-2 text-red-500" /> <Link to="/emergency" className="hover:text-white font-bold text-red-400">Emergency Contacts</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Nassau County. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Accessibility</a>
              <a href="#" className="hover:text-white transition">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;