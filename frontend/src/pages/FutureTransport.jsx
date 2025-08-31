import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/FutureTransport/ui/card";
import { Button } from "../components/FutureTransport/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/FutureTransport/ui/select";
import { Badge } from "../components/FutureTransport/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/FutureTransport/ui/tabs";
import { TransportSimulator } from "../components/FutureTransport/transport-simulator";
import { CityDashboard } from "../components/FutureTransport/city-dashboard";
import { FlightPlanner } from "../components/FutureTransport/flight-planner";
import { CostAnalyzer } from "../components/FutureTransport/cost-analyzer";
import { indianCities, getDistance } from "../utils/indian-cities-data";
import { Zap, Car, Plane, Rocket } from "lucide-react";
import IframeToggle from "../components/FutureTransport/iframe-toggle";
import "./FutureTransport.css";
import "../styles/globals.css";

const timeSlots = [
  "Morning Rush (7-9 AM)",
  "Midday (12-2 PM)",
  "Evening Peak (5-7 PM)",
  "Night Mode (10 PM-12 AM)",
];

const transportModes = [
  {
    id: "hyperloop",
    name: "Hyperloop Express",
    icon: Zap,
    speed: "1200 km/h",
    emission: "0g CO₂",
    availability: "96%",
    cost: "₹12/km",
    color: "from-blue-600 to-purple-600",
    showIframe: true, // <- just a flag
    iframeUrl:
      "https://sketchfab.com/models/67c06cac80ea4ebd8769b248ce347950/embed",
  },
  {
    id: "robotaxi",
    name: "RoboTaxi",
    icon: Car,
    speed: "80 km/h",
    emission: "0g CO₂",
    availability: "99%",
    cost: "₹7/km",
    color: "from-blue-500 to-cyan-500",
    showIframe: true, // <- just a flag
    iframeUrl:
      "https://sketchfab.com/models/98fa02daf88744a3826ab48adec54603/embed",
  },
  {
    id: "aerotaxi",
    name: "AeroTaxi",
    icon: Plane,
    speed: "250 km/h",
    emission: "3g CO₂",
    availability: "89%",
    cost: "₹23/km",
    color: "from-green-500 to-emerald-500",
    showIframe: true, // <- just a flag
    iframeUrl:
      "https://sketchfab.com/models/5c48a7cdb7f943f48a18cf4ad30fd525/embed",
  },
  {
    id: "drone",
    name: "Personal Drone",
    icon: Rocket,
    speed: "120 km/h",
    emission: "1g CO₂",
    availability: "85%",
    cost: "₹15/km",
    color: "from-orange-500 to-red-500",
    showIframe: true, // <- just a flag
    iframeUrl:
      "https://sketchfab.com/models/502eb2c24a8c4908ba602ed1d7bbc430/embed",
  },
];

export default function FutureTransport() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [destination, setDestination] = useState("");
  const [activeTab, setActiveTab] = useState("forecast");
  const [simulationActive, setSimulationActive] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState(0);

  const handleSimulate = () => {
    if (selectedCity && selectedTime && destination) {
      const distance = getDistance(selectedCity, destination);
      setCalculatedDistance(distance);
      setSimulationActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border-b border-blue-500/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative containerft mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-white bg-clip-text text-transparent mb-4">
              Smart Mobility 2035
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              AI-Powered Transport Forecast • Experience Future Travel Across
              India
            </p>

            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto w-full">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Source City"/>
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

              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Time Slot" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className="bg bg-transparent hover:bg-gray-100"
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="bg-black/20 border-blue-500/30 text-white">
                  <SelectValue placeholder="Destination City" />
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

              <Button
                onClick={handleSimulate}
                className="bg-gradient-to-r text-white from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                disabled={!selectedCity || !selectedTime || !destination}
              >
                <Zap className="w-4 h-4 mr-2" />
                Simulate Future
              </Button>
            </div>

            {/* Distance Display */}
            {selectedCity && destination && selectedCity !== destination && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg max-w-md mx-auto">
                <p className="text-white text-sm">
                  <span className="text-blue-400 font-semibold">
                    {selectedCity}
                  </span>{" "}
                  →{" "}
                  <span className="text-blue-400 font-semibold">
                    {destination}
                  </span>
                </p>
                <p className="text-gray-400 text-xs">
                  Distance:{" "}
                  {getDistance(selectedCity, destination).toLocaleString()} km
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="containerft mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid text-white w-full grid-cols-4 bg-black/20 border border-blue-500/30">
            <TabsTrigger
              value="forecast"
              className="data-[state=active]:bg-blue-600"
            >
              2035 Forecast
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-blue-600"
            >
              City Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="flight"
              className="data-[state=active]:bg-blue-600"
            >
              Flight Planner
            </TabsTrigger>
            <TabsTrigger
              value="analyzer"
              className="data-[state=active]:bg-blue-600"
            >
              Cost Analyzer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="mt-8">
            {simulationActive ? (
              <TransportSimulator
                city={selectedCity}
                time={selectedTime}
                destination={destination}
                transportModes={transportModes}
                calculatedDistance={calculatedDistance}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transportModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <Card
                      key={mode.id}
                      className="bg-black/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                    >
                      <CardHeader className="pb-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${mode.color} flex items-center justify-center mb-3`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white">
                          {mode.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Speed:</span>
                          <span className="text-white">{mode.speed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Emission:</span>
                          <span className="text-green-400">
                            {mode.emission}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Available:</span>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-400"
                          >
                            {mode.availability}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Cost:</span>
                          <span className="text-cyan-400 font-semibold">
                            {mode.cost}
                          </span>
                        </div>

                        {mode.showIframe && (
                          <IframeToggle iframeUrl={mode.iframeUrl} />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="dashboard" className="mt-8">
            <CityDashboard />
          </TabsContent>

          <TabsContent value="flight" className="mt-8">
            <FlightPlanner />
          </TabsContent>

          <TabsContent value="analyzer" className="mt-8">
            <CostAnalyzer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
