import React, { useState } from 'react';
import { Users, Gavel, ShieldCheck, FileCheck, Building, UserCheck, ExternalLink, Phone, Search, Heart, Briefcase } from 'lucide-react';

const Government: React.FC = () => {
  const [precinctAddress, setPrecinctAddress] = useState('');

  const departments = [
    { name: 'County Executive', head: 'Bruce Blakeman', phone: '516-571-3131', icon: UserCheck, url: 'https://www.nassaucountyny.gov/481/County-Executive' },
    { name: 'Police Department', head: 'Commissioner Patrick Ryder', phone: '516-573-8800', icon: ShieldCheck, url: 'https://www.pdcn.org/' },
    { name: 'County Clerk', head: 'Maureen O\'Connell', phone: '516-571-2664', icon: FileCheck, url: 'https://www.nassaucountyny.gov/458/County-Clerk' },
    { name: 'Public Works', head: 'Kenneth Arnold', phone: '516-571-9600', icon: Building, url: 'https://www.nassaucountyny.gov/1865/Public-Works' },
    { name: 'District Attorney', head: 'Anne Donnelly', phone: '516-571-3800', icon: Gavel, url: 'https://nassauda.org/' },
    { name: 'Legislature', head: 'Presiding Officer', phone: '516-571-6200', icon: Users, url: 'https://www.nassaucountyny.gov/489/Legislature' },
    { name: 'Department of Health', head: 'Commissioner', phone: '516-227-9697', icon: Heart, url: '' },
    { name: 'Consumer Affairs', head: 'Commissioner', phone: '516-571-2600', icon: Briefcase, url: '' },
  ];

  const getDepartmentLink = (name: string, url?: string) => {
    if (url) return url;
    return `https://www.google.com/search?q=Nassau+County+${encodeURIComponent(name)}+Official+Site`;
  };

  const handlePrecinctSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = precinctAddress.trim() 
        ? `Nassau County police precinct for ${precinctAddress}` 
        : 'Nassau County precinct finder';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
       <div className="relative h-72 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/seed/govbuilding/1920/600" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Government Building" />
        <div className="relative z-10 text-center container px-4">
          <span className="inline-block py-1 px-3 border border-slate-500 text-slate-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Official Directory</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-serif">Government</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Connecting residents with leadership, departments, and agencies.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Executive Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8 font-serif">Executive Leadership</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm hover:shadow-md transition-shadow">
             <div className="relative">
                 <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20"></div>
                 <img src="https://picsum.photos/seed/politician/200/200" className="w-48 h-48 rounded-full object-cover shadow-xl relative z-10 border-4 border-white" alt="County Executive" />
             </div>
             <div className="flex-1 text-center md:text-left">
               <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">County Executive</span>
               <a 
                 href="https://www.nassaucountyny.gov/481/County-Executive"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block text-4xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-blue-700 transition"
               >
                 Bruce Blakeman
               </a>
               <p className="text-slate-600 mb-8 max-w-2xl text-lg leading-relaxed">
                 Responsible for the day-to-day administration of county government, the Executive oversees county departments, prepares the annual budget, and ensures the efficient delivery of services to 1.3 million residents.
               </p>
               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                   <a 
                     href="https://www.nassaucountyny.gov/481/County-Executive" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 inline-flex items-center transition shadow-md"
                   >
                       Visit Official Site <ExternalLink className="w-4 h-4 ml-2" />
                   </a>
                   <a href="tel:5165713131" className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 inline-flex items-center transition">
                       <Phone className="w-4 h-4 mr-2" /> 516-571-3131
                   </a>
               </div>
             </div>
          </div>
        </div>

        {/* Departments Grid */}
        <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8 font-serif">Departments & Agencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const link = getDepartmentLink(dept.name, dept.url);
            
            return (
              <div key={dept.name} className="border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all bg-white group flex flex-col hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-blue-600 transition-colors">
                    <dept.icon className="w-8 h-8 text-slate-500 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Official</span>
                </div>
                <a 
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-blue-700 transition block"
                >
                  {dept.name}
                </a>
                <div className="space-y-2 text-sm text-slate-600 mb-8 flex-grow">
                  <p><span className="font-semibold text-slate-400 uppercase text-xs">Head of Dept</span><br/> {dept.head}</p>
                  <p className="flex items-center pt-2"><Phone className="w-3 h-3 mr-2 text-amber-500" /> <a href={`tel:${dept.phone}`} className="font-bold text-slate-700 hover:text-blue-600">{dept.phone}</a></p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                   <a 
                     href={link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center w-full justify-center py-2 rounded-lg hover:bg-blue-50 transition"
                   >
                       Visit Official Site <ExternalLink className="w-3 h-3 ml-2" />
                   </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Find My Precinct Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldCheck className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4 font-serif flex items-center">
                        <ShieldCheck className="w-8 h-8 mr-3 text-amber-400" /> 
                        Find My Precinct
                    </h2>
                    <p className="text-blue-100 text-lg leading-relaxed mb-6">
                        Knowing your local police precinct is vital for community safety. Enter your address to quickly locate your designated precinct, contact numbers, and command staff.
                    </p>
                    <ul className="space-y-2 text-sm text-blue-200 mb-6">
                        <li className="flex items-center"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div> Identify your specific precinct number</li>
                        <li className="flex items-center"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div> Get direct non-emergency contact info</li>
                    </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                    <form onSubmit={handlePrecinctSearch} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg">
                        <label className="block text-xs font-bold text-amber-400 mb-2 uppercase tracking-widest">Home Address</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                value={precinctAddress}
                                onChange={(e) => setPrecinctAddress(e.target.value)}
                                placeholder="e.g. 1550 Franklin Ave, Mineola" 
                                className="flex-1 px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-amber-400/50 transition shadow-inner placeholder:text-slate-400"
                            />
                            <button 
                                type="submit" 
                                className="bg-amber-500 text-blue-950 font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition shadow-lg flex items-center justify-center"
                            >
                                <Search className="w-5 h-5 mr-2" /> Find
                            </button>
                        </div>
                        <p className="text-xs text-blue-200 mt-3 text-center sm:text-left opacity-80">
                            You will be redirected to the official search results.
                        </p>
                    </form>
                </div>
            </div>
        </div>

        {/* Towns Info */}
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8 font-serif">Local Municipalities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {['Hempstead', 'North Hempstead', 'Oyster Bay'].map(town => (
                    <button 
                        key={town} 
                        onClick={() => window.open(`https://www.google.com/search?q=Town+of+${town}+NY+Official+Site`, '_blank')}
                        className="bg-slate-800 text-white p-8 rounded-xl shadow-lg hover:bg-slate-700 transition cursor-pointer group"
                    >
                        <Building className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-xs uppercase text-slate-400 font-bold mb-1 block">Town of</span>
                        <h4 className="font-bold text-xl">{town}</h4>
                    </button>
                ))}
                {['Glen Cove', 'Long Beach'].map(city => (
                    <button 
                        key={city} 
                        onClick={() => window.open(`https://www.google.com/search?q=City+of+${city}+NY+Official+Site`, '_blank')}
                        className="bg-amber-500 text-blue-950 p-8 rounded-xl shadow-lg hover:bg-amber-400 transition cursor-pointer group"
                    >
                        <Building className="w-8 h-8 mx-auto mb-3 text-blue-900/50 group-hover:text-blue-900 transition-colors" />
                        <span className="text-xs uppercase text-blue-900/70 font-bold mb-1 block">City of</span>
                        <h4 className="font-bold text-xl">{city}</h4>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Government;