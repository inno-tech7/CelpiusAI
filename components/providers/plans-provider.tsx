'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isCurrent?: boolean;
}

interface PlansContextType {
  plans: Plan[];
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
  addPlan: (plan: Omit<Plan, 'isCurrent'>) => void;
  updatePlan: (planName: string, updatedData: Partial<Plan>) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

const initialPlans: Plan[] = [
  {
    name: 'Free Tier',
    price: '$0',
    period: '/month',
    features: ['1 Full Practice Test', 'Limited AI Feedback', 'Community Access'],
    isCurrent: false,
  },
  {
    name: 'Pro Monthly',
    price: '$19',
    period: '/month',
    features: [
      '10 Full Practice Tests',
      'Unlimited AI Feedback',
      'Priority Support',
      'Detailed Analytics',
    ],
    isCurrent: true,
  },
  {
    name: 'Pro Yearly',
    price: '$180',
    period: '/year',
    features: ['Everything in Pro Monthly', '20% Discount', 'Early Access to New Features'],
    isCurrent: false,
  },
];

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);

  const addPlan = (plan: Omit<Plan, 'isCurrent'>) => {
    setPlans((prev) => [...prev, { ...plan, isCurrent: false }]);
  };

  const updatePlan = (planName: string, updatedData: Partial<Plan>) => {
    setPlans((prev) => prev.map((p) => (p.name === planName ? { ...p, ...updatedData } : p)));
  };

  return (
    <PlansContext.Provider value={{ plans, setPlans, addPlan, updatePlan }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
}
