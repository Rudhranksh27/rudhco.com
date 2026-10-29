export default function SiteFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="mt-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                <a href="tel:+919864658393" className="text-slate-700 font-medium hover:text-amber-500 transition-colors">+91 98646 58393</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="mt-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                <a href="mailto:business@rudhco.com" className="text-slate-700 font-medium hover:text-amber-500 transition-colors">business@rudhco.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="mt-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                <p className="text-slate-700 font-medium max-w-xs leading-relaxed">House no. 6, Sadabor avenue, 2nd floor, bylane no. 7, Mother Teresa road, Guwahati -781021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-64 md:h-full min-h-62.5 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            title="Rudhco office location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7161.434728997843!2d91.7786602813255!3d26.173332733325708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59a811ed3e65%3A0x79fa7ed6ed986926!2sGeeta%20Nagar%2C%20Guwahati%2C%20Assam%20781024!5e0!3m2!1sen!2sin!4v1790850570099!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-xs tracking-widest uppercase">
        © 2026 RUDHCO INFRA &amp; TECH PVT. LTD. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
