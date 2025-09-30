'use client';

import { Users, BarChart, Bot, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import BorderSpotlight from '@/components/BorderSpotlight';

const stats = [
  { title: 'Total Users', value: '1,257', icon: Users, change: '+12%' },
  { title: 'Active Subscriptions', value: '342', icon: BarChart, change: '+8%' },
  { title: 'AI Usage (Last 24h)', value: '5,821 calls', icon: Bot, change: '-3%' },
  { title: 'Total Revenue', value: '$12,450', icon: DollarSign, change: '+15%' },
];

export default function AdminPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>
      <div className="grid gap-8 lg:grid-cols-2 max-1024:grid-cols-1">
        {stats.map((stat) => (
          <BorderSpotlight
            key={stat.title}
            color="#5ea0ff"
            brightness={1}
            feather={80}
            borderWidth={7}
            borderRadius="1.5rem"
          >
            <div className="glassmorphic-dashboard rounded-[1.5rem] p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{stat.title}</p>
                <stat.icon className="h-6 w-6 text-gray-500" />
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p
                className={`mt-2 text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
              >
                {stat.change} vs last month
              </p>
            </div>
          </BorderSpotlight>
        ))}
      </div>
    </motion.div>
  );
}
