import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { indianCities, getDistance } from "../../utils/indian-cities-data";
import {
  Zap,
  Rocket,
  Car,
  Sparkles,
  DollarSign,
  Clock,
  Battery,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Route,
} from "lucide-react";

const transportOptions = [
  {
    id: "hyperloop",
    name: "Hyperloop Express",
    icon: Zap,
    baseCost: 0.15, // per km
    baseTime: 0.05, // minutes per km (1200 km/h)
    energyPerKm: 0.8,
    riskFactor: 2,
    color: "#8b5cf6",
    description: "Ultra-fast vacuum tube transport",
    availability: 96,
    emissions: 0,
  },
  {
    id: "aerotaxi",
    name: "AeroTaxi",
    icon: Rocket,
    baseCost: 0.28, // per km
    baseTime: 0.24, // minutes per km (250 km/h)
    energyPerKm: 2.1,
    riskFactor: 8,
    color: "#10b981",
    description: "Flying electric taxi service",
    availability: 89,
    emissions: 3,
  },
  {
    id: "robotaxi",
    name: "RoboTaxi",
    icon: Car,
    baseCost: 0.08, // per km
    baseTime: 0.75, // minutes per km (80 km/h)
    energyPerKm: 0.5,
    riskFactor: 1,
    color: "#06b6d4",
    description: "Autonomous electric vehicle",
    availability: 99,
    emissions: 0,
  },
  {
    id: "drone",
    name: "Personal Drone",
    icon: Sparkles,
    baseCost: 0.18, // per km
    baseTime: 0.5, // minutes per km (120 km/h)
    energyPerKm: 1.2,
    riskFactor: 5,
    color: "#f97316",
    description: "Personal aerial transport pod",
    availability: 85,
    emissions: 1,
  },
];

function PieChart({ data, size = 200 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  if (total === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <p className="text-gray-400">No data to display</p>
      </div>
    );
  }

  const slices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle += sliceAngle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    const x1 = size / 2 + (size / 2 - 10) * Math.cos(startAngleRad);
    const y1 = size / 2 + (size / 2 - 10) * Math.sin(startAngleRad);
    const x2 = size / 2 + (size / 2 - 10) * Math.cos(endAngleRad);
    const y2 = size / 2 + (size / 2 - 10) * Math.sin(endAngleRad);

    const pathData = [
      `M ${size / 2} ${size / 2}`,
      `L ${x1} ${y1}`,
      `A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return {
      ...item,
      pathData,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} className="transform -rotate-90">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.pathData}
            fill={slice.color}
            stroke="#1e293b"
            strokeWidth="2"
            className="hover:opacity-80 transition-opacity"
          />
        ))}
      </svg>
      <div className="space-y-2">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-white">{slice.name}</span>
            <span className="text-gray-400">({slice.percentage}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CostAnalyzer() {
  const [selectedOptions, setSelectedOptions] = useState([
    "hyperloop",
    "robotaxi",
    "aerotaxi",
  ]);
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [passengers, setPassengers] = useState("1");

  const distance = useMemo(() => {
    if (sourceCity && destinationCity) {
      return getDistance(sourceCity, destinationCity);
    }
    return 0;
  }, [sourceCity, destinationCity]);

  const analysisData = useMemo(() => {
    if (distance === 0) return [];

    const pax = Number.parseInt(passengers) || 1;

    return transportOptions
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => {
        const totalCost =
          Math.round(option.baseCost * distance * pax * 100) / 100;
        const totalTime = Math.round(option.baseTime * distance * 10) / 10;
        const totalEnergy = Math.round(option.energyPerKm * distance * 10) / 10;
        const costPer100km = Math.round(option.baseCost * 100 * 100) / 100;

        return {
          ...option,
          totalCost,
          totalTime,
          totalEnergy,
          costPer100km,
          costEfficiency:
            totalCost > 0 ? Math.round((1 / totalCost) * 1000) : 0,
          timeEfficiency: totalTime > 0 ? Math.round((1 / totalTime) * 100) : 0,
        };
      })
      .sort((a, b) => a.totalCost - b.totalCost);
  }, [selectedOptions, distance, passengers]);

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const pieChartData = analysisData.map((item) => ({
    name: item.name,
    value: item.totalCost,
    color: item.color,
  }));

  const bestOption = analysisData[0];
  const totalCostAll = analysisData.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  return (
    <div className="space-y-6">
      {/* Route Selection */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Route className="w-5 h-5 text-cyan-400" />
            Select Your Journey Route
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Source City
              </label>
              <Select value={sourceCity} onValueChange={setSourceCity}>
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Select source city" />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white">
                  {indianCities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="bg bg-transparent hover:bg-gray-100"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Destination City
              </label>
              <Select
                value={destinationCity}
                onValueChange={setDestinationCity}
              >
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white">
                  {indianCities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="bg bg-transparent hover:bg-gray-100"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Passengers
              </label>
              <Input
                type="number"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="bg-black/20 border-blue-500/30 text-white"
                placeholder="Number of passengers"
                min="1"
                max="8"
              />
            </div>
          </div>

          {/* Route Information */}
          {sourceCity && destinationCity && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-4 text-white">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div className="flex-1">
                  <p className="font-semibold">
                    {sourceCity} → {destinationCity}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Distance: {distance.toLocaleString()} km
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  Route Confirmed
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transport Mode Selection */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white">
            Select Transport Modes for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {transportOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedOptions.includes(option.id);

              return (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleOption(option.id)}
                    />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: option.color }}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {option.name}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {analysisData.length > 0 && distance > 0 && (
        <>
          {/* Cost Breakdown Pie Chart */}
          <Card className="bg-black/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Cost Distribution Analysis - {sourceCity} to {destinationCity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Cost Breakdown
                  </h4>
                  <PieChart data={pieChartData} size={250} />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">
                        ₹{(totalCostAll * 83).toFixed(0)}
                      </div>
                      <p className="text-gray-400 text-sm">Total Cost (INR)</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">
                        {distance} km
                      </div>
                      <p className="text-gray-400 text-sm">Journey Distance</p>
                    </div>
                  </div>
                  {bestOption && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h5 className="text-green-400 font-semibold mb-2">
                        💡 Best Value Option
                      </h5>
                      <p className="text-white">{bestOption.name}</p>
                      <p className="text-gray-400 text-sm">
                        ₹{(bestOption.totalCost * 83).toFixed(0)} •{" "}
                        {bestOption.totalTime > 60
                          ? `${Math.floor(
                              bestOption.totalTime / 60
                            )}h ${Math.round(bestOption.totalTime % 60)}m`
                          : `${Math.round(bestOption.totalTime)} min`}{" "}
                        • {bestOption.totalEnergy} kWh
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {analysisData.map((option, index) => {
              const IconComponent = option.icon;
              const isRecommended = index === 0;
              const costInINR = option.totalCost * 83; // Convert USD to INR
              const timeDisplay =
                option.totalTime > 60
                  ? `${Math.floor(option.totalTime / 60)}h ${Math.round(
                      option.totalTime % 60
                    )}m`
                  : `${Math.round(option.totalTime)} min`;

              return (
                <Card
                  key={option.id}
                  className={`bg-black/20 border-blue-500/30 ${
                    isRecommended ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: option.color }}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">
                            {option.name}
                          </CardTitle>
                          {isRecommended && (
                            <Badge className="bg-green-500/20 text-green-400 text-xs">
                              Most Cost-Effective
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">
                          ₹{costInINR.toFixed(0)}
                        </div>
                        <p className="text-gray-400 text-xs">Total Cost</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-gray-400">Travel Time</p>
                          <p className="text-white font-semibold">
                            {timeDisplay}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-yellow-400" />
                        <div>
                          <p className="text-gray-400">Energy Use</p>
                          <p className="text-white font-semibold">
                            {option.totalEnergy} kWh
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <div>
                          <p className="text-gray-400">Cost/100km</p>
                          <p className="text-white font-semibold">
                            ₹{(option.costPer100km * 83).toFixed(0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <div>
                          <p className="text-gray-400">Risk Level</p>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              option.riskFactor <= 2
                                ? "bg-green-500/20 text-green-400"
                                : option.riskFactor <= 5
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {option.riskFactor <= 2
                              ? "Low"
                              : option.riskFactor <= 5
                              ? "Medium"
                              : "High"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Availability:</span>
                        <span className="text-white">
                          {option.availability}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">CO₂ Emissions:</span>
                        <span
                          className={`${
                            option.emissions === 0
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {option.emissions}g/km
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Speed:</span>
                        <span className="text-white">
                          {option.id === "hyperloop"
                            ? "1200"
                            : option.id === "aerotaxi"
                            ? "250"
                            : option.id === "robotaxi"
                            ? "80"
                            : "120"}{" "}
                          km/h
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparison Summary */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Journey Analysis Summary - {sourceCity} to {destinationCity}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-transparent">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    ₹
                    {(
                      Math.min(...analysisData.map((d) => d.totalCost)) * 83
                    ).toFixed(0)}
                  </div>
                  <p className="text-gray-400 text-sm">Cheapest Option</p>
                  <p className="text-white text-xs mt-1">
                    {
                      analysisData.find(
                        (d) =>
                          d.totalCost ===
                          Math.min(...analysisData.map((d) => d.totalCost))
                      )?.name
                    }
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {Math.min(...analysisData.map((d) => d.totalTime)) > 60
                      ? `${Math.floor(
                          Math.min(...analysisData.map((d) => d.totalTime)) / 60
                        )}h ${Math.round(
                          Math.min(...analysisData.map((d) => d.totalTime)) % 60
                        )}m`
                      : `${Math.round(
                          Math.min(...analysisData.map((d) => d.totalTime))
                        )} min`}
                  </div>
                  <p className="text-gray-400 text-sm">Fastest Option</p>
                  <p className="text-white text-xs mt-1">
                    {
                      analysisData.find(
                        (d) =>
                          d.totalTime ===
                          Math.min(...analysisData.map((d) => d.totalTime))
                      )?.name
                    }
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {Math.min(...analysisData.map((d) => d.totalEnergy))} kWh
                  </div>
                  <p className="text-gray-400 text-sm">Most Efficient</p>
                  <p className="text-white text-xs mt-1">
                    {
                      analysisData.find(
                        (d) =>
                          d.totalEnergy ===
                          Math.min(...analysisData.map((d) => d.totalEnergy))
                      )?.name
                    }
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {Math.max(...analysisData.map((d) => d.availability))}%
                  </div>
                  <p className="text-gray-400 text-sm">Most Available</p>
                  <p className="text-white text-xs mt-1">
                    {
                      analysisData.find(
                        (d) =>
                          d.availability ===
                          Math.max(...analysisData.map((d) => d.availability))
                      )?.name
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* No Route Selected Message */}
      {(!sourceCity || !destinationCity) && (
        <Card className="bg-black/20 border-blue-500/30">
          <CardContent className="p-8 text-center">
            <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Select Your Journey Route
            </h3>
            <p className="text-gray-400">
              Choose source and destination cities to see detailed cost analysis
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
