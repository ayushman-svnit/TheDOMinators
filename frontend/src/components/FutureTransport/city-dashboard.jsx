import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Activity,
  Car,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

export function CityDashboard() {
  const [metrics, setMetrics] = useState({
    activeVehicles: 0,
    aiDecisions: 0,
    trafficEfficiency: 0,
    energySaved: 0,
    accidents: 0,
    satisfaction: 0,
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "info",
      message: "Weather rerouting activated in Sector 7",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "success",
      message: "Traffic flow optimized - 15% improvement",
      time: "5 min ago",
    },
    {
      id: 3,
      type: "warning",
      message: "High demand detected in downtown area",
      time: "8 min ago",
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeVehicles: Math.floor(Math.random() * 1000) + 8500,
        aiDecisions: Math.floor(Math.random() * 100) + 1200,
        trafficEfficiency: Math.floor(Math.random() * 10) + 85,
        energySaved: Math.floor(Math.random() * 5) + 65,
        accidents: Math.floor(Math.random() * 3),
        satisfaction: Math.floor(Math.random() * 5) + 92,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" />
              Active Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {metrics.activeVehicles.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">
                +12% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              AI Decisions/Min
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {metrics.aiDecisions.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm">
                Real-time processing
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Traffic Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {metrics.trafficEfficiency}%
            </div>
            <Progress value={metrics.trafficEfficiency} className="mb-2" />
            <span className="text-gray-400 text-sm">
              Optimal flow maintained
            </span>
          </CardContent>
        </Card>
      </div>

      {/* AI Control Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              AI Traffic Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Smart Traffic Lights</span>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Predictive Routing</span>
                <Badge className="bg-green-500/20 text-green-400">
                  Optimizing
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Emergency Response</span>
                <Badge className="bg-blue-500/20 text-blue-400">Standby</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Weather Adaptation</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">
                  Monitoring
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Live Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === "success"
                        ? "bg-green-400"
                        : alert.type === "warning"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white">System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {metrics.energySaved}%
              </div>
              <p className="text-gray-400 text-sm">Energy Saved</p>
              <Progress value={metrics.energySaved} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {metrics.accidents}
              </div>
              <p className="text-gray-400 text-sm">Accidents Today</p>
              <p className="text-green-400 text-xs mt-1">-95% vs 2024</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {metrics.satisfaction}%
              </div>
              <p className="text-gray-400 text-sm">User Satisfaction</p>
              <Progress value={metrics.satisfaction} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
              <p className="text-gray-400 text-sm">AI Monitoring</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">
                Online
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}