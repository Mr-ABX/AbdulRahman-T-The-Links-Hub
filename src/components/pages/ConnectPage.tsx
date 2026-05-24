import React from "react";
import { motion } from "motion/react";
import { Zap, MessageCircle, Mail, Instagram, Linkedin, Github, Twitter, Youtube, Facebook } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { MedusaImage } from "../MedusaImage";

export const ConnectPage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
      {/* 3D Interactive Medusa Image Card */}
      <BentoCard
        size="4x1"
        className="bg-transparent border-transparent relative overflow-visible md:col-span-4 perspective-[1000px]"
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
        <div className="relative z-10 w-full h-[400px]">
          <MedusaImage />
        </div>
      </BentoCard>

      {/* Calendly Card */}
      <BentoCard
        size="2x2"
        className="bg-amber-500/5 border-amber-500/10 group/cal cursor-pointer"
        onClick={() =>
          window.open(
            "https://calendly.com/digital-b3asts/quick-free-consultation",
            "_blank",
          )
        }
      >
        <div className="flex flex-col h-full justify-center items-center text-center p-8">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover/cal:scale-110 transition-transform duration-500">
            <Zap size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Free Consultation</h3>
          <p className="text-white/40 text-sm mb-6 font-light">
            Book a 15-min strategy call
          </p>
          <button className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">
            Schedule Now
          </button>
        </div>
      </BentoCard>

      {/* WhatsApp Card */}
      <BentoCard
        size="2x2"
        className="bg-emerald-500/5 border-emerald-500/10 group/wa"
      >
        <div className="flex flex-col h-full justify-center items-center text-center p-8">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover/wa:scale-110 transition-transform duration-500">
            <MessageCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-2">WhatsApp Me</h3>
          <p className="text-white/40 text-sm mb-6 font-light">
            +92 309 4506904
          </p>
          <a
            href="https://wa.me/923094506904"
            target="_blank"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
          >
            Start Chat
          </a>
        </div>
      </BentoCard>

      {/* Main Email */}
      <BentoCard
        size="2x1"
        className="bg-indigo-500/5 border-indigo-500/10"
      >
        <div className="flex items-center justify-between h-full">
          <div>
            <h3 className="font-bold">Contact Inquiries</h3>
            <p className="text-xs text-white/40">
              abdulrahmant.official@gmail.com
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="mailto:abdulrahmant.official@gmail.com"
            className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400"
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </BentoCard>

      {/* Secondary Email */}
      <BentoCard size="2x1" className="bg-white/[0.02]">
        <div className="flex items-center justify-between h-full">
          <div>
            <h3 className="font-bold">Secondary Email</h3>
            <p className="text-xs text-white/40">
              digital.b3asts@gmail.com
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="mailto:digital.b3asts@gmail.com"
            className="p-3 rounded-2xl bg-white/5 text-white/60"
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </BentoCard>

      {/* Social Grid */}
      <BentoCard size="2x1" className="bg-white/[0.01]">
        <div className="flex items-center justify-around h-full w-full flex-wrap gap-2">
          <a
            href="https://www.instagram.com/abdulrahman.toor/"
            target="_blank"
            className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 hover:scale-110 transition-transform"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdulrahman-t/"
            target="_blank"
            className="p-3 rounded-2xl bg-blue-600/10 text-blue-600 hover:scale-110 transition-transform"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Mr-ABX/"
            target="_blank"
            className="p-3 rounded-2xl bg-white/5 text-white hover:scale-110 transition-transform"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://x.com/Mr_AbdulrahmanT"
            target="_blank"
            className="p-3 rounded-2xl bg-white/5 text-white hover:scale-110 transition-transform"
            title="Twitter/X"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.youtube.com/@abdulrahman-toor/"
            target="_blank"
            className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:scale-110 transition-transform"
            title="YouTube"
          >
            <Youtube size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 hover:scale-110 transition-transform"
            title="Reddit"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 hover:scale-110 transition-transform"
            title="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>
      </BentoCard>
    </div>
  );
};
