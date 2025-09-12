"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePlans } from "@/components/providers/plans-provider";
import { Check, Edit, PlusCircle, X, Save } from "lucide-react"
import { AddPlanModal } from "@/components/admin/add-plan-modal"
import BorderSpotlight from "@/components/BorderSpotlight"



const recentTransactions = [
  { id: "txn_1", user: "john.doe@example.com", plan: "Pro Monthly", amount: "$19.00", date: "2024-07-21", status: "Success" },
  { id: "txn_2", user: "jane.smith@example.com", plan: "Pro Yearly", amount: "$180.00", date: "2024-07-20", status: "Success" },
  { id: "txn_3", user: "test.user@example.com", plan: "Pro Monthly", amount: "$19.00", date: "2024-07-20", status: "Failed" },
  { id: "txn_4", user: "another.user@example.com", plan: "Pro Monthly", amount: "$19.00", date: "2024-07-19", status: "Success" },
]

export default function BillingManagementPage() {
  const { plans, addPlan, updatePlan: contextUpdatePlan } = usePlans()
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<any>(null)
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false)

  const handleEdit = (planName: string) => {
    setEditingPlan(planName)
    const planToEdit = plans.find(p => p.name === planName)
    if (planToEdit) {
      setEditedData({ ...planToEdit, features: planToEdit.features.join('\n') })
    }
  }

  const handleCancel = () => {
    setEditingPlan(null)
    setEditedData(null)
  }

  const handleSave = () => {
    if (!editedData || !editingPlan) return;
    const { features, ...rest } = editedData;
    const updatedFeatures = typeof features === 'string' ? features.split('\n').filter((f: string) => f.trim() !== '') : features;
    contextUpdatePlan(editingPlan, { ...rest, features: updatedFeatures });
    setEditingPlan(null);
    setEditedData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData({ ...editedData, [name]: value })
  }

  const handleAddPlan = (newPlan: { name: string; price: string; period: string; features: string[] }) => {
    addPlan(newPlan);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Billing Management</h1>
        <p className="text-muted-foreground mt-2">Manage subscription plans, pricing, and view transactions.</p>
      </div>

      <BorderSpotlight
        color="#5ea0ff"
        brightness={1}
        feather={80}
        borderWidth={7}
        borderRadius="1.5rem"
        >
      <Card className="glassmorphic-dashboard">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Current pricing tiers available to users.</CardDescription>
            </div>
            <Button className="glow" size="sm" onClick={() => setIsAddPlanModalOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className={`p-6 rounded-2xl border ${editingPlan === plan.name ? 'border-blue-300/70' : (plan.isCurrent ? 'border-blue-500/50 bg-blue-900/20' : 'border-white/10 bg-black/20')} transition-all duration-300`}>
              {editingPlan === plan.name ? (
                <div className="space-y-4">
                                    <Input name="name" value={editedData.name} onChange={handleInputChange} className="text-xl font-semibold bg-transparent p-2 border border-blue-400/50 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300" />
                                    <div className="flex items-baseline gap-2 my-4">
                    <Input 
                      name="price" 
                      value={editedData.price} 
                      onChange={handleInputChange} 
                      className="text-3xl font-bold bg-transparent h-auto p-2 border border-blue-400/50 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300"
                    />
                    <Input 
                      name="period" 
                      value={editedData.period} 
                      onChange={handleInputChange} 
                      className="text-lg bg-transparent h-auto p-2 border border-blue-400/50 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300"
                    />
                  </div>
                                    <Textarea name="features" value={editedData.features} onChange={handleInputChange} className="text-sm bg-transparent p-2 border border-blue-400/50 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300" rows={5} />
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8 hover:bg-white/10"><X className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8 hover:bg-white/10"><Save className="h-4 w-4" /></Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(plan.name)} className="h-8 w-8 -mt-2 -mr-2 hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">{plan.price}</p>
                    <p className="text-lg">{plan.period}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      </BorderSpotlight>

      <BorderSpotlight
        color="#5ea0ff"
        brightness={1}
        feather={80}
        borderWidth={7}
        borderRadius="1.5rem"
      >

      <Card className="glassmorphic-dashboard">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest subscription payments and activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map(txn => (
                  <TableRow key={txn.id} className="border-white/10">
                    <TableCell className="font-medium">{txn.user}</TableCell>
                    <TableCell>{`${txn.plan} ${txn.plan === "Pro Monthly" ? "Monthly" : "Yearly"}`}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>
                      <Badge variant={txn.status === "Success" ? "secondary" : "destructive"} className="card-outline">
                        {txn.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </BorderSpotlight>
      

      <AddPlanModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setIsAddPlanModalOpen(false)}
        onAddPlan={handleAddPlan}
      />
    </motion.div>
  )
}
