import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  const directory = [
    { dept: 'General Information', phone: '516-571-3000', email: 'info@nassaucountyny.gov' },
    { dept: 'Police (Non-Emergency)', phone: '516-573-8800', email: 'pdinfo@nassaucountyny.gov' },
    { dept: 'Department of Health', phone: '516-227-9697', email: 'health@nassaucountyny.gov' },
    { dept: 'Parks & Recreation', phone: '516-572-0200', email: 'parks@nassaucountyny.gov' },
    { dept: 'Social Services', phone: '516-227-8519', email: 'dss@nassaucountyny.gov' },
    { dept: 'Consumer Affairs', phone: '516-571-2600', email: 'consumer@nassaucountyny.gov' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-slate-300">We are here to help. Reach out to county departments or report an issue.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-amber-500" /> Send a Message
              </h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for contacting Nassau County. We will review your inquiry shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-blue-600 font-bold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                      <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                      <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                    <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jane@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>General Inquiry</option>
                      <option>Public Works / Roads</option>
                      <option>Parks</option>
                      <option>Health</option>
                      <option>Taxes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we assist you?"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Directory & Info */}
          <div className="space-y-8">
             <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Main Office</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-amber-600 mr-3 mt-1" />
                    <div>
                      <p className="font-bold text-slate-800">Theodore Roosevelt Executive and Legislative Building</p>
                      <p className="text-slate-600">1550 Franklin Avenue<br/>Mineola, NY 11501</p>
                      <a href="https://maps.google.com/?q=1550+Franklin+Ave+Mineola+NY" target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-bold mt-1 inline-block hover:underline">Get Directions</a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-amber-600 mr-3" />
                    <a href="tel:5165713000" className="text-lg font-bold text-slate-800 hover:text-blue-600">516-571-3000</a>
                  </div>
                </div>
             </div>

             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Department Directory</h2>
               <div className="grid gap-4">
                 {directory.map((item) => (
                   <div key={item.dept} className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition flex flex-col sm:flex-row justify-between sm:items-center">
                     <div className="mb-2 sm:mb-0">
                       <h3 className="font-bold text-slate-800">{item.dept}</h3>
                       <a href={`mailto:${item.email}`} className="text-sm text-slate-500 hover:text-blue-600 flex items-center"><Mail className="w-3 h-3 mr-1"/> {item.email}</a>
                     </div>
                     <a href={`tel:${item.phone.replace(/-/g, '')}`} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-100 hover:text-green-800 transition flex items-center justify-center w-full sm:w-auto">
                       <Phone className="w-3 h-3 mr-2" /> {item.phone}
                     </a>
                   </div>
                 ))}
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;