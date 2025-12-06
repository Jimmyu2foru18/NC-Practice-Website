import React from 'react';
import { HistoryItem } from '../types';
import { Anchor, MapPin, Plane, Building, Users } from 'lucide-react';

const History: React.FC = () => {
  const historyData: HistoryItem[] = [
    {
      year: '1643',
      title: 'First Settlement',
      description: 'English settlers from Connecticut establish Hempstead, obtaining a patent from New Netherland. Around the same time, Robert Williams purchases land that would become Oyster Bay from local Native American tribes.',
      image: 'https://picsum.photos/seed/nassau1643/400/300'
    },
    {
      year: '1664',
      title: 'British Takeover',
      description: 'The British fleet captures New Amsterdam, renaming it New York. Long Island becomes part of the Province of New York. The county of Yorkshire is established, including present-day Nassau, Suffolk, and Queens.',
      image: 'https://picsum.photos/seed/nassau1664/400/300'
    },
    {
      year: '1776',
      title: 'Revolutionary War Occupation',
      description: 'Following the Battle of Long Island, British forces occupy the area for the duration of the Revolutionary War. Many residents are Loyalists, creating deep divisions within the community.',
      image: 'https://picsum.photos/seed/nassau1776/400/300'
    },
    {
      year: '1898',
      title: 'Greater New York Created',
      description: 'The western towns of Queens County join the consolidated City of New York. The three eastern towns—Hempstead, North Hempstead, and Oyster Bay—vote against consolidation, setting the stage for separation.',
      image: 'https://picsum.photos/seed/nassau1898/400/300'
    },
    {
      year: '1899',
      title: 'Nassau County Formed',
      description: 'On January 1st, Nassau County is officially established. The county seat is located in Mineola. The name "Nassau" honors William of Nassau, Prince of Orange.',
      image: 'https://picsum.photos/seed/nassau1899/400/300'
    },
    {
      year: '1900-1930',
      title: 'The Gold Coast Era',
      description: 'Wealthy industrialists including the Vanderbilts, Roosevelts, and Guggenheims build lavish estates along the North Shore. This era of opulence is later immortalized in F. Scott Fitzgerald\'s "The Great Gatsby".',
      image: 'https://picsum.photos/seed/nassaugoldcoast/400/300'
    },
    {
      year: '1927',
      title: 'Aviation History Made',
      description: 'Charles Lindbergh takes off from Roosevelt Field in the Spirit of St. Louis, completing the first solo transatlantic flight to Paris. Nassau becomes known as the "Cradle of Aviation".',
      image: 'https://picsum.photos/seed/lindbergh/400/300'
    },
    {
      year: '1947',
      title: 'Birth of Suburbia',
      description: 'Levitt & Sons begin construction of Levittown. Utilizing mass-production techniques, they build thousands of affordable homes for returning WWII veterans, creating the archetype for the modern American suburb.',
      image: 'https://picsum.photos/seed/levittown/400/300'
    },
    {
      year: '1972',
      title: 'Nassau Coliseum Opens',
      description: 'The Nassau Veterans Memorial Coliseum opens its doors. It becomes the home of the New York Islanders (NHL) and the New York Nets (ABA/NBA), hosting major concerts and events.',
      image: 'https://picsum.photos/seed/coliseum/400/300'
    },
    {
      year: '2011',
      title: 'The Hub Redevelopment',
      description: 'Nassau County voters approve plans to redevelop the area around the Coliseum, aiming to create a biotech park and mixed-use commercial center known as the "Nassau Hub".',
      image: 'https://picsum.photos/seed/nassauhub/400/300'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-blue-900 overflow-hidden">
         <img src="https://picsum.photos/seed/nassauhistoryhero/1920/800" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Historical Nassau" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/50 to-transparent"></div>
         <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 font-serif">Our Heritage</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
              From the rolling plains of Hempstead to the Gold Coast mansions, explore the timeline that shaped Nassau County.
            </p>
         </div>
      </div>

      {/* Intro Stats */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                 <Building className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                 <h3 className="text-4xl font-black text-slate-900 mb-1">1899</h3>
                 <p className="text-slate-600 font-medium">Year Founded</p>
              </div>
              <div className="p-6 border-l-0 md:border-l border-slate-100">
                 <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                 <h3 className="text-4xl font-black text-slate-900 mb-1">1.39M</h3>
                 <p className="text-slate-600 font-medium">Population (Est.)</p>
              </div>
              <div className="p-6 border-l-0 md:border-l border-slate-100">
                 <Plane className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                 <h3 className="text-4xl font-black text-slate-900 mb-1">Cradle</h3>
                 <p className="text-slate-600 font-medium">of Aviation</p>
              </div>
           </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

          {historyData.map((item, index) => (
            <div key={item.year} className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-amber-500 border-4 border-white rounded-full transform -translate-x-1/2 mt-6 shadow-md z-10"></div>

              {/* Content Side */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full mb-3">{item.year}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                 </div>
              </div>

              {/* Image Side */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-12 flex items-center justify-center">
                 <div className="w-full h-64 overflow-hidden rounded-2xl shadow-md border border-slate-200 group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                    />
                 </div>
              </div>
            </div>
          ))}

          {/* End Node */}
          <div className="absolute left-4 md:left-1/2 bottom-0 w-8 h-8 bg-blue-900 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg flex items-center justify-center">
             <Anchor className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;