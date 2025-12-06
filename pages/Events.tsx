import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Grid, List, Search, X, User, Mail, Info, ExternalLink, Utensils } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { EventItem } from '../types';

// Fix for default marker icon in React Leaflet
const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const Events: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Curated list of realistic events based on Nassau County venues
  const events: EventItem[] = [
    { 
      id: 1, 
      day: 4, 
      month: 'NOV', 
      date: 'Nov 4, 2024',
      title: 'Legislative Session', 
      time: '1:00 PM - 5:00 PM', 
      location: 'Theodore Roosevelt Executive Bldg, Mineola', 
      type: 'Government',
      description: 'The Nassau County Legislature will hold its regularly scheduled meeting. The public is invited to attend in person or watch via livestream. Agenda items include infrastructure funding and public safety grants.',
      organizer: 'Nassau County Legislature',
      contact: 'legis@nassaucountyny.gov',
      coordinates: [40.7408, -73.6403],
      image: 'https://picsum.photos/seed/legislature24/800/600'
    },
    { 
      id: 2, 
      day: 11, 
      month: 'NOV', 
      date: 'Nov 11, 2024',
      title: 'Veterans Day Ceremony', 
      time: '11:00 AM', 
      location: 'Veterans Memorial, Eisenhower Park', 
      type: 'Ceremony',
      description: 'Join county officials and veterans groups for a solemn ceremony honoring those who have served. The event will feature a color guard presentation, wreath laying, and speeches by local dignitaries.',
      organizer: 'Veterans Service Agency',
      contact: 'vets@nassaucountyny.gov',
      coordinates: [40.7292, -73.5850],
      image: 'https://picsum.photos/seed/veteransday/800/600'
    },
    { 
      id: 3, 
      day: 16, 
      month: 'NOV', 
      date: 'Nov 16, 2024',
      title: 'Apollo at 50 Exhibit Tour', 
      time: '10:00 AM - 2:00 PM', 
      location: 'Cradle of Aviation Museum, Garden City', 
      type: 'Cultural',
      description: 'A guided tour through the history of space exploration. Learn about the Lunar Module, built right here in Bethpage. Special interactive exhibits for children ages 8-12.',
      organizer: 'Cradle of Aviation',
      contact: 'reservations@cradleofaviation.org',
      coordinates: [40.7289, -73.5958],
      image: 'https://picsum.photos/seed/spaceapollo/800/600'
    },
    { 
      id: 4, 
      day: 23, 
      month: 'NOV', 
      date: 'Nov 23, 2024',
      title: 'Turkey Trot 5K Run', 
      time: '8:30 AM', 
      location: 'Eisenhower Park Field 2', 
      type: 'Sports',
      description: 'Annual 5K run/walk to benefit local food pantries. Participants are encouraged to bring non-perishable food items. Awards for top finishers in all age categories.',
      organizer: 'Nassau County Parks',
      contact: 'parksinfo@nassaucountyny.gov',
      coordinates: [40.7292, -73.5850],
      image: 'https://picsum.photos/seed/turkeytrot/800/600'
    },
    { 
      id: 5, 
      day: 30, 
      month: 'NOV', 
      date: 'Nov 30, 2024',
      title: 'Holiday Light Show Opening', 
      time: '5:00 PM - 9:00 PM', 
      location: 'Jones Beach State Park', 
      type: 'Festival',
      description: 'The magic returns to Jones Beach! Drive through 2.5 miles of spectacular light displays synchronized to holiday music. This event runs through January 1st.',
      organizer: 'NY State Parks',
      contact: 'info@jonesbeach.com',
      coordinates: [40.5947, -73.5042],
      image: 'https://picsum.photos/seed/lightsfestival/800/600'
    },
    { 
      id: 6, 
      day: 4, 
      month: 'DEC', 
      date: 'Dec 4, 2024',
      title: 'Assessment Grievance Workshop', 
      time: '7:00 PM', 
      location: 'Hempstead Town Hall', 
      type: 'Government',
      description: 'Department of Assessment staff will explain the property tax grievance process. Homeowners can learn how to file a correction if they believe their assessed value is inaccurate.',
      organizer: 'Dept of Assessment',
      contact: 'assessment@nassaucountyny.gov',
      coordinates: [40.7062, -73.6187],
      image: 'https://picsum.photos/seed/townhallmeeting/800/600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-8">
        <div>
           <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-serif">Events Calendar</h1>
           <p className="text-slate-600 text-lg">Official government meetings, community festivals, and park programs.</p>
        </div>
        <div className="flex space-x-2 mt-6 md:mt-0">
            <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md font-bold text-sm flex items-center transition-all ${viewMode === 'list' ? 'bg-blue-900 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
                <List className="w-4 h-4 mr-2" /> List View
            </button>
            <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md font-bold text-sm flex items-center transition-all ${viewMode === 'grid' ? 'bg-blue-900 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
                <Grid className="w-4 h-4 mr-2" /> Grid View
            </button>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}`}>
        {events.map((evt) => (
          <div key={evt.id} className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col md:flex-row'}`}>
             
             {/* Image Container */}
             <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'w-full h-56' : 'w-full md:w-72 h-56 md:h-auto flex-shrink-0'}`}>
                <img 
                    src={evt.image || `https://picsum.photos/seed/${evt.id}/800/600`} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-0 left-0 p-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-lg p-2.5 text-center shadow-lg min-w-[64px]">
                       <span className="block text-xs font-black text-amber-600 uppercase tracking-widest">{evt.month}</span>
                       <span className="block text-2xl font-black text-slate-900 leading-none mt-0.5">{evt.day}</span>
                    </div>
                </div>
                {/* Type Badge on Image */}
                 <div className="absolute top-0 right-0 p-4">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-md
                        ${evt.type === 'Government' ? 'bg-blue-900/90 text-white' : 
                          evt.type === 'Festival' ? 'bg-purple-900/90 text-white' : 
                          evt.type === 'Sports' ? 'bg-green-900/90 text-white' : 
                          evt.type === 'Cultural' ? 'bg-amber-500/90 text-white' :
                          'bg-slate-800/90 text-white'}`}>
                        {evt.type}
                    </span>
                 </div>
             </div>

             {/* Content */}
             <div className="p-6 flex flex-col flex-grow">
                 <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
                    {evt.title}
                 </h3>
                 
                 <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-2.5 text-amber-500 flex-shrink-0 mt-0.5" /> 
                        <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start text-sm text-slate-500">
                        <MapPin className="w-4 h-4 mr-2.5 text-amber-500 flex-shrink-0 mt-0.5" /> 
                        <span className="line-clamp-1">{evt.location}</span>
                    </div>
                 </div>

                <button 
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full py-2.5 bg-slate-50 text-slate-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 transition-all text-sm flex items-center justify-center group/btn"
                >
                    Event Details <Info className="w-3 h-3 ml-2 group-hover/btn:scale-110 transition-transform" />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
            {/* Header Hero Image */}
            <div className="h-48 md:h-64 relative flex-shrink-0">
                <img 
                    src={selectedEvent.image || `https://picsum.photos/seed/${selectedEvent.id}/800/600`} 
                    className="w-full h-full object-cover" 
                    alt={selectedEvent.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            selectedEvent.type === 'Government' ? 'bg-blue-500 text-white' :
                            selectedEvent.type === 'Festival' ? 'bg-purple-500 text-white' :
                            'bg-amber-500 text-blue-950'
                       }`}>
                           {selectedEvent.type}
                       </span>
                       <span className="flex items-center text-sm font-bold text-slate-200">
                           <Calendar className="w-4 h-4 mr-1.5" /> {selectedEvent.date}
                       </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight shadow-black drop-shadow-md">{selectedEvent.title}</h2>
                </div>
                <button 
                    onClick={() => setSelectedEvent(null)} 
                    className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/20"
                >
                   <X className="w-6 h-6" />
                </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8 bg-white">
              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="flex items-center text-blue-900 font-bold mb-4 uppercase text-sm tracking-widest"><Clock className="w-4 h-4 mr-2" /> Logistics</h4>
                  <div className="space-y-3">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Date</span>
                          <span className="font-bold text-slate-900">{selectedEvent.date}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Time</span>
                          <span className="font-bold text-slate-900">{selectedEvent.time}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                          <span className="text-slate-600">Cost</span>
                          <span className="font-bold text-green-700">Free Admission</span>
                      </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="flex items-center text-blue-900 font-bold mb-4 uppercase text-sm tracking-widest"><User className="w-4 h-4 mr-2" /> Contact</h4>
                  <p className="text-slate-800 font-bold text-lg mb-1">{selectedEvent.organizer}</p>
                  <p className="text-slate-500 text-sm mb-4">Official Organizer</p>
                  <a href={`mailto:${selectedEvent.contact}`} className="text-blue-600 hover:text-blue-800 font-bold flex items-center bg-white px-4 py-2 rounded-lg border border-slate-200 inline-block transition-colors hover:border-blue-300"><Mail className="w-4 h-4 mr-2" /> Email Organizer</a>
                </div>
              </div>

              {/* Nearby & Map */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Venue Location</h3>
                    <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 relative">
                       <MapContainer center={selectedEvent.coordinates} zoom={15} scrollWheelZoom={false} className="h-full w-full z-0">
                         <TileLayer
                           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                         />
                         <Marker position={selectedEvent.coordinates} icon={customIcon}>
                           <Popup className="font-sans font-bold">{selectedEvent.location}</Popup>
                         </Marker>
                       </MapContainer>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                       <h3 className="text-sm font-bold text-amber-900 uppercase tracking-widest mb-4 flex items-center"><Utensils className="w-4 h-4 mr-2" /> Nearby Dining</h3>
                       <div className="space-y-4">
                           <div className="pb-3 border-b border-amber-200/50">
                               <span className="block font-bold text-slate-800">Local Favorite</span>
                               <span className="text-xs text-slate-500">Casual Dining • 0.5 mi</span>
                           </div>
                           <div>
                               <span className="block font-bold text-slate-800">Quick Bite</span>
                               <span className="text-xs text-slate-500">Fast Food • 0.8 mi</span>
                           </div>
                           <p className="text-xs text-slate-500 italic mt-4">
                               Check the Destinations page for more detailed dining guides.
                           </p>
                       </div>
                  </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-8 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;