import React, { useState } from 'react';
import { Search, ExternalLink, GraduationCap, MapPin, Building2 } from 'lucide-react';

const Schools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive list of Nassau County School Districts
  const schoolDistricts = [
    { name: "Baldwin Union Free School District", url: "https://www.baldwinschools.org", town: "Baldwin" },
    { name: "Bellmore-Merrick Central High School District", url: "https://www.bellmore-merrick.k12.ny.us", town: "Merrick" },
    { name: "Bethpage Union Free School District", url: "https://www.bethpage.ws", town: "Bethpage" },
    { name: "Carle Place Union Free School District", url: "https://www.cps.k12.ny.us", town: "Carle Place" },
    { name: "East Meadow Union Free School District", url: "https://www.eastmeadow.k12.ny.us", town: "East Meadow" },
    { name: "East Rockaway Union Free School District", url: "https://www.eastrockawayschools.org", town: "East Rockaway" },
    { name: "East Williston Union Free School District", url: "https://www.ewsdonline.org", town: "Old Westbury" },
    { name: "Elmont Union Free School District", url: "https://www.elmontschools.org", town: "Elmont" },
    { name: "Farmingdale Union Free School District", url: "https://www.farmingdaleschools.org", town: "Farmingdale" },
    { name: "Floral Park-Bellerose Union Free School District", url: "https://www.fpbsd.org", town: "Floral Park" },
    { name: "Franklin Square Union Free School District", url: "https://www.franklinsquare.k12.ny.us", town: "Franklin Square" },
    { name: "Freeport Public Schools", url: "https://www.freeportschools.org", town: "Freeport" },
    { name: "Garden City Union Free School District", url: "https://www.gardencity.k12.ny.us", town: "Garden City" },
    { name: "Glen Cove City School District", url: "https://www.glencoveschools.org", town: "Glen Cove" },
    { name: "Great Neck Public Schools", url: "https://www.greatneck.k12.ny.us", town: "Great Neck" },
    { name: "Hempstead Union Free School District", url: "https://www.hempsteadschools.org", town: "Hempstead" },
    { name: "Herricks Union Free School District", url: "https://www.herricks.org", town: "New Hyde Park" },
    { name: "Hewlett-Woodmere Public Schools", url: "https://www.hewlett-woodmere.net", town: "Woodmere" },
    { name: "Hicksville Public Schools", url: "https://www.hicksvillepublicschools.org", town: "Hicksville" },
    { name: "Island Park Union Free School District", url: "https://www.ips.k12.ny.us", town: "Island Park" },
    { name: "Island Trees Union Free School District", url: "https://www.islandtrees.org", town: "Levittown" },
    { name: "Jericho Union Free School District", url: "https://www.jerichoschools.org", town: "Jericho" },
    { name: "Lawrence Union Free School District", url: "https://www.lawrence.org", town: "Lawrence" },
    { name: "Levittown Union Free School District", url: "https://www.levittownschools.com", town: "Levittown" },
    { name: "Locust Valley Central School District", url: "https://www.lvcsd.k12.ny.us", town: "Locust Valley" },
    { name: "Long Beach Public Schools", url: "https://www.lbeach.org", town: "Long Beach" },
    { name: "Lynbrook Union Free School District", url: "https://www.lynbrookschools.org", town: "Lynbrook" },
    { name: "Malverne Union Free School District", url: "https://www.malverne.k12.ny.us", town: "Malverne" },
    { name: "Manhasset Union Free School District", url: "https://www.manhassetschools.org", town: "Manhasset" },
    { name: "Massapequa Union Free School District", url: "https://www.msd.k12.ny.us", town: "Massapequa" },
    { name: "Merrick Union Free School District", url: "https://www.merrick.k12.ny.us", town: "Merrick" },
    { name: "Mineola Union Free School District", url: "https://www.mineola.k12.ny.us", town: "Mineola" },
    { name: "New Hyde Park-Garden City Park Union Free School District", url: "https://www.nhp-gcp.org", town: "New Hyde Park" },
    { name: "North Bellmore Union Free School District", url: "https://www.northbellmoreschools.org", town: "Bellmore" },
    { name: "North Merrick Union Free School District", url: "https://www.nmerrickschools.org", town: "Merrick" },
    { name: "North Shore Central School District", url: "https://www.northshore.k12.ny.us", town: "Sea Cliff" },
    { name: "Oceanside Union Free School District", url: "https://www.oceansideschools.org", town: "Oceanside" },
    { name: "Oyster Bay-East Norwich Central School District", url: "https://www.obenschools.org", town: "Oyster Bay" },
    { name: "Plainedge Union Free School District", url: "https://www.plainedgeschools.org", town: "North Massapequa" },
    { name: "Plainview-Old Bethpage Central School District", url: "https://www.pobschools.org", town: "Plainview" },
    { name: "Port Washington Union Free School District", url: "https://www.portnet.org", town: "Port Washington" },
    { name: "Rockville Centre Union Free School District", url: "https://www.rvcschools.org", town: "Rockville Centre" },
    { name: "Roosevelt Union Free School District", url: "https://www.roosevelt.k12.ny.us", town: "Roosevelt" },
    { name: "Roslyn Union Free School District", url: "https://www.roslynschools.org", town: "Roslyn" },
    { name: "Seaford Union Free School District", url: "https://www.seaford.k12.ny.us", town: "Seaford" },
    { name: "Sewanhaka Central High School District", url: "https://www.sewanhakaschools.org", town: "Floral Park" },
    { name: "Syosset Central School District", url: "https://www.syossetschools.org", town: "Syosset" },
    { name: "Uniondale Union Free School District", url: "https://www.uniondaleschools.org", town: "Uniondale" },
    { name: "Valley Stream Central High School District", url: "https://www.vschsd.org", town: "Valley Stream" },
    { name: "Wantagh Union Free School District", url: "https://www.wantaghschools.org", town: "Wantagh" },
    { name: "West Hempstead Union Free School District", url: "https://www.whufsd.com", town: "West Hempstead" },
    { name: "Westbury Union Free School District", url: "https://www.westburyschools.org", town: "Old Westbury" }
  ];

  const filteredDistricts = schoolDistricts.filter(
    (district) => 
      district.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      district.town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif">School Districts</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Directory of the 50+ independent school districts serving Nassau County's diverse communities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search by district name or town..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pl-12 rounded-xl shadow-lg border-0 ring-1 ring-slate-200 focus:ring-4 focus:ring-blue-500/20 text-lg outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            </div>
            <p className="text-center text-slate-500 text-sm mt-3">
                Showing {filteredDistricts.length} of {schoolDistricts.length} districts
            </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200 p-6 transition-all duration-300 flex flex-col group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> {district.town}
                        </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                        {district.name}
                    </h3>
                    
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                        Serving the community of {district.town} and surrounding areas.
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <a 
                            href={district.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-2.5 bg-slate-50 text-blue-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm group/btn"
                        >
                            Visit Official Website 
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            ))
          ) : (
             <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                 <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-700">No districts found</h3>
                 <p className="text-slate-500">Try adjusting your search terms.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schools;