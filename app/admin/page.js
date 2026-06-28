"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Site Settings",
    description: "Global Config",
    href: "/admin/settings",
    icon: "settings",
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    title: "Manage Pages",
    description: "Content",
    href: "/admin/pages",
    icon: "article",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20"
  },
  {
    title: "Bookings",
    description: "Reservations",
    href: "/admin/bookings",
    icon: "calendar_month",
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20"
  },
  {
    title: "Users & Dogs",
    description: "Customers",
    href: "/admin/users",
    icon: "group",
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "Enquiries",
    description: "Messages",
    href: "/admin/enquiries",
    icon: "mail",
    color: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/20"
  },
  {
    title: "Gallery",
    description: "Photos",
    href: "/admin/gallery",
    icon: "photo_library",
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-[var(--admin-text-primary)] mb-2">
          Dashboard Overview
        </h1>
        <p className="text-lg text-[var(--admin-text-secondary)] max-w-2xl">
          Welcome back. Monitor your platform's activity, manage content, and configure settings.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card) => (
          <motion.div key={card.title} variants={itemVariants}>
            <Link href={card.href} className="block group">
              <div className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${card.shadow} relative`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                      <span className="material-symbols-outlined text-white">{card.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-[var(--admin-text-muted)] group-hover:text-[var(--admin-text-primary)] transition-colors transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--admin-text-primary)] mb-1">{card.title}</h3>
                  <p className="text-sm font-medium text-[var(--admin-text-muted)] uppercase tracking-wider">{card.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
