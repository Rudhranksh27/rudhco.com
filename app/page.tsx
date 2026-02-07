import Navbar from '../app/navbar';
import Image from 'next/image';
import CarOutline from '../images/car_outline.jpg';
import HomeOutline from '../images/home01.png';
import Link from 'next/dist/client/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-grow flex flex-col items-center w-full">

           {/* =========================================
            SECTION 1: CONSTRUCTION (Homes)
            ========================================= */}
        <section className="w-full min-h-[85vh] flex justify-center items-center p-6 md:p-20 m-20 relative overflow-hidden">
           {/* Background Gradient Effect */}
           <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-amber-900/10 to-transparent pointer-events-none" />

           {/* Note: md:flex-row-reverse creates the zig-zag layout */}
           <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 max-w-7xl w-full z-10">
              
              {/* Text Block */}
              <div className="flex-1 space-y-8 text-center md:text-left">
                  <div>
                    <h2 className="text-amber-500 tracking-[0.2em] text-xs md:text-sm font-bold uppercase mb-3">
                      Architectural Vision
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                      Rudhranksh <br/> Construction
                    </h1>
                  </div>
                  
                  <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                    Your ultimate destination to construct the perfect Home. Explore premium materials and bespoke designs to build your legacy.
                  </p>
                  
                  <Link href="/contact">
                    <button className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-amber-500 transition-all duration-300 w-full md:w-auto">
                      <span className="relative z-10 text-white group-hover:text-amber-500 font-bold tracking-widest text-sm uppercase transition-colors">
                        Contact Constructor
                      </span>
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/5"></div>
                    </button>
                  </Link>
              </div>

              {/* Image Block */}
              <div className="flex-1 w-full max-w-[600px] relative group perspective-1000">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <Image
                    src={HomeOutline}
                    alt="Luxury Home Outline"
                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out transform group-hover:scale-[1.02]"
                  />
              </div>
           </div>
        </section>

        {/* Visual Divider Line */}
        <div className="w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>


      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm tracking-wide">
          &copy; 2026 RUDHRANKSH INFRA & TECH PVT. LTD. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}