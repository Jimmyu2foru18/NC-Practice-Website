import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { DestinationItem } from '../types';
import { MapPin, Info, Utensils, Navigation, ArrowRight, ExternalLink } from 'lucide-react';

// Fix for default marker icon
const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const diningIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const destinations: DestinationItem[] = [
    // PARKS
    {
        id: 'p1',
        name: 'Eisenhower Park',
        type: 'Park',
        description: 'Larger than Central Park, offering golf courses, athletic fields, a swimming center, and the Veterans Memorial.',
        address: '1899 Hempstead Tpke, East Meadow, NY 11554',
        coordinates: [40.7292, -73.5850],
        features: ['Golf', 'Swimming', 'Playgrounds', 'Concerts'],
        nearbyDining: [
            { name: 'Borrelli\'s', type: 'Italian', distance: '0.5 miles' },
            { name: 'The Carltun', type: 'Fine Dining', distance: 'On-site' }
        ],
        image: 'https://picsum.photos/seed/eisenhower/400/300'
    },
    {
        id: 'p2',
        name: 'Old Westbury Gardens',
        type: 'Park',
        description: 'Magnificent Charles II-style mansion nested in 200 acres of formal gardens, landscaped grounds, woodlands, and ponds.',
        address: '71 Old Westbury Rd, Old Westbury, NY 11568',
        coordinates: [40.7745, -73.5960],
        features: ['Historic Mansion', 'Formal Gardens', 'Tours'],
        nearbyDining: [
            { name: 'Cafe inside Gardens', type: 'Cafe', distance: 'On-site' },
            { name: 'Wheatley Plaza Dining', type: 'Various', distance: '2 miles' }
        ],
        image: 'https://picsum.photos/seed/westbury/400/300'
    },
    // BEACHES
    {
        id: 'b1',
        name: 'Jones Beach State Park',
        type: 'Beach',
        description: 'World-famous beach featuring 6.5 miles of ocean beach, a boardwalk, and the Northwell Health Amphitheater.',
        address: 'Ocean Pkwy, Wantagh, NY 11793',
        coordinates: [40.5947, -73.5042],
        features: ['Boardwalk', 'Concerts', 'Swimming', 'Nature Center'],
        nearbyDining: [
            { name: 'The Landing', type: 'Seafood', distance: 'On-site' },
            { name: 'Boardwalk Cafe', type: 'Casual', distance: 'On-site' }
        ],
        image: 'https://picsum.photos/seed/jonesbeach/400/300'
    },
    {
        id: 'b2',
        name: 'Long Beach Boardwalk',
        type: 'Beach',
        description: 'A 2.2-mile boardwalk along the Atlantic Ocean, perfect for biking and walking, with white sand beaches.',
        address: '1 W Chester St, Long Beach, NY 11561',
        coordinates: [40.5833, -73.6579],
        features: ['Surfing', 'Biking', 'Volleyball'],
        nearbyDining: [
            { name: 'Allegria Hotel', type: 'Upscale', distance: '0.1 miles' },
            { name: 'Five Guys', type: 'Burgers', distance: '0.2 miles' }
        ],
        image: 'https://picsum.photos/seed/longbeach/400/300'
    },
    // MUSEUMS / LANDMARKS
    {
        id: 'm1',
        name: 'Cradle of Aviation',
        type: 'Museum',
        description: 'Aerospace museum commemorating Long Island\'s part in the history of aviation. Home to a lunar module.',
        address: 'Charles Lindbergh Blvd, Garden City, NY 11530',
        coordinates: [40.7289, -73.5958],
        features: ['Space Exhibits', 'IMAX Dome', 'Planetarium'],
        nearbyDining: [
            { name: 'Grand Lux Cafe', type: 'American', distance: '1 mile' },
            { name: 'Shake Shack', type: 'Burgers', distance: '1 mile' }
        ],
        image: 'https://picsum.photos/seed/cradle/400/300'
    },
    {
        id: 'm2',
        name: 'Sagamore Hill NHS',
        type: 'Landmark',
        description: 'The "Summer White House" of Theodore Roosevelt. 83 acres of natural beauty and historic buildings.',
        address: '20 Sagamore Hill Rd, Oyster Bay, NY 11771',
        coordinates: [40.8856, -73.5002],
        features: ['Historic Home', 'Hiking Trails', 'Museum'],
        nearbyDining: [
            { name: 'Wild Honey', type: 'American', distance: '2 miles' },
            { name: '20th Century Cycles', type: 'Cafe', distance: '2.5 miles' }
        ],
        image: 'https://picsum.photos/seed/sagamore/400/300'
    }
];

const DestinationExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Park' | 'Beach' | 'Museum'>('All');
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem>(destinations[0]);

  const filteredDestinations = activeCategory === 'All' 
    ? destinations 
    : destinations.filter(d => d.type === activeCategory || (activeCategory === 'Museum' && d.type === 'Landmark'));

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-slate-50">
      
      {/* LEFT SIDEBAR - LIST */}
      <div className="lg:w-1/3 flex flex-col border-r border-slate-200 bg-white z-20 shadow-xl">
        {/* Header / Tabs */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-4 font-serif">Explore Nassau</h1>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Park', 'Beach', 'Museum'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50'
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {filteredDestinations.map(dest => (
             <div 
               key={dest.id} 
               onClick={() => setSelectedDestination(dest)}
               className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                 selectedDestination.id === dest.id 
                 ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 
                 : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
               }`}
             >
               <img src={dest.image} alt={dest.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-slate-900 truncate">{dest.name}</h3>
                   <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{dest.type}</span>
                 </div>
                 <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dest.description}</p>
                 <div className="flex items-center mt-2 text-xs font-semibold text-blue-600">
                    View Details <ArrowRight className="w-3 h-3 ml-1" />
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* RIGHT SIDE - DETAIL & MAP */}
      <div className="lg:w-2/3 flex flex-col h-full relative">
        {/* Top Info Panel Overlay (Desktop) or stacked (Mobile) */}
        <div className="absolute top-4 left-4 right-4 z-[400] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-2xl mx-auto lg:mx-0 animate-in slide-in-from-top-4 duration-500">
           <div className="flex justify-between items-start">
              <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedDestination.name}</h2>
                  <p className="text-slate-600 flex items-center text-sm font-medium mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-amber-500" /> {selectedDestination.address}
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">{selectedDestination.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                     {selectedDestination.features.map(f => (
                       <span key={f} className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">{f}</span>
                     ))}
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                     <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-2 flex items-center">
                        <Utensils className="w-3 h-3 mr-1" /> Nearby Dining
                     </h4>
                     <ul className="grid grid-cols-2 gap-2 text-sm">
                        {selectedDestination.nearbyDining.map((place, i) => (
                           <li key={i} className="flex justify-between items-center text-slate-700">
                              <span className="font-bold">{place.name}</span>
                              <span className="text-xs text-slate-500 italic">{place.type} ({place.distance})</span>
                           </li>
                        ))}
                     </ul>
                  </div>
              </div>
              <a 
                 href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDestination.coordinates[0]},${selectedDestination.coordinates[1]}`} 
                 target="_blank"
                 rel="noreferrer"
                 className="hidden sm:flex flex-col items-center justify-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition shadow-lg"
              >
                  <Navigation className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">Directions</span>
              </a>
           </div>
        </div>

        {/* Map */}
        <div className="flex-grow w-full h-full bg-slate-100">
             {/* Key helps force re-render map center when selection changes */}
             <MapContainer key={selectedDestination.id} center={selectedDestination.coordinates} zoom={15} scrollWheelZoom={true} className="h-full w-full">
               <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={selectedDestination.coordinates} icon={customIcon}>
                 <Popup>
                   <div className="font-sans">
                      <strong className="block text-sm">{selectedDestination.name}</strong>
                      <span className="text-xs text-slate-500">Destination</span>
                   </div>
                 </Popup>
               </Marker>
               
               {/* Dummy markers for dining visualization (random offsets) */}
               <Marker 
                  position={[selectedDestination.coordinates[0] + 0.001, selectedDestination.coordinates[1] + 0.001] as [number, number]} 
                  icon={diningIcon}
               >
                  <Popup><span className="font-sans text-xs font-bold">Nearby Dining Option</span></Popup>
               </Marker>
             </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DestinationExplorer;