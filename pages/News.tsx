import React, { useEffect, useState } from 'react';
import { Loader, ExternalLink, Calendar, RefreshCcw, ArrowUpRight } from 'lucide-react';
import { fetchRealNews } from '../services/geminiService';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    setLoading(true);
    const items = await fetchRealNews(20); // Request more to fill categories
    setNews(items);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const sources = [
    { name: 'News 12 Long Island', color: 'bg-blue-600', textColor: 'text-blue-700' },
    { name: 'Newsday', color: 'bg-amber-600', textColor: 'text-amber-700' },
    { name: 'New York Times', color: 'bg-slate-800', textColor: 'text-slate-800' },
    { name: 'LI Herald', color: 'bg-cyan-600', textColor: 'text-cyan-700' },
    { name: 'Patch', color: 'bg-green-600', textColor: 'text-green-700' }
  ];

  const getSourceNews = (sourceName: string) => {
      // Flexible matching for source names
      return news.filter(item => item.source.toLowerCase().includes(sourceName.toLowerCase().split(' ')[0]));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-[96px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900 mb-1 font-serif">Newsstand</h1>
               <p className="text-slate-600">Curated updates from trusted local partners.</p>
            </div>
            <button onClick={loadNews} className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition font-bold border border-blue-200">
               <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh Feeds
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-lg">Gathering headlines from across Long Island...</p>
          </div>
        ) : (
           sources.map((source) => {
               const sourceItems = getSourceNews(source.name);
               if (sourceItems.length === 0) return null;

               return (
                   <div key={source.name} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                       <div className="flex items-center mb-6 border-b border-slate-200 pb-4">
                           <div className={`w-1.5 h-8 ${source.color} mr-3 rounded-full shadow-sm`}></div>
                           <h2 className="text-2xl font-bold text-slate-900">{source.name}</h2>
                           <span className="ml-auto bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{sourceItems.length} Stories</span>
                       </div>
                       
                       {/* Grid Layout */}
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                           {sourceItems.map((item, idx) => (
                               <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                   <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden h-48 bg-slate-100">
                                        <img 
                                            src={`https://picsum.photos/seed/${item.id}news/600/400`} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white font-bold flex items-center text-sm">Read Article <ArrowUpRight className="w-4 h-4 ml-1" /></span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                   </a>
                                   
                                   <div className="p-5 flex flex-col flex-grow">
                                       <div className="flex justify-between items-center mb-3">
                                            <div className="text-xs text-slate-400 flex items-center font-medium">
                                                <Calendar className="w-3 h-3 mr-1" /> {item.date}
                                            </div>
                                            <span className={`text-[10px] font-bold ${source.textColor} uppercase tracking-wider`}>
                                                {source.name}
                                            </span>
                                       </div>
                                       
                                       <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition">
                                           <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                                               {item.title}
                                           </a>
                                       </h3>
                                       
                                       <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                                           {item.summary}
                                       </p>
                                       
                                       <div className="mt-auto pt-4 border-t border-slate-50">
                                           <a 
                                                href={item.url || '#'} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                           >
                                               Full Story <ExternalLink className="w-3 h-3 ml-1" />
                                           </a>
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               );
           })
        )}
        
        {!loading && news.length === 0 && (
             <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-lg font-medium">Unable to load news feeds at this time.</p>
                 <button onClick={loadNews} className="mt-4 text-blue-600 font-bold hover:underline">Try Again</button>
             </div>
        )}
      </div>
    </div>
  );
};

export default News;