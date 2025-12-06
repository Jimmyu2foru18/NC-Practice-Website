import React, { useState } from 'react';
import { Phone, AlertOctagon, Activity, Wind, MapPin, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EmergencyFacility } from '../types';
import { Icon } from 'leaflet';

const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const facilities: EmergencyFacility[] = [
    { name: 'Nassau University Medical Center', type: 'Hospital', address: '2201 Hempstead Tpke, East Meadow', phone: '516-572-0123', coordinates: [40.7203, -73.5557], description: 'Level I Trauma Center' },
    { name: 'North Shore University Hospital', type: 'Hospital', address: '300 Community Dr, Manhasset', phone: '516-562-0100', coordinates: [40.7769, -73.7024], description: 'Tertiary care teaching hospital' },
    { name: 'Mount Sinai South Nassau', type: 'Hospital', address: '1 Healthy Way, Oceanside', phone: '516-632-3000', coordinates: [40.6356, -73.6429], description: 'Acute care medical center' },
    { name: 'Nassau County Police HQ', type: 'Police', address: '1490 Franklin Ave, Mineola', phone: '516-573-8800', coordinates: [40.7388, -73.6393], description: 'Headquarters' },
];

const Emergency: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<EmergencyFacility | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="bg-red-700 text-white py-16">
         <div className="container mx-auto px-4 text-center">
            <AlertOctagon className="w-20 h-20 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl font-extrabold mb-4 font-serif">Emergency Services</h1>
            <p className="text-2xl opacity-90">In an immediate life-threatening emergency, always dial <span className="font-black text-3xl bg-white text-red-700 px-3 py-1 rounded-lg shadow-sm">9-1-1</span></p>
         </div>
       </div>

       <div className="container mx-auto px-4 -mt-12 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
                { title: 'Police (Non-Emergency)', number: '516-573-8800', icon: Phone },
                { title: 'Poison Control', number: '1-800-222-1222', icon: Activity },
                { title: 'PSEG (Power Outage)', number: '1-800-490-0075', icon: Wind },
                { title: 'Social Services', number: '516-227-8519', icon: Phone },
            ].map(contact => (
                <div key={contact.title} className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-red-600 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                    <contact.icon className="w-10 h-10 text-red-600 mb-4" />
                    <h3 className="font-bold text-slate-600 mb-2 uppercase text-xs tracking-widest">{contact.title}</h3>
                    <a href={`tel:${contact.number.replace(/-/g, '')}`} className="text-2xl font-black text-slate-900 hover:text-red-600 transition">{contact.number}</a>
                </div>
            ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {/* Preparedness */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Hurricane Preparedness</h2>
                <div className="relative h-56 mb-6 rounded-xl overflow-hidden">
                    <img src="https://picsum.photos/seed/hurricane/600/300" alt="Storm Prep" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <p className="text-white font-bold">Be Prepared, Stay Safe.</p>
                    </div>
                </div>
                <ul className="space-y-3 text-slate-700 mb-8">
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Know your evacuation zone (Check Explorer Page).</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Pack a "Go Bag" with medications and documents.</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Secure loose outdoor furniture.</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Sign up for County Alerts via SMS.</li>
                </ul>
                <button className="w-full bg-red-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-md">Download Preparedness Guide</button>
            </div>
            
            {/* Facility Locator */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Facility Locator</h2>
                <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-4">
                    {facilities.map(hosp => (
                        <div key={hosp.name} className="flex justify-between items-start border border-slate-100 p-4 rounded-lg hover:border-red-200 transition bg-slate-50 cursor-pointer" onClick={() => setSelectedFacility(hosp)}>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg leading-tight">{hosp.name}</h4>
                                <p className="text-sm text-slate-500 mt-1">{hosp.address}</p>
                                <div className="mt-2 flex items-center gap-2">
                                     <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase">{hosp.type}</span>
                                     <a href={`tel:${hosp.phone}`} className="text-xs font-bold text-blue-600 hover:underline">{hosp.phone}</a>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <MapPin className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
       </div>

       {/* Map Modal */}
       {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
               <div className="h-80 w-full relative">
                   <MapContainer center={selectedFacility.coordinates} zoom={15} scrollWheelZoom={false} className="h-full w-full">
                       <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       />
                       <Marker position={selectedFacility.coordinates} icon={customIcon}>
                         <Popup>{selectedFacility.name}</Popup>
                       </Marker>
                   </MapContainer>
                   <button onClick={() => setSelectedFacility(null)} className="absolute top-4 right-4 bg-white text-slate-900 p-2 rounded-full shadow-lg z-[1000] hover:bg-slate-100">
                       <X className="w-6 h-6" />
                   </button>
               </div>
               <div className="p-8">
                   <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedFacility.name}</h2>
                   <p className="text-slate-600 mb-4">{selectedFacility.description}</p>
                   <div className="flex flex-col sm:flex-row gap-4">
                       <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.coordinates[0]},${selectedFacility.coordinates[1]}`}
                          target="_blank" rel="noreferrer"
                          className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition"
                        >
                           Get Directions
                       </a>
                       <a 
                          href={`tel:${selectedFacility.phone}`}
                          className="flex-1 bg-slate-100 text-slate-800 border border-slate-200 font-bold py-3 px-6 rounded-lg text-center hover:bg-slate-200 transition"
                        >
                           Call Now
                       </a>
                   </div>
               </div>
           </div>
        </div>
       )}
    </div>
  );
};

export default Emergency;