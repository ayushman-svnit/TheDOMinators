import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { indianCities, getDistance } from "../../utils/indian-cities-data";
import {
  Plane,
  Zap,
  Battery,
  Cloud,
  MapPin,
  Clock,
  AlertTriangle,
  Route,
  Wind,
} from "lucide-react";

const flightModes = [
  {
    id: "drone-taxi",
    name: "Drone Taxi",
    icon: Plane,
    maxAltitude: "500ft",
    range: "500km", // Increased from 25km
    batteryLife: "45min",
    speed: "120 km/h",
    costPerKm: 0.22,
    description: "Urban aerial taxi service",
  },
  {
    id: "jetpack",
    name: "Personal Jetpack",
    icon: Zap,
    maxAltitude: "1000ft",
    range: "300km", // Increased from 15km
    batteryLife: "30min",
    speed: "80 km/h",
    costPerKm: 0.35,
    description: "Individual aerial mobility",
  },
  {
    id: "air-taxi",
    name: "Air Taxi",
    icon: Wind,
    maxAltitude: "2000ft",
    range: "1500km", // Increased from 100km
    batteryLife: "90min",
    speed: "200 km/h",
    costPerKm: 0.18,
    description: "Long-range aerial transport",
  },
];

const skyLanes = [
  {
    id: "lane-1",
    name: "Metro Express",
    altitude: "300ft",
    traffic: "Medium",
    weather: "Clear",
    cities: [
      "New Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
    ],
  },
  {
    id: "lane-2",
    name: "Coastal Route",
    altitude: "450ft",
    traffic: "Low",
    weather: "Windy",
    cities: ["Mumbai", "Goa", "Kochi", "Chennai", "Mangalore"],
  },
  {
    id: "lane-3",
    name: "Northern Circuit",
    altitude: "600ft",
    traffic: "High",
    weather: "Clear",
    cities: [
      "New Delhi",
      "Chandigarh",
      "Amritsar",
      "Jaipur",
      "Lucknow",
      "Agra",
    ],
  },
  {
    id: "lane-4",
    name: "Southern Network",
    altitude: "400ft",
    traffic: "Medium",
    weather: "Optimal",
    cities: [
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Kochi",
      "Coimbatore",
      "Mysore",
    ],
  },
  {
    id: "lane-5",
    name: "Western Corridor",
    altitude: "350ft",
    traffic: "Low",
    weather: "Clear",
    cities: ["Mumbai", "Pune", "Ahmedabad", "Surat", "Indore", "Bhopal"],
  },
];

export function FlightPlanner() {
  const [selectedMode, setSelectedMode] = useState("");
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [flightPlan, setFlightPlan] = useState(null);
  const [showAllCities, setShowAllCities] = useState(false);

  const distance =
    sourceCity && destinationCity
      ? getDistance(sourceCity, destinationCity)
      : 0;

  const generateFlightPlan = () => {
    if (!selectedMode || !sourceCity || !destinationCity) return;

    const selectedModeData = flightModes.find(
      (mode) => mode.id === selectedMode
    );
    if (!selectedModeData) return;

    const calculatedDistance = getDistance(sourceCity, destinationCity);
    if (calculatedDistance === 0) return;

    // Calculate flight metrics
    const speedValue = Number.parseInt(selectedModeData.speed.split(" ")[0]); // Extract number from "120 km/h"
    const flightTime = Math.round((calculatedDistance / speedValue) * 60); // minutes
    const totalCost = Math.round(
      selectedModeData.costPerKm * calculatedDistance * 83
    ); // Convert to INR
    const rangeValue = Number.parseInt(
      selectedModeData.range.replace("km", "")
    ); // Extract number from "25km"
    const batteryUsage = Math.min(
      Math.round((calculatedDistance / rangeValue) * 100),
      100
    );

    // Determine optimal sky lane
    const availableLanes = skyLanes.filter(
      (lane) =>
        lane.cities.includes(sourceCity) &&
        lane.cities.includes(destinationCity)
    );
    const optimalLane =
      availableLanes.length > 0 ? availableLanes[0] : skyLanes[0];

    // Generate route waypoints
    const generateRoute = () => {
      const waypoints = [`${sourceCity} Helipad`];

      if (calculatedDistance > 100) {
        waypoints.push("Sky Lane Checkpoint Alpha");
      }
      if (calculatedDistance > 300) {
        waypoints.push("Mid-Route Charging Station");
      }
      if (calculatedDistance > 500) {
        waypoints.push("Sky Lane Checkpoint Beta");
      }

      waypoints.push(`${destinationCity} Landing Zone`);
      return waypoints;
    };

    const plan = {
      route: generateRoute(),
      altitude: optimalLane.altitude,
      duration:
        flightTime > 60
          ? `${Math.floor(flightTime / 60)}h ${flightTime % 60}m`
          : `${flightTime} minutes`,
      batteryUsage: `${batteryUsage}%`,
      weatherConditions: optimalLane.weather,
      safetyRating: batteryUsage < 80 ? "A+" : batteryUsage < 90 ? "A" : "B+",
      chargingStations: Math.ceil(calculatedDistance / 200),
      emergencyLanding: Math.ceil(calculatedDistance / 100),
      totalCost: totalCost,
      skyLane: optimalLane.name,
      trafficLevel: optimalLane.traffic,
      estimatedSpeed: selectedModeData.speed,
      fuelEfficiency:
        Math.round(
          (calculatedDistance / Number.parseInt(selectedModeData.batteryLife)) *
            10
        ) / 10,
    };

    setFlightPlan(plan);
  };

  // Get available sky lanes for selected cities
  const getAvailableSkyLanes = () => {
    if (!sourceCity || !destinationCity) return skyLanes;

    return skyLanes.filter(
      (lane) =>
        lane.cities.includes(sourceCity) ||
        lane.cities.includes(destinationCity)
    );
  };

  const availableSkyLanes = getAvailableSkyLanes();

  return (
    <div className="space-y-6">
      {/* Route Selection */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Route className="w-5 h-5 text-cyan-400" />
            Plan Your Aerial Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Departure City
              </label>
              <Select value={sourceCity} onValueChange={setSourceCity}>
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Select departure city" />
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
          </div>

          {/* Route Information */}
          {sourceCity && destinationCity && distance > 0 && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-4 text-white">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div className="flex-1">
                  <p className="font-semibold">
                    {sourceCity} → {destinationCity}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Aerial Distance: {distance.toLocaleString()} km
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  Route Available
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Flight Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flightModes.map((mode) => {
          const IconComponent = mode.icon;
          const calculatedDistance = getDistance(sourceCity, destinationCity);
          const rangeInKm = Number.parseInt(mode.range.replace("km", ""));
          const isInRange =
            calculatedDistance === 0 || calculatedDistance <= rangeInKm;
          const isSelected = selectedMode === mode.id;

          return (
            <Card
              key={mode.id}
              className={`bg-black/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer ${
                isSelected ? "ring-2 ring-blue-500" : ""
              } ${!isInRange && calculatedDistance > 0 ? "opacity-50" : ""}`}
              onClick={() => isInRange && setSelectedMode(mode.id)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg">{mode.name}</p>
                    <p className="text-xs text-gray-400">{mode.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400">Max Altitude</p>
                    <p className="text-white font-semibold">
                      {mode.maxAltitude}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Range</p>
                    <p className="text-white font-semibold">{mode.range}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Battery Life</p>
                    <p className="text-white font-semibold">
                      {mode.batteryLife}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Speed</p>
                    <p className="text-white font-semibold">{mode.speed}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cost per km:</span>
                  <span className="text-cyan-400 font-semibold">
                    ₹{Math.round(mode.costPerKm * 83)}
                  </span>
                </div>
                {!isInRange && calculatedDistance > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-red-500/20 text-red-400 w-full justify-center"
                  >
                    Out of Range
                  </Badge>
                )}
                {isSelected && (
                  <Badge className="bg-green-500/20 text-green-400 w-full justify-center">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Flight Planning Action */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Button
              onClick={generateFlightPlan}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-3"
              disabled={
                !selectedMode ||
                !sourceCity ||
                !destinationCity ||
                distance === 0
              }
            >
              <Plane className="w-5 h-5 mr-2" />
              Generate Flight Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Sky Lanes */}
      <Card className="bg-black/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            Available Sky Lanes for Your Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSkyLanes.map((lane) => (
              <div
                key={lane.id}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <h4 className="text-white font-semibold mb-3">{lane.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Altitude:</span>
                    <span className="text-white">{lane.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Traffic:</span>
                    <Badge
                      variant="secondary"
                      className={`${
                        lane.traffic === "Low"
                          ? "bg-green-500/20 text-green-400"
                          : lane.traffic === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {lane.traffic}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weather:</span>
                    <span className="text-white">{lane.weather}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400 text-xs">Connected Cities:</p>
                      {lane.cities.length > 3 && (
                        <button
                          onClick={() => setShowAllCities(!showAllCities)}
                          className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                        >
                          {showAllCities
                            ? "Show Less"
                            : `+${lane.cities.length - 3} More`}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(showAllCities
                        ? lane.cities
                        : lane.cities.slice(0, 3)
                      ).map((city, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flight Plan Results */}
      {flightPlan && (
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Generated Flight Plan - {sourceCity} to {destinationCity}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flight Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {flightPlan.duration}
                </div>
                <p className="text-gray-400 text-sm">Flight Duration</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {flightPlan.altitude}
                </div>
                <p className="text-gray-400 text-sm">Cruise Altitude</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {flightPlan.batteryUsage}
                </div>
                <p className="text-gray-400 text-sm">Battery Usage</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  ₹{flightPlan.totalCost.toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm">Total Cost</p>
              </div>
            </div>

            {/* Flight Route */}
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Flight Route via {flightPlan.skyLane}
              </h4>
              <div className="flex flex-wrap gap-2">
                {flightPlan.route.map((waypoint, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-blue-500/50 text-blue-300"
                    >
                      {waypoint}
                    </Badge>
                    {i < flightPlan.route.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Flight Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h5 className="text-white font-semibold">
                  Safety & Infrastructure
                </h5>
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Charging Stations</p>
                    <p className="text-white font-semibold">
                      {flightPlan.chargingStations} available
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Emergency Landing</p>
                    <p className="text-white font-semibold">
                      {flightPlan.emergencyLanding} zones
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400">
                    {flightPlan.safetyRating}
                  </Badge>
                  <span className="text-gray-400 text-sm">Safety Rating</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-white font-semibold">Flight Conditions</h5>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Weather</p>
                    <Badge className="bg-green-500/20 text-green-400">
                      {flightPlan.weatherConditions}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Traffic Level</p>
                    <Badge
                      className={`${
                        flightPlan.trafficLevel === "Low"
                          ? "bg-green-500/20 text-green-400"
                          : flightPlan.trafficLevel === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {flightPlan.trafficLevel}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Cruise Speed</p>
                  <p className="text-white font-semibold">
                    {flightPlan.estimatedSpeed}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-white font-semibold">
                  Performance Metrics
                </h5>
                <div className="text-sm">
                  <p className="text-gray-400">Distance</p>
                  <p className="text-white font-semibold">{distance} km</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Fuel Efficiency</p>
                  <p className="text-white font-semibold">
                    {flightPlan.fuelEfficiency} km/charge
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Cost per km</p>
                  <p className="text-cyan-400 font-semibold">
                    ₹{Math.round(flightPlan.totalCost / distance)}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h5 className="text-blue-400 font-semibold mb-2">
                🤖 AI Flight Recommendations
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  • Optimal departure time: Early morning for best weather
                  conditions
                </p>
                <p className="text-gray-300">
                  • Recommended sky lane: {flightPlan.skyLane} for minimal
                  traffic
                </p>
                <p className="text-gray-300">
                  • Battery optimization: {flightPlan.batteryUsage} usage allows
                  for safe margins
                </p>
                {Number.parseInt(flightPlan.batteryUsage) > 80 && (
                  <p className="text-yellow-300">
                    • Consider charging stop for longer range safety
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Route Selected Message */}
      {(!sourceCity || !destinationCity) && (
        <Card className="bg-black/20 border-blue-500/30">
          <CardContent className="p-8 text-center">
            <Plane className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Plan Your Aerial Journey
            </h3>
            <p className="text-gray-400">
              Select departure and destination cities to generate your flight
              plan
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
