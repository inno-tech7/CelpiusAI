'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlan: (plan: { name: string; price: string; period: string; features: string[] }) => void;
}

export function AddPlanModal({ isOpen, onClose, onAddPlan }: AddPlanModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [period, setPeriod] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = () => {
    if (name && price && period && features) {
      onAddPlan({
        name,
        price,
        period,
        features: features.split('\n').filter((f) => f.trim() !== ''),
      });
      onClose(); // Close modal after adding
      // Reset fields
      setName('');
      setPrice('');
      setPeriod('');
      setFeatures('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border border-blue-500/70 bg-blue-950/10 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Plan</DialogTitle>
          <DialogDescription>
            Enter the details for the new subscription plan. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="period" className="text-right">
              Period
            </Label>
            <Input
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="col-span-3"
              placeholder="e.g., /month, /year"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="features" className="text-right">
              Features
            </Label>
            <Textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="col-span-3"
              placeholder="Enter features, one per line"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
