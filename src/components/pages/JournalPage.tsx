import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Send, Twitter, Linkedin, Github, Youtube } from "lucide-react";

export const JournalPage = () => {
  return (
    <div className="space-y-12 pb-20 max-w-[1400px] mx-auto px-4">
      <header className="pt-20 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          The <span className="text-emerald-400">Journal</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto font-light">
          Deep dives into full-stack architecture, AI workflows, and the business of digital creation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {[
            {
              title: "Building the Pro Business Suite: A Technical Deep Dive",
              date: "April 10, 2026",
              readTime: "12 min read",
              category: "Engineering",
              excerpt: "How I architected a suite of professional tools using Gemini 1.5 Pro and a modular React architecture for maximum scalability.",
              image: "https://picsum.photos/seed/tech/800/400",
            },
            {
              title: "The Future of AI-Powered Workflows in n8n",
              date: "April 05, 2026",
              readTime: "8 min read",
              category: "Automation",
              excerpt: "Exploring the integration of autonomous agents within the n8n ecosystem to handle complex, multi-step business processes.",
              image: "https://picsum.photos/seed/automation/800/400",
            },
            {
              title: "Monetizing Your SaaS: Beyond the Subscription Model",
              date: "March 28, 2026",
              readTime: "15 min read",
              category: "Business",
              excerpt: "Why usage-based pricing and integrated ad networks are becoming the gold standard for modern full-stack creators.",
              image: "https://picsum.photos/seed/business/800/400",
            },
          ].map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden border border-white/10 group cursor-pointer hover:border-emerald-500/30 transition-all"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  {post.category}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-emerald-400 font-bold text-sm group-hover:gap-4 transition-all">
                  Read Full Article <ArrowRight size={16} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Newsletter Card */}
          <div className="glass rounded-3xl p-8 border border-white/10 bg-emerald-500/5 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-bold">Weekly Insights</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Join 2,500+ creators receiving my weekly deep dives on tech, business, and AI.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                />
                <button className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {["Engineering", "AI", "Business", "Automation", "Design", "Productivity"].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold">Stay Connected</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Twitter size={18} />, label: "Twitter", color: "hover:text-blue-400" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", color: "hover:text-blue-600" },
                { icon: <Github size={18} />, label: "GitHub", color: "hover:text-white" },
                { icon: <Youtube size={18} />, label: "YouTube", color: "hover:text-red-500" },
              ].map((social, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium transition-all ${social.color}`}
                >
                  {social.icon}
                  {social.label}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
