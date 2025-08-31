const parkingData = [
  {
    location: "Connaught Place, Delhi",
    name: "Rajiv Chowk Parking",
    rate: 30,
    totalSlots: 50,
    availableSlots: 32,
    openTime: "07:00",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [77.2197, 28.6328] }
  },
  {
    location: "Bandra West, Mumbai",
    name: "Linking Road Parking",
    rate: 40,
    totalSlots: 70,
    availableSlots: 18,
    openTime: "08:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [72.8347, 19.0607] }
  },
  {
    location: "Koregaon Park, Pune",
    name: "KP Central Parking",
    rate: 20,
    totalSlots: 25,
    availableSlots: 10,
    openTime: "06:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [73.8977, 18.5362] }
  },
  {
    location: "Sector 17, Chandigarh",
    name: "Plaza Parking",
    rate: 25,
    totalSlots: 60,
    availableSlots: 22,
    openTime: "07:30",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [76.7794, 30.7398] }
  },
  {
    location: "Bapu Nagar, Jaipur",
    name: "Pink City Parking",
    rate: 15,
    totalSlots: 40,
    availableSlots: 12,
    openTime: "08:00",
    closeTime: "22:30",
    geometry: { type: "Point", coordinates: [75.8126, 26.8992] }
  },
  {
    location: "MG Road, Bengaluru",
    name: "MG Road Parking Zone A",
    rate: 35,
    totalSlots: 80,
    availableSlots: 60,
    openTime: "07:00",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [77.6101, 12.9758] }
  },
  {
    location: "Park Street, Kolkata",
    name: "Park Street Multi-Level",
    rate: 30,
    totalSlots: 100,
    availableSlots: 65,
    openTime: "06:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [88.3495, 22.5523] }
  },
  {
    location: "Lalpur, Ranchi",
    name: "Ranchi Central Parking",
    rate: 20,
    totalSlots: 35,
    availableSlots: 28,
    openTime: "08:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [85.3402, 23.3431] }
  },
  {
    location: "Begumpet, Hyderabad",
    name: "Begumpet Plaza Parking",
    rate: 25,
    totalSlots: 45,
    availableSlots: 19,
    openTime: "09:00",
    closeTime: "22:30",
    geometry: { type: "Point", coordinates: [78.4584, 17.4435] }
  },
  {
    location: "Sadar Bazaar, Agra",
    name: "Sadar Parking Point",
    rate: 20,
    totalSlots: 30,
    availableSlots: 15,
    openTime: "08:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [78.0081, 27.1617] }
  },
  {
    location: "Gandhipuram, Coimbatore",
    name: "Gandhipuram Car Lot",
    rate: 18,
    totalSlots: 40,
    availableSlots: 17,
    openTime: "06:30",
    closeTime: "21:30",
    geometry: { type: "Point", coordinates: [76.9661, 11.0183] }
  },
  {
    location: "Panaji, Goa",
    name: "Mandovi Riverfront Parking",
    rate: 25,
    totalSlots: 50,
    availableSlots: 30,
    openTime: "08:00",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [73.8302, 15.4968] }
  },
  {
    location: "Patliputra, Patna",
    name: "Patna Junction Parking",
    rate: 20,
    totalSlots: 60,
    availableSlots: 41,
    openTime: "07:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [85.1416, 25.6137] }
  },
  {
    location: "Civil Lines, Kanpur",
    name: "Green Zone Parking",
    rate: 15,
    totalSlots: 38,
    availableSlots: 12,
    openTime: "09:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [80.3398, 26.4725] }
  },
  {
    location: "Teynampet, Chennai",
    name: "Anna Salai Parking Hub",
    rate: 30,
    totalSlots: 55,
    availableSlots: 23,
    openTime: "08:00",
    closeTime: "22:30",
    geometry: { type: "Point", coordinates: [80.2496, 13.0418] }
  },
  {
    location: "VIP Road, Raipur",
    name: "City Mall Parking",
    rate: 20,
    totalSlots: 40,
    availableSlots: 8,
    openTime: "10:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [81.6556, 21.2442] }
  },
  {
    location: "Laxmi Nagar, Delhi",
    name: "Metro Parking Lot",
    rate: 25,
    totalSlots: 35,
    availableSlots: 10,
    openTime: "06:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [77.2772, 28.6258] }
  },
  {
    location: "Salt Lake, Kolkata",
    name: "Sector V Parking",
    rate: 30,
    totalSlots: 60,
    availableSlots: 33,
    openTime: "07:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [88.4329, 22.5792] }
  },
  {
    location: "Hazratganj, Lucknow",
    name: "Lucknow Central Parking",
    rate: 20,
    totalSlots: 50,
    availableSlots: 35,
    openTime: "08:00",
    closeTime: "21:30",
    geometry: { type: "Point", coordinates: [80.9462, 26.8506] }
  },
  {
    location: "Indiranagar, Bengaluru",
    name: "CMH Road Parking",
    rate: 35,
    totalSlots: 48,
    availableSlots: 26,
    openTime: "08:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [77.6400, 12.9711] }
  },
  {
    location: "Ashram Road, Ahmedabad",
    name: "Riverfront Parking",
    rate: 25,
    totalSlots: 55,
    availableSlots: 15,
    openTime: "07:30",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [72.5714, 23.0300] }
  },
  {
    location: "Civil Lines, Nagpur",
    name: "Orange City Parking",
    rate: 22,
    totalSlots: 45,
    availableSlots: 19,
    openTime: "06:30",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [79.0882, 21.1466] }
  },
  {
    location: "RK Beach, Visakhapatnam",
    name: "Seafront Parking Lot",
    rate: 30,
    totalSlots: 40,
    availableSlots: 11,
    openTime: "07:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [83.3162, 17.7194] }
  },
  {
    location: "Khar West, Mumbai",
    name: "Khar Station Parking",
    rate: 35,
    totalSlots: 60,
    availableSlots: 25,
    openTime: "06:00",
    closeTime: "23:00",
    geometry: { type: "Point", coordinates: [72.8370, 19.0713] }
  },
  {
    location: "Alkapuri, Vadodara",
    name: "Alkapuri Public Parking",
    rate: 20,
    totalSlots: 50,
    availableSlots: 35,
    openTime: "07:00",
    closeTime: "21:00",
    geometry: { type: "Point", coordinates: [73.1614, 22.3094] }
  },
  {
    location: "Hinjewadi, Pune",
    name: "IT Park Parking Zone B",
    rate: 25,
    totalSlots: 100,
    availableSlots: 75,
    openTime: "06:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [73.7335, 18.5972] }
  },
  {
    location: "Sector 62, Noida",
    name: "Cyber Park Parking",
    rate: 30,
    totalSlots: 80,
    availableSlots: 47,
    openTime: "08:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [77.3688, 28.6266] }
  },
  {
    location: "Gariahat, Kolkata",
    name: "Gariahat Parking Plaza",
    rate: 28,
    totalSlots: 45,
    availableSlots: 19,
    openTime: "08:00",
    closeTime: "21:30",
    geometry: { type: "Point", coordinates: [88.3624, 22.5196] }
  },
  {
    location: "Adajan, Surat",
    name: "Adajan Central Parking",
    rate: 25,
    totalSlots: 12,
    availableSlots: 12,
    openTime: "08:00",
    closeTime: "22:00",
    geometry: { type: "Point", coordinates: [72.8013, 21.2045] }
  }
]

export default parkingData;