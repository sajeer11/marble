
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative h-72 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <span className="material-icons text-primary text-4xl mb-2">contact_support</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="font-medium">Home</span>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-light">Contact</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch With Us</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            For more information about our premium marble products & services, please feel free to drop us an email. Our staff will always be there to help you out. Do not hesitate!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Column */}
          <div className="space-y-12">
            <div className="flex items-start group">
              <span className="material-icons-outlined text-3xl mr-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors">location_on</span>
              <div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Address</h3>
                <p className="text-gray-500 dark:text-gray-400">236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className="flex items-start group">
              <span className="material-icons-outlined text-3xl mr-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors">phone</span>
              <div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Phone</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Mobile: +(84) 546-6789<br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex items-start group">
              <span className="material-icons-outlined text-3xl mr-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors">access_time</span>
              <div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Working Time</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monday-Friday: 9:00 - 22:00<br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <form className="space-y-8 bg-white dark:bg-surface-dark p-10 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold mb-3">Your Name</label>
                  <input type="text" placeholder="Abc" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Email Address</label>
                  <input type="email" placeholder="Abc@def.com" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3">Subject</label>
                <input type="text" placeholder="This is an optional" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3">Message</label>
                <textarea rows={5} placeholder="Hi! I'd like to ask about..." className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-16 rounded shadow-lg transition-all transform active:scale-95 duration-200">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-24 h-[500px] rounded-2xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default Contact;
