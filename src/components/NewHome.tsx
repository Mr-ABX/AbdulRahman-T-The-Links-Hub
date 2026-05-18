import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Monitor, Paintbrush, PlayCircle, Rss, ArrowUpRight, Zap, Target, Star, Brain } from 'lucide-react';

const myArea51Image = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

export const Home = ({ projects, setActiveTab }: { projects: any[], setActiveTab: (tab: string) => void }) => {
  return (
    <div className="w-full relative bg-[#050505] min-h-screen text-white overflow-hidden pb-40">
      
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#6366f1] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[50%] h-[50%] bg-[#ec4899] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="h-screen pt-24 pb-12 flex flex-col items-center justify-center text-center max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8 relative w-full max-w-[900px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl -z-10" />
          <h1 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
            UNLEASH YOUR<br />IMAGINATION
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-mono text-indigo-400 text-lg md:text-2xl tracking-[0.2em] uppercase font-bold italic mb-12 flex items-center justify-center gap-4">
            <span className="opacity-50">—</span>
            Think. Make. Solve.
            <span className="opacity-50">—</span>
          </p>

          <button 
            onClick={() => setActiveTab('Projects')}
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest text-sm uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl shadow-indigo-500/10 hover:border-indigo-500/50"
          >
            Explore More <ArrowRight size={16} />
          </button>
        </motion.div>
        
        {/* Logos Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full flex justify-center items-center gap-6 md:gap-12 mt-24 flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        >
          {['Plotnao', 'Jangle', 'Junno', 'Innovative', 'Cherry'].map((logo, i) => (
            <div key={i} className="text-lg md:text-xl font-black tracking-widest uppercase flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
              </div>
              {logo}
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. Area 51 (About) */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="relative rounded-full aspect-square overflow-hidden border border-white/10 shadow-2xl group">
              <img src={myArea51Image} alt="Area 51 of Creatives" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-2 lowercase tracking-tighter leading-none italic">
              MY AREA-51<br />
              <span className="text-white not-italic uppercase tracking-tight ml-4">OF CREATIVES</span>
            </h2>
            <p className="mt-8 text-white/80 leading-relaxed font-medium uppercase tracking-wide text-sm border-l-2 border-indigo-500 pl-6">
              Hi! Abdulrahman-T this side. I'm empowering human connection through design, cross-platform adventures & user-friendly solutions. I ignite engagement that leaves a lasting impression. Ready for accuracy, impact, and a soaring return on investment?
            </p>
            
            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 relative">
              <div className="absolute -top-4 -left-4 text-6xl text-indigo-500/30">"</div>
              <p className="text-white/60 font-serif italic text-lg text-center relative z-10 leading-relaxed">
                Design is the bridge that connects creativity and functionality, resulting in beautiful solutions that solve real-world problems.
              </p>
              <div className="mt-4 text-center text-sm font-bold text-white/40 uppercase tracking-widest">— Abdulrahman-T</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8 relative">
        <h2 className="text-[12vw] md:text-[180px] font-black leading-none text-transparent text-outline-indigo text-center mb-24 opacity-80 pointer-events-none select-none">
          SERVICES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 -mt-20 md:-mt-40">
          {[
            { title: "UI/UX", desc: "Designing captivating and user-friendly interfaces that keep your audience hooked.", icon: <Monitor size={24}/>, color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "Graphic Designs", desc: "Visually striking graphics that communicate your brand's message with a lasting impression.", icon: <Paintbrush size={24}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "Video & Motion Graphics", desc: "Dynamics that ignite your audience's imagination and connect them on a deeper level.", icon: <PlayCircle size={24}/>, color: "text-pink-400", bg: "bg-pink-500/10" },
            { title: "Digital Marketing", desc: "Digital marketing solutions that optimize your online presence and maximize your ROI.", icon: <Target size={24}/>, color: "text-orange-400", bg: "bg-orange-500/10" },
            { title: "Web Design & Development", desc: "Websites with great user experiences, drive growth and elevate your brand in the digital sphere.", icon: <Rss size={24}/>, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { title: "AI Automation", desc: "Intelligent systems that automate tasks, scaling your operations to new heights.", icon: <Brain size={24}/>, color: "text-indigo-400", bg: "bg-indigo-500/10" }
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                {React.cloneElement(s.icon, { size: 100 })}
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-xl ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => setActiveTab('Services')}
            className="w-full max-w-md mx-auto py-5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-xl shadow-indigo-500/20"
          >
            All Services »
          </button>
        </div>
      </section>

      {/* 4. Portfolio */}
      <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8 relative border-t border-white/5">
        <h2 className="text-[12vw] md:text-[180px] font-black leading-none text-transparent text-outline-indigo text-center mb-8 opacity-80 pointer-events-none select-none">
          PORTFOLIO
        </h2>
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-2xl md:text-3xl font-bold leading-tight">
            I'm passionate about everything that has to do with Digital Design and Art Direction Motion Graphics and Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveTab('Projects')}
            >
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative bg-white/5">
                <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                {p.url && p.url !== '#' ? (
                  <img 
                    src={`https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center fill-white/20 text-white/20">
                    <div className="scale-150 mb-4">{p.icon}</div>
                    <span className="font-bold uppercase tracking-widest text-xs">Unreleased</span>
                  </div>
                )}
                
                {/* Floating link icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all z-20 shadow-2xl">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <h3 className="font-bold text-2xl uppercase tracking-wide mb-2 group-hover:text-indigo-400 transition-colors">{p.name}</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{p.mainCategory}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button 
            onClick={() => setActiveTab('Projects')}
            className="w-full max-w-md mx-auto py-5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-xl shadow-indigo-500/20"
          >
            See All Projects »
          </button>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <h2 className="text-[6vw] md:text-[90px] font-black leading-none text-transparent text-outline-indigo text-center mb-24 opacity-80 select-none">
          WHAT OUR CLIENTS SAY
        </h2>

        <div className="flex flex-col md:flex-row items-center bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 border border-white/5 gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
          
          <div className="w-full md:w-1/3 aspect-square rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-end p-8 relative overflow-hidden shrink-0 shadow-2xl">
            <h3 className="text-2xl font-bold mb-1 relative z-10">Mary Thomas</h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest relative z-10">Client</p>
            <div className="absolute -bottom-10 -right-4 text-[150px] font-serif leading-none text-white/20 select-none font-black italic">
              "
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex gap-1 text-yellow-500 mb-6">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
              "Working with Abdulrahman on our website design and development was a breeze. Their team was responsive and creative, and truly listened to our needs. We now have a website that not only looks great but also provides a user experience that sets us apart from the competition."
            </p>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Area */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-[#050505] rounded-[3rem] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row gap-16 relative overflow-hidden items-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
          
          {/* Statue / Visual */}
          <div className="w-full md:w-1/2 relative hidden md:block">
             <div className="aspect-[3/4] bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden mix-blend-luminosity grayscale group hover:grayscale-0 hover:mix-blend-normal transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Statue" />
             </div>
          </div>
          
          <div className="w-full md:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent text-outline-indigo lowercase italic tracking-tighter">
              START YOUR<br />PROJECT NOW
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <input type="text" placeholder="Title" className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors" />
              <textarea placeholder="Message" rows={6} className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"></textarea>
              
              <label className="flex items-start gap-4 text-xs font-bold text-white/50 uppercase tracking-widest cursor-pointer group">
                <input type="checkbox" className="mt-0.5 accent-indigo-500 w-4 h-4 cursor-pointer" />
                <span className="group-hover:text-white/70 transition-colors">I consent to the conditions.</span>
              </label>
              
              <button type="button" onClick={() => setActiveTab('Connect')} className="w-full py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-indigo-500/20">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Title */}
      <div className="text-center py-20 overflow-hidden relative border-t border-white/10 mt-12">
        <h2 className="text-[5vw] whitespace-nowrap font-black uppercase tracking-tight opacity-90 px-4 flex items-center justify-center gap-4">
          BRINGS YOUR SITE TO LIFE WITH 
          <span className="text-transparent text-outline-indigo italic">CREATIVITY</span>
        </h2>
      </div>

    </div>
  );
};
