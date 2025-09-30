'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Cpu, AlertCircle, CheckCircle } from 'lucide-react';
import BorderSpotlight from '@/components/BorderSpotlight';

const systemMetrics = {
  aiEngine: {
    status: 'Operational',
    model: 'Celpius-AI',
    accuracy: '98.7%',
    latency: '150ms',
  },
  api: {
    status: 'Operational',
    uptime: '99.99%',
    avgResponseTime: '80ms',
    errorRate: '0.02%',
  },
  servers: [
    { id: 'server-1', region: 'US-East-1', status: 'Healthy', cpuUsage: '35%', memUsage: '60%' },
    { id: 'server-2', region: 'EU-West-1', status: 'Healthy', cpuUsage: '45%', memUsage: '55%' },
    {
      id: 'server-3',
      region: 'AP-Southeast-1',
      status: 'Warning',
      cpuUsage: '85%',
      memUsage: '75%',
    },
  ],
};

const StatusIndicator = ({ status }: { status: string }) => {
  const isHealthy = status === 'Operational' || status === 'Healthy';
  return (
    <div
      className={`flex items-center space-x-2 ${isHealthy ? 'text-green-400' : 'text-yellow-400'}`}
    >
      {isHealthy ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      <span>{status}</span>
    </div>
  );
};

export default function SystemMonitoringPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <p className="mt-2 text-muted-foreground">
          Real-time health and performance of the system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <BorderSpotlight
          color="#5ea0ff"
          brightness={1}
          feather={80}
          borderWidth={7}
          borderRadius="1.5rem"
        >
          <Card className="glassmorphic-dashboard">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2" /> AI Engine Status
              </CardTitle>
              <CardDescription>Performance of the core AI model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>{' '}
                <StatusIndicator status={systemMetrics.aiEngine.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Model Version</span>{' '}
                <span>{systemMetrics.aiEngine.model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Scoring Accuracy</span>{' '}
                <span>{systemMetrics.aiEngine.accuracy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Average Latency</span>{' '}
                <span>{systemMetrics.aiEngine.latency}</span>
              </div>
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
              <CardTitle className="flex items-center">
                <Server className="mr-2" /> API Health
              </CardTitle>
              <CardDescription>Status of public and internal APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>{' '}
                <StatusIndicator status={systemMetrics.api.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Uptime (90 days)</span>{' '}
                <span>{systemMetrics.api.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg. Response Time</span>{' '}
                <span>{systemMetrics.api.avgResponseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Error Rate</span>{' '}
                <span>{systemMetrics.api.errorRate}</span>
              </div>
            </CardContent>
          </Card>
        </BorderSpotlight>
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
            <CardTitle>Server Infrastructure</CardTitle>
            <CardDescription>Live status of our server fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMetrics.servers.map((server) => (
                <div
                  key={server.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-4 max-435:flex-col max-435:items-start max-435:gap-[1rem]"
                >
                  <div>
                    <p className="font-medium">
                      {server.id}{' '}
                      <span className="text-sm text-muted-foreground">({server.region})</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-xs text-muted-foreground">CPU</p>
                      <p>{server.cpuUsage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Memory</p>
                      <p>{server.memUsage}</p>
                    </div>
                    <StatusIndicator status={server.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BorderSpotlight>
    </motion.div>
  );
}
