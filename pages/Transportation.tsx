import React, { useState } from 'react';
import { Train, Bus, Plane, MapPin, ExternalLink, Clock, Info } from 'lucide-react';

const Transportation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rail' | 'bus' | 'air'>('rail');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-extrabold mb-4 font-serif">Transportation Center</h1>
           <p className="text-xl text-slate-300">Detailed transit maps, schedules, and airport connections.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10">
         <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
             
             {/* Tabs */}
             <div className="flex border-b border-slate-200">
                 <button 
                    onClick={() => setActiveTab('rail')}
                    className={`flex-1 py-6 font-bold text-lg flex items-center justify-center transition-colors ${activeTab === 'rail' ? 'bg-white text-blue-900 border-b-4 border-blue-900' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                 >
                    <Train className="w-6 h-6 mr-3" /> Rail (LIRR)
                 </button>
                 <button 
                    onClick={() => setActiveTab('bus')}
                    className={`flex-1 py-6 font-bold text-lg flex items-center justify-center transition-colors ${activeTab === 'bus' ? 'bg-white text-amber-600 border-b-4 border-amber-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                 >
                    <Bus className="w-6 h-6 mr-3" /> Bus (NICE)
                 </button>
                 <button 
                    onClick={() => setActiveTab('air')}
                    className={`flex-1 py-6 font-bold text-lg flex items-center justify-center transition-colors ${activeTab === 'air' ? 'bg-white text-cyan-600 border-b-4 border-cyan-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                 >
                    <Plane className="w-6 h-6 mr-3" /> Air & Other
                 </button>
             </div>

             {/* Content */}
             <div className="p-8 md:p-12">
                 {activeTab === 'rail' && (
                     <div className="animate-in fade-in slide-in-from-bottom-2">
                         <div className="flex flex-col md:flex-row gap-12 items-start">
                             <div className="flex-1">
                                 <h2 className="text-3xl font-bold text-slate-900 mb-6">Long Island Rail Road (LIRR)</h2>
                                 <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                                     The LIRR is the busiest commuter railroad in North America, connecting Nassau County directly to Penn Station and Grand Central Madison in Manhattan.
                                 </p>
                                 
                                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-600"/> Key Lines & Hubs</h3>
                                 <div className="space-y-4 mb-8">
                                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                         <span className="font-bold text-blue-900 block mb-1">Babylon Branch</span>
                                         <p className="text-sm text-slate-600">Serves: Rockville Centre, Baldwin, Freeport, Merrick, Bellmore, Wantagh, Seaford, Massapequa.</p>
                                     </div>
                                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                         <span className="font-bold text-blue-900 block mb-1">Main Line (Ronkonkoma/Port Jeff)</span>
                                         <p className="text-sm text-slate-600">Serves: Mineola (County Seat), New Hyde Park, Westbury, Hicksville, Bethpage.</p>
                                     </div>
                                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                         <span className="font-bold text-blue-900 block mb-1">Hempstead Branch</span>
                                         <p className="text-sm text-slate-600">Serves: Floral Park, Garden City, Hempstead.</p>
                                     </div>
                                 </div>

                                 <a href="https://new.mta.info/schedules" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition">
                                     Check Live Schedules <ExternalLink className="w-4 h-4 ml-2" />
                                 </a>
                             </div>
                             <div className="md:w-1/2 bg-slate-100 rounded-xl p-4 border border-slate-200">
                                 <img src="https://picsum.photos/seed/lirrMap/600/600" alt="LIRR Map Placeholder" className="w-full h-auto rounded-lg shadow-sm mb-4" />
                                 <p className="text-xs text-slate-500 text-center italic">Detailed system map available on MTA website.</p>
                             </div>
                         </div>
                     </div>
                 )}

                 {activeTab === 'bus' && (
                     <div className="animate-in fade-in slide-in-from-bottom-2">
                         <div className="flex flex-col md:flex-row gap-12 items-start">
                             <div className="flex-1">
                                 <h2 className="text-3xl font-bold text-slate-900 mb-6">NICE Bus</h2>
                                 <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                                     Nassau Inter-County Express (NICE) provides bus service throughout Nassau County and into parts of Queens and Suffolk.
                                 </p>
                                 
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                     <div className="border border-amber-200 bg-amber-50 p-6 rounded-xl">
                                         <Clock className="w-8 h-8 text-amber-600 mb-3" />
                                         <h4 className="font-bold text-amber-900">Real-Time Tracking</h4>
                                         <p className="text-sm text-amber-800 mt-2">Use the NICE GoMobile app for live bus locations and mobile ticketing.</p>
                                     </div>
                                     <div className="border border-blue-200 bg-blue-50 p-6 rounded-xl">
                                         <Info className="w-8 h-8 text-blue-600 mb-3" />
                                         <h4 className="font-bold text-blue-900">Able-Ride</h4>
                                         <p className="text-sm text-blue-800 mt-2">Paratransit service for residents with disabilities. Call 516-228-4000 to apply.</p>
                                     </div>
                                 </div>

                                 <h3 className="font-bold text-slate-800 mb-4">Popular Routes</h3>
                                 <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-8">
                                     <li><span className="font-bold">n6 (Hempstead Tpk):</span> Hempstead to Jamaica via West Hempstead, Franklin Square, Elmont.</li>
                                     <li><span className="font-bold">n40/41 (Mineola/Freeport):</span> Mineola to Freeport via Roosevelt Field & Hofstra.</li>
                                     <li><span className="font-bold">n20h (Northern Blvd):</span> Great Neck to Hicksville.</li>
                                 </ul>

                                 <a href="https://www.nicebus.com/" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition">
                                     Visit NICE Bus Website <ExternalLink className="w-4 h-4 ml-2" />
                                 </a>
                             </div>
                             <div className="md:w-1/2">
                                <img src="https://picsum.photos/seed/nicebus/600/400" alt="NICE Bus" className="w-full h-auto rounded-xl shadow-lg border border-slate-200" />
                             </div>
                         </div>
                     </div>
                 )}

                 {activeTab === 'air' && (
                     <div className="animate-in fade-in slide-in-from-bottom-2">
                          <h2 className="text-3xl font-bold text-slate-900 mb-6">Airports & Regional Transit</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                  <h3 className="font-bold text-xl text-slate-900 mb-2">JFK International</h3>
                                  <p className="text-sm text-slate-600 mb-4">Located immediately adjacent to Nassau County's southwest border.</p>
                                  <div className="text-xs font-bold text-cyan-700 bg-cyan-100 inline-block px-2 py-1 rounded">Access via LIRR (Jamaica) + AirTrain</div>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                  <h3 className="font-bold text-xl text-slate-900 mb-2">LaGuardia (LGA)</h3>
                                  <p className="text-sm text-slate-600 mb-4">Located in Northern Queens, close to North Shore communities.</p>
                                  <div className="text-xs font-bold text-cyan-700 bg-cyan-100 inline-block px-2 py-1 rounded">Access via Car / Taxi</div>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                  <h3 className="font-bold text-xl text-slate-900 mb-2">MacArthur (ISP)</h3>
                                  <p className="text-sm text-slate-600 mb-4">Located in Suffolk County (Islip), offering easier regional travel.</p>
                                  <div className="text-xs font-bold text-cyan-700 bg-cyan-100 inline-block px-2 py-1 rounded">Access via LIRR (Ronkonkoma)</div>
                              </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
                               <div>
                                   <h3 className="text-xl font-bold text-blue-900 mb-2">Long Island Ferry</h3>
                                   <p className="text-blue-800">Travel to Connecticut via the Port Jefferson or Orient Point ferries (Suffolk County locations).</p>
                               </div>
                               <a href="https://www.800ferry.com/" target="_blank" rel="noreferrer" className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 border border-blue-200 font-bold rounded-lg hover:bg-blue-100 transition">
                                   Ferry Schedules
                               </a>
                          </div>
                     </div>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
};

export default Transportation;