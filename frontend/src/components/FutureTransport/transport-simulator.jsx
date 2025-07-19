import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Clock, Leaf, DollarSign, Zap, MapPin, TrendingUp } from "lucide-react";
import { TransportVisualization } from "./transport-visualization";

export function TransportSimulator({
  city,
  time,
  destination,
  transportModes,
  calculatedDistance,
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState("");

  useEffect(() => {
    // Simulate AI processing
    setLoading(true);
    const timer = setTimeout(() => {
      const simulatedResults = transportModes.map((mode) => ({
        mode,
        eta: generateETA(mode.id),
        carbonSaved: generateCarbonSaved(mode.id),
        costComparison: generateCostComparison(mode.id),
        aiConfidence: Math.floor(Math.random() * 20) + 80,
        route: generateRoute(city, destination),
        weatherImpact: generateWeatherImpact(),
        demandLevel: generateDemandLevel(),
      }));

      setResults(
        simulatedResults.sort(
          (a, b) => Number.parseInt(a.eta) - Number.parseInt(b.eta)
        )
      );
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [city, time, destination, transportModes, calculatedDistance]);

  const generateETA = (modeId) => {
    const speeds = {
      hyperloop: 1200, // km/h - Updated speed
      robotaxi: 80,
      aerotaxi: 250, // New mode
      drone: 120, // New mode
    };

    const speed = speeds[modeId] || 100;
    const baseTime = (calculatedDistance / speed) * 60; // Convert to minutes
    const variation = Math.floor(Math.random() * 10) - 5; // ±5 min variation
    const finalTime = Math.max(1, Math.round(baseTime + variation));

    return finalTime > 60
      ? `${Math.round(finalTime / 60)}h ${finalTime % 60}m`
      : `${finalTime} min`;
  };

  const generateCarbonSaved = (modeId) => {
    const savings = {
      hyperloop: 98,
      robotaxi: 85,
      aerotaxi: 70, // New mode
      drone: 80, // New mode
    };
    return `${savings[modeId] || 70}% vs 2024`;
  };

  const generateCostComparison = (modeId) => {
    const baseCosts = {
      hyperloop: 0.15,
      robotaxi: 0.08,
      aerotaxi: 0.28, // New mode
      drone: 0.18, // New mode
    }; // per km
    const cost2035 = (baseCosts[modeId] || 0.1) * calculatedDistance;
    const cost2024 = cost2035 * 1.8; // Assume 2024 costs are 80% higher
    const savings = Math.round(((cost2024 - cost2035) / cost2024) * 100);
    return `${savings > 0 ? "-" : "+"}${Math.abs(savings)}% vs 2024`;
  };

  const generateRoute = (city, dest) => {
    return [
      `${city} Hub`,
      "AI Traffic Grid",
      "Smart Junction Alpha",
      `${dest} Terminal`,
    ];
  };

  const generateWeatherImpact = () => {
    const impacts = ["Optimal", "Minor Delay", "Route Adjusted", "Clear Skies"];
    return impacts[Math.floor(Math.random() * impacts.length)];
  };

  const generateDemandLevel = () => {
    const levels = ["Low", "Medium", "High"];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-black/20 border-blue-500/30">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                AI Processing Your Journey
              </h3>
              <p className="text-gray-400">
                Analyzing traffic patterns, weather, and optimal routes...
              </p>
              <Progress value={75} className="w-full max-w-md mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Journey Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Journey: {city} → {destination}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Distance</p>
              <p className="text-white font-semibold">
                {calculatedDistance.toLocaleString()} km
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time Slot</p>
              <p className="text-white font-semibold">{time}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Weather Impact</p>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
                {results[0]?.weatherImpact || "Optimal"}
              </Badge>
            </div>
            <div>
              <p className="text-gray-400 text-sm">AI Recommendation</p>
              <p className="text-cyan-400 font-semibold">
                {results[0]?.mode.name || "Calculating..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Visualization */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white">3D Route Visualization</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TransportVisualization selectedMode={selectedMode} />
        </CardContent>
      </Card>

      {/* Transport Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((result, index) => {
          const IconComponent = result.mode.icon;
          return (
            <Card
              key={result.mode.id}
              className={`bg-black/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer ${
                selectedMode === result.mode.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedMode(result.mode.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${result.mode.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {result.mode.name}
                      </CardTitle>
                      {index === 0 && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          AI Recommended
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-blue-500/50 text-blue-400"
                  >
                    {result.aiConfidence}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">ETA</p>
                      <p className="text-white font-semibold">{result.eta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-xs text-gray-400">Carbon Saved</p>
                      <p className="text-green-400 font-semibold">
                        {result.carbonSaved}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-xs text-gray-400">Cost vs 2024</p>
                      <p className="text-yellow-400 font-semibold">
                        {result.costComparison}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Demand</p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          result.demandLevel === "Low"
                            ? "bg-green-500/20 text-green-400"
                            : result.demandLevel === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {result.demandLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">AI-Guided Route</p>
                  <div className="flex flex-wrap gap-1">
                    {result.route.map((stop, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
