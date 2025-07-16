// Indian cities with accurate distances (in kilometers)
export const indianCities = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Patna",
  "Indore",
  "Bhopal",
  "Ludhiana",
  "Agra",
  "Varanasi",
  "Madurai",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivali",
  "Vasai-Virar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Allahabad",
  "Gwalior",
  "Jabalpur",
  "Coimbatore",
  "Vijayawada",
  "Jodhpur",
  "Raipur",
  "Kota",
  "Chandigarh",
  "Guwahati",
  "Solapur",
  "Hubli-Dharwad",
  "Bareilly",
  "Moradabad",
  "Mysore",
  "Gurgaon",
  "Aligarh",
  "Jalandhar",
  "Tiruchirappalli",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Guntur",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai Nagar",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Nanded-Waghala",
  "Kolhapur",
  "Ajmer",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Nellore",
  "Jammu",
  "Sangli-Miraj & Kupwad",
  "Belgaum",
  "Mangalore",
  "Ambattur",
  "Tirunelveli",
  "Malegaon",
  "Gaya",
  "Jalgaon",
  "Udaipur",
  "Maheshtala",
  "Shimla",
];

// Accurate distances between major Indian cities (in kilometers)
export const cityDistances = {
  // New Delhi distances
  "new delhi-mumbai": 1154,
  "new delhi-bangalore": 2165,
  "new delhi-chennai": 2180,
  "new delhi-kolkata": 1472,
  "new delhi-hyderabad": 1594,
  "new delhi-pune": 1412,
  "new delhi-ahmedabad": 938,
  "new delhi-jaipur": 280,
  "new delhi-surat": 1228,
  "new delhi-lucknow": 556,
  "new delhi-kanpur": 441,
  "new delhi-nagpur": 1092,
  "new delhi-patna": 991,
  "new delhi-indore": 679,
  "new delhi-bhopal": 744,
  "new delhi-agra": 233,
  "new delhi-varanasi": 821,
  "new delhi-amritsar": 449,
  "new delhi-chandigarh": 243,
  "new delhi-kota": 465,
  "new delhi-dehradun": 248,
  "new delhi-shimla": 343,
  "new delhi-ujjain": 679,
  "new delhi-jodhpur": 583,
  "new delhi-gurgaon": 32,
  "new delhi-noida": 25,

  // Mumbai distances
  "mumbai-bangalore": 984,
  "mumbai-chennai": 1338,
  "mumbai-kolkata": 1968,
  "mumbai-hyderabad": 711,
  "mumbai-pune": 149,
  "mumbai-ahmedabad": 524,
  "mumbai-jaipur": 1170,
  "mumbai-surat": 284,
  "mumbai-lucknow": 1398,
  "mumbai-nagpur": 788,
  "mumbai-indore": 588,
  "mumbai-bhopal": 792,
  "mumbai-agra": 1235,
  "mumbai-kochi": 1037,
  "mumbai-goa": 464,

  // Bangalore distances
  "bangalore-chennai": 346,
  "bangalore-kolkata": 1871,
  "bangalore-hyderabad": 569,
  "bangalore-pune": 844,
  "bangalore-ahmedabad": 1506,
  "bangalore-kochi": 460,
  "bangalore-mysore": 146,
  "bangalore-coimbatore": 363,
  "bangalore-mangalore": 352,

  // Chennai distances
  "chennai-kolkata": 1663,
  "chennai-hyderabad": 626,
  "chennai-pune": 1131,
  "chennai-kochi": 697,
  "chennai-coimbatore": 507,
  "chennai-madurai": 462,
  "chennai-tiruchirappalli": 322,

  // Kolkata distances
  "kolkata-hyderabad": 1495,
  "kolkata-pune": 1666,
  "kolkata-ahmedabad": 1943,
  "kolkata-patna": 582,
  "kolkata-bhubaneswar": 444,
  "kolkata-guwahati": 1031,

  // Hyderabad distances
  "hyderabad-pune": 559,
  "hyderabad-ahmedabad": 1265,
  "hyderabad-nagpur": 500,
  "hyderabad-vijayawada": 273,

  // Pune distances
  "pune-ahmedabad": 665,
  "pune-nagpur": 680,
  "pune-indore": 540,
  "pune-goa": 464,

  // Ahmedabad distances
  "ahmedabad-surat": 240,
  "ahmedabad-indore": 434,
  "ahmedabad-jaipur": 680,
  "ahmedabad-rajkot": 216,

  // Jaipur distances
  "jaipur-agra": 240,
  "jaipur-jodhpur": 337,
  "jaipur-udaipur": 393,
  "jaipur-kota": 240,
  "jaipur-ajmer": 135,

  // Other important connections
  "lucknow-kanpur": 77,
  "lucknow-varanasi": 286,
  "lucknow-patna": 534,
  "agra-varanasi": 605,
  "indore-bhopal": 196,
  "indore-ujjain": 56,
  "chandigarh-amritsar": 229,
  "chandigarh-shimla": 113,
  "dehradun-shimla": 236,
  "kota-ujjain": 264,
  "jodhpur-udaipur": 258,
  "coimbatore-kochi": 190,
  "vijayawada-chennai": 275,
  "patna-varanasi": 247,
  "bhubaneswar-cuttack": 31,
};

export function getDistance(city1, city2) {
  if (!city1 || !city2 || city1 === city2) return 0;

  const key1 = `${city1.toLowerCase()}-${city2.toLowerCase()}`;
  const key2 = `${city2.toLowerCase()}-${city1.toLowerCase()}`;

  // Check both directions
  let distance = cityDistances[key1] || cityDistances[key2];

  // If no exact match found, calculate approximate distance based on regional proximity
  if (!distance) {
    distance = calculateApproximateDistance(city1, city2);
  }

  return distance;
}

function calculateApproximateDistance(city1, city2) {
  // Regional groupings for approximate distance calculation
  const regions = {
    north: [
      "new delhi",
      "gurgaon",
      "noida",
      "chandigarh",
      "amritsar",
      "ludhiana",
      "shimla",
      "dehradun",
      "lucknow",
      "kanpur",
      "agra",
      "meerut",
      "saharanpur",
      "moradabad",
      "bareilly",
      "aligarh",
      "allahabad",
      "varanasi",
      "gorakhpur",
      "patna",
      "gaya",
    ],
    west: [
      "mumbai",
      "pune",
      "ahmedabad",
      "surat",
      "rajkot",
      "bhavnagar",
      "jamnagar",
      "indore",
      "bhopal",
      "ujjain",
      "nagpur",
      "aurangabad",
      "solapur",
      "kolhapur",
      "sangli-miraj & kupwad",
    ],
    south: [
      "bangalore",
      "chennai",
      "hyderabad",
      "kochi",
      "coimbatore",
      "madurai",
      "mysore",
      "mangalore",
      "tiruchirappalli",
      "tirunelveli",
      "vijayawada",
      "guntur",
      "nellore",
      "warangal",
    ],
    east: [
      "kolkata",
      "bhubaneswar",
      "cuttack",
      "patna",
      "jamshedpur",
      "dhanbad",
      "durgapur",
      "asansol",
      "siliguri",
      "guwahati",
    ],
    central: [
      "jaipur",
      "jodhpur",
      "udaipur",
      "kota",
      "ajmer",
      "bikaner",
      "indore",
      "bhopal",
      "ujjain",
      "gwalior",
      "jabalpur",
      "raipur",
    ],
  };

  const getRegion = (city) => {
    const cityLower = city.toLowerCase();
    for (const [region, cities] of Object.entries(regions)) {
      if (cities.includes(cityLower)) return region;
    }
    return "unknown";
  };

  const region1 = getRegion(city1);
  const region2 = getRegion(city2);

  // Approximate distances between regions
  const interRegionDistances = {
    "north-west": 800,
    "north-south": 1800,
    "north-east": 1200,
    "north-central": 400,
    "west-south": 900,
    "west-east": 1600,
    "west-central": 600,
    "south-east": 1400,
    "south-central": 1000,
    "east-central": 800,
  };

  const intraRegionDistances = {
    north: 400,
    west: 500,
    south: 600,
    east: 400,
    central: 300,
  };

  if (region1 === region2) {
    return intraRegionDistances[region1] || 400;
  }

  const key = [region1, region2].sort().join("-");
  return interRegionDistances[key] || 1000;
}
