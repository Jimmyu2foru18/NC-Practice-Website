import React from 'react';
import { MapPin, Users, History, Anchor, ChevronRight, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-96 bg-blue-900 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/nassauhistory/1920/600" 
          alt="Historic Nassau" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2">About Us</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 font-serif">Nassau County</h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium">
            A diverse community of 1.39 million residents, rich in history, culture, and economic opportunity.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Population', value: '1.39 M', icon: Users, sub: '2020 Census' },
            { label: 'Founded', value: '1899', icon: History, sub: 'Jan 1st' },
            { label: 'Land Area', value: '285 sq mi', icon: MapPin, sub: 'Total Area' },
            { label: 'Median Income', value: '$126k', icon: BarChart, sub: 'Per Household' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
              <div className="bg-blue-50 p-4 rounded-full text-blue-600">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">{stat.label}</div>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-slate-400 text-xs">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Overview</h2>
              <div className="prose prose-lg text-slate-600 leading-relaxed">
                <p>
                  Nassau County is a suburban county on Long Island, immediately east of New York City. It is one of the four counties that occupy Long Island, together with Suffolk County, Queens, and Kings (Brooklyn).
                </p>
                <p>
                   Designated as one of the highest-income counties in the United States, Nassau is known for its high-performing schools, safe communities, and extensive park system. The county serves as a major gateway between the metropolis of New York City and the scenic beauty of Suffolk County.
                </p>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-6">
                 <h2 className="text-3xl font-bold text-slate-900 font-serif">Our Towns & Cities</h2>
                 <Link to="/map" className="text-blue-600 font-bold hover:underline">View Map</Link>
              </div>
              <p className="text-slate-600 mb-8 text-lg">
                The county is divided into three major towns and two cities, each with unique character and governance.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Town of Hempstead', pop: '793,000+', desc: 'The most populous civil township in the US, known for Jones Beach and Levittown.' },
                  { name: 'Town of Oyster Bay', pop: '301,000+', desc: 'Extends from North to South Shore, home to Sagamore Hill.' },
                  { name: 'Town of North Hempstead', pop: '237,000+', desc: 'Located on the "Gold Coast" with historic estates and villages.' },
                  { name: 'City of Long Beach', pop: '35,000+', desc: 'A barrier island resort community known for its boardwalk and surfing.' },
                  { name: 'City of Glen Cove', pop: '28,000+', desc: 'A historic waterfront city on the North Shore with a rich maritime history.' },
                ].map((place) => (
                  <div key={place.name} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center group">
                    <div>
                        <h3 className="font-bold text-blue-900 text-xl mb-1 group-hover:text-blue-700">{place.name}</h3>
                        <p className="text-slate-500 text-sm mb-2 sm:mb-0">{place.desc}</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2 rounded-lg text-center min-w-[100px]">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Population</span>
                        <span className="block font-black text-slate-800">{place.pop}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-32 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Explore More</h3>
              
              <Link to="/history" className="block group mb-4">
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 group-hover:border-amber-300 transition-colors">
                    <History className="w-8 h-8 text-amber-600 mb-3" />
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Our History</h4>
                    <p className="text-slate-600 text-sm mb-3">Explore the timeline from 1643 to today.</p>
                    <span className="text-amber-700 font-bold text-sm flex items-center group-hover:underline">View Timeline <ChevronRight className="w-4 h-4 ml-1"/></span>
                </div>
              </Link>

              <div className="space-y-2 mt-8">
                 <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Government Links</h4>
                 <Link to="/government" className="block p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-blue-700 font-medium transition-colors border border-transparent hover:border-slate-200">Executive & Legislature</Link>
                 <Link to="/contact" className="block p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-blue-700 font-medium transition-colors border border-transparent hover:border-slate-200">Department Directory</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;