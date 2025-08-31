import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text,
  Box,
  Sphere,
  Cylinder,
} from "@react-three/drei";
import { useRef, useMemo, useState } from "react";

function MovingVehicle({ mode, routeHeight }) {
  const vehicleRef = useRef(null);
  const [position, setPosition] = useState(0);

  useFrame((state, delta) => {
    if (vehicleRef.current) {
      // Animate vehicle movement along the route
      setPosition((prev) => (prev + delta * 2) % 20);
      vehicleRef.current.position.x = -10 + position;
      vehicleRef.current.position.y = routeHeight + 0.5;

      // Add slight bobbing motion for flying vehicles
      if (mode === "aerotaxi" || mode === "drone") {
        vehicleRef.current.position.y +=
          Math.sin(state.clock.elapsedTime * 3) * 0.2;
      }
    }
  });

  const getVehicleGeometry = () => {
    switch (mode) {
      case "hyperloop":
        return (
          <Cylinder args={[0.3, 0.3, 1.5]} rotation={[0, 0, Math.PI / 2]} />
        );
      case "robotaxi":
        return <Box args={[1.2, 0.4, 0.6]} />;
      case "aerotaxi":
        return (
          <group>
            <Box args={[1.5, 0.3, 0.8]} />
            <Box args={[0.1, 0.8, 0.1]} position={[-0.6, 0.4, -0.3]} />
            <Box args={[0.1, 0.8, 0.1]} position={[0.6, 0.4, -0.3]} />
            <Box args={[0.1, 0.8, 0.1]} position={[-0.6, 0.4, 0.3]} />
            <Box args={[0.1, 0.8, 0.1]} position={[0.6, 0.4, 0.3]} />
          </group>
        );
      case "drone":
        return (
          <group>
            <Sphere args={[0.3]} />
            <Cylinder args={[0.8, 0.8, 0.05]} position={[0, 0.3, 0]} />
            <Cylinder args={[0.1, 0.1, 0.3]} position={[-0.6, 0.3, -0.6]} />
            <Cylinder args={[0.1, 0.1, 0.3]} position={[0.6, 0.3, -0.6]} />
            <Cylinder args={[0.1, 0.1, 0.3]} position={[-0.6, 0.3, 0.6]} />
            <Cylinder args={[0.1, 0.1, 0.3]} position={[0.6, 0.3, 0.6]} />
          </group>
        );
      default:
        return <Sphere args={[0.3]} />;
    }
  };

  const getVehicleColor = () => {
    switch (mode) {
      case "hyperloop":
        return "#8b5cf6";
      case "robotaxi":
        return "#06b6d4";
      case "aerotaxi":
        return "#10b981";
      case "drone":
        return "#f97316";
      default:
        return "#3b82f6";
    }
  };

  return (
    <group ref={vehicleRef}>
      {getVehicleGeometry()}
      <meshStandardMaterial
        color={getVehicleColor()}
        emissive={getVehicleColor()}
        emissiveIntensity={0.3}
      />
    </group>
  );
}

function CityBuildings() {
  const buildings = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const x = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      const height = Math.random() * 8 + 2;
      const width = Math.random() * 1.5 + 0.8;
      const depth = Math.random() * 1.5 + 0.8;

      // Avoid placing buildings on the main route
      if (Math.abs(z) < 2 && Math.abs(x) < 12) {
        return null;
      }

      return {
        position: [x, height / 2, z],
        scale: [width, height, depth],
        color:
          Math.random() > 0.6
            ? "#1e40af"
            : Math.random() > 0.3
            ? "#1e293b"
            : "#0f172a",
        windows: Math.random() > 0.5,
      };
    }).filter(Boolean);
  }, []);

  return (
    <group>
      {buildings.map((building, i) => (
        <group key={i}>
          <Box
            args={[1, 1, 1]}
            position={building.position}
            scale={building.scale}
          >
            <meshStandardMaterial color={building.color} />
          </Box>
          {building.windows && (
            <>
              {/* Windows */}
              {Array.from(
                { length: Math.floor(building.scale[1] / 2) },
                (_, floor) => (
                  <group key={floor}>
                    <Box
                      args={[0.1, 0.3, 0.1]}
                      position={[
                        building.position[0] + building.scale[0] / 2 + 0.01,
                        building.position[1] -
                          building.scale[1] / 2 +
                          (floor + 0.5) * 2,
                        building.position[2] - 0.2,
                      ]}
                    >
                      <meshStandardMaterial
                        color="#fbbf24"
                        emissive="#fbbf24"
                        emissiveIntensity={0.5}
                      />
                    </Box>
                    <Box
                      args={[0.1, 0.3, 0.1]}
                      position={[
                        building.position[0] + building.scale[0] / 2 + 0.01,
                        building.position[1] -
                          building.scale[1] / 2 +
                          (floor + 0.5) * 2,
                        building.position[2] + 0.2,
                      ]}
                    >
                      <meshStandardMaterial
                        color="#fbbf24"
                        emissive="#fbbf24"
                        emissiveIntensity={0.5}
                      />
                    </Box>
                  </group>
                )
              )}
            </>
          )}
        </group>
      ))}
    </group>
  );
}

function Landscape() {
  const trees = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 40, 0.5, (Math.random() - 0.5) * 40],
      height: Math.random() * 2 + 1,
    })).filter((tree) => {
      // Don't place trees on roads or too close to buildings
      const [x, , z] = tree.position;
      return Math.abs(z) > 3 || Math.abs(x) > 15;
    });
  }, []);

  return (
    <group>
      {/* Ground */}
      <Box args={[50, 0.1, 50]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>

      {/* Main Road */}
      <Box args={[25, 0.11, 3]} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>

      {/* Road Lines */}
      <Box args={[25, 0.12, 0.1]} position={[0, -0.03, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Box>

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={i} position={tree.position}>
          {/* Trunk */}
          <Cylinder
            args={[0.1, 0.15, tree.height]}
            position={[0, tree.height / 2, 0]}
          >
            <meshStandardMaterial color="#92400e" />
          </Cylinder>
          {/* Leaves */}
          <Sphere args={[0.8]} position={[0, tree.height + 0.5, 0]}>
            <meshStandardMaterial color="#166534" />
          </Sphere>
        </group>
      ))}

      {/* Street Lights */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i} position={[-10 + i * 3, 0, 2.5]}>
          <Cylinder args={[0.05, 0.05, 3]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#6b7280" />
          </Cylinder>
          <Sphere args={[0.2]} position={[0, 3.2, 0]}>
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.8}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

function TransportRoute({ selectedMode }) {
  const getRouteHeight = () => {
    switch (selectedMode) {
      case "hyperloop":
        return 0.5;
      case "robotaxi":
        return 0.2;
      case "aerotaxi":
        return 12;
      case "drone":
        return 8;
      default:
        return 2;
    }
  };

  const getRouteColor = () => {
    switch (selectedMode) {
      case "hyperloop":
        return "#8b5cf6";
      case "robotaxi":
        return "#06b6d4";
      case "aerotaxi":
        return "#10b981";
      case "drone":
        return "#f97316";
      default:
        return "#3b82f6";
    }
  };

  const routeHeight = getRouteHeight();
  const routeColor = getRouteColor();

  return (
    <group>
      {/* Main Route */}
      <Box args={[20, 0.2, 0.8]} position={[0, routeHeight, 0]}>
        <meshStandardMaterial
          color={routeColor}
          emissive={routeColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Route Support Pillars for elevated routes */}
      {(selectedMode === "aerotaxi" || selectedMode === "drone") && (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <Cylinder
              key={i}
              args={[0.2, 0.2, routeHeight]}
              position={[-8 + i * 4, routeHeight / 2, 0]}
            >
              <meshStandardMaterial color="#6b7280" />
            </Cylinder>
          ))}
        </>
      )}

      {/* Hyperloop Tube */}
      {selectedMode === "hyperloop" && (
        <Cylinder
          args={[0.8, 0.8, 20]}
          position={[0, routeHeight + 0.5, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            color="#1e1b4b"
            transparent
            opacity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>
      )}

      {/* Moving Vehicle */}
      {selectedMode && (
        <MovingVehicle mode={selectedMode} routeHeight={routeHeight} />
      )}

      {/* Route Markers */}
      <Text
        position={[-12, routeHeight + 2, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        START
      </Text>

      <Text
        position={[12, routeHeight + 2, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        DESTINATION
      </Text>
    </group>
  );
}

function CityScene({ selectedMode }) {
  return (
    <group>
      <Landscape />
      <CityBuildings />
      <TransportRoute selectedMode={selectedMode} />

      {/* City Name */}
      <Text
        position={[0, 15, -20]}
        fontSize={2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Smart City 2035
      </Text>

      {/* Mode Label */}
      {selectedMode && (
        <Text
          position={[0, 12, -15]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {selectedMode === "hyperloop" && "Hyperloop Express"}
          {selectedMode === "robotaxi" && "RoboTaxi"}
          {selectedMode === "aerotaxi" && "AeroTaxi"}
          {selectedMode === "drone" && "Personal Drone"}
        </Text>
      )}
    </group>
  );
}

export function TransportVisualization({ selectedMode }) {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-blue-900/20 to-black/40 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [15, 12, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 20, 0]} intensity={0.5} color="#06b6d4" />

        {/* Street lighting */}
        <spotLight
          position={[0, 10, 5]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          color="#fbbf24"
          target-position={[0, 0, 0]}
        />

        <CityScene selectedMode={selectedMode} />

        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={30}
          autoRotate={selectedMode ? true : false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
