import mongoose from "mongoose";
import Stop from "../models/stop.js";
import dotenv from "dotenv";
dotenv.config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, 
    // await mongoose.connect('mongodb://localhost:27017/TransitFlow', {
     
    );
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    // server.listen(PORT, () => {
    //   console.log(`🚀 Server is running on port ${PORT}`);
    // });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });





// main()
// .then(()=>{
//     console.log("connected to database");
// })
// .catch(err => console.log(err));

// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/TransitFlow');
// }


Stop.deleteMany({})
.then(()=>{
    console.log("Stops deleted successfully");
})
.catch(()=>{
    console.log("Some error occured.")
})

const busStops=[{
  name: "'Y' Junction Udhana Magdalla Road BRTS",
  lat: 21.146092,
  lng: 72.760957,
  details: "'Y' Junction Udhana Magdalla Road BRTS, Vesu, Rundh, Surat, Gujarat 394518, India",
  timetable: [
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:49 AM'
    },
    { bus_number: '12', destination: 'ONGC Colony', time: '6:17 AM' }
  ]
} ,
{
  name: "'Y' Junction Dumas Road BRTS",
  lat: 21.144231,
  lng: 72.757999,
  details: "'Y' Junction Dumas Road BRTS, Vesu, Surat, Gujarat 394518, India",
  timetable: [
    { bus_number: '216K', destination: 'Chowk', time: '6:31 AM' },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:54 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:55 AM'
    },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:06 AM' },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:34 AM'
    }
  ]
} ,
{
  name: 'Maharana Pratap Junction BRTS',
  lat: 21.148379,
  lng: 72.766442,
  details: 'Maharana Pratap Junction BRTS, Vesu, Rundh, Surat, Gujarat 394518, India',
  timetable: [
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:01 AM'
    },
    { bus_number: '12', destination: 'ONGC Colony', time: '6:04 AM' }
  ]
} ,
{
  name: 'Magdalla T Junction BRTS',
  lat: 21.147673,
  lng: 72.760584,
  details: 'Magdalla T Junction BRTS, Piplod, Rundh, Surat, Gujarat 394518, India',
  timetable: [
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:24 AM' },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:56 AM'
    },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:36 AM' },
    { bus_number: '216B', destination: 'Chowk', time: '6:20 AM' },
    { bus_number: '216K', destination: 'Chowk', time: '6:53 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:07 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:32 AM' }
  ]
} ,
{
  name: 'Jolly Residency',
  lat: 21.146242,
  lng: 72.768395,
  details: 'Jolly Residency, Vesu, Rundh, Surat, Gujarat 394518, India',
  timetable: [
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:03 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:23 AM' }
  ]
} ,
{
  name: 'S.D Planets School',
  lat: 21.152731,
  lng: 72.771855,
  details: 'S.D Planets School, Piplod, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:31 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:51 AM'
    }
  ]
} ,
{
  name: 'S.D. Jain School BRTS',
  lat: 21.151883,
  lng: 72.772,
  details: 'S.D. Jain School BRTS, Piplod, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:40 AM'
    },
    { bus_number: '12', destination: 'ONGC Colony', time: '6:24 AM' },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:34 AM'
    },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:38 AM'
    }
  ]
} ,
{
  name: 'J.H. Ambani School BRTS',
  lat: 21.152066,
  lng: 72.775294,
  details: 'J.H. Ambani School BRTS, Vesu, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:00 AM'
    },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:01 AM'
    },
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:56 AM'
    }
  ]
} ,
{
  name: 'Someshwar Junction BRTS',
  lat: 21.153747,
  lng: 72.779741,
  details: 'Someshwar Junction BRTS, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:35 AM'
    },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:08 AM'
    },
    {
      bus_number: '15AA',
      destination: 'Althan Depot/Terminal',
      time: '6:32 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:44 AM' },
    {
      bus_number: '15CC',
      destination: 'Althan Depot/Terminal',
      time: '6:41 AM'
    },
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:09 AM'
    },
    {
      bus_number: '126R',
      destination: 'Railway Station Terminal',
      time: '6:00 AM'
    },
    {
      bus_number: '506',
      destination: 'Sunrise Vidyalaya Dindoli',
      time: '6:03 AM'
    }
  ]
} ,
{
  name: 'Piplod Main Road',
  lat: 21.154327,
  lng: 72.779231,
  details: 'Piplod Main Road, Sarunagar, Piplod, Surat, Gujarat 395007, India',
  timetable: []
} ,
{
  name: 'K.P Commerce College',
  lat: 21.183411,
  lng: 72.808864,
  details: 'K.P Commerce College, Athwa Gate, Surat, Gujarat 395001, India',
  timetable: [
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:23 AM' }
  ]
} ,
{
  name: 'Police Commissioner Office',
  lat: 21.182311,
  lng: 72.803757,
  details: 'Police Commissioner Office, Chopati, Police Line, Athwa, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:45 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:50 AM' },
    { bus_number: '216B', destination: 'Bhimpore', time: '6:00 AM' },
    { bus_number: '153R', destination: 'Kapodara', time: '6:36 AM' },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:44 AM'
    },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:30 AM'
    },
    {
      bus_number: '706',
      destination: 'ISKCON Circle',
      time: '6:53 AM'
    }
  ]
} ,
{
  name: 'City Civic Centre',
  lat: 21.18039,
  lng: 72.801418,
  details: 'City Civic Centre, Navo Mohollow, Meghdoot Society, Athwalines, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:13 AM'
    },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:03 AM'
    },
    {
      bus_number: '716',
      destination: 'Sai Pujan Residency',
      time: '6:32 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:53 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:58 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:15 AM'
    },
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road U',
      time: '6:26 AM'
    },
    {
      bus_number: '706',
      destination: 'ISKCON Circle',
      time: '6:40 AM'
    }
  ]
} ,
{
  name: 'Gandhi College',
  lat: 21.181611,
  lng: 72.815645,
  details: 'Gandhi College, Majura Gate, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:15 AM'
    },
    {
      bus_number: '01',
      destination: 'Vanita Vishram Ground',
      time: '6:56 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:35 AM'
    },
    { bus_number: '106S', destination: 'Abhva Gam', time: '6:28 AM' },
    { bus_number: '205G', destination: 'Gabheni Gam', time: '6:02 AM' },
    { bus_number: '02', destination: 'Majura Gate1', time: '6:17 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:36 AM'
    },
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:14 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:12 AM'
    }
  ]
} ,
{
  name: 'Mahavir Hospital',
  lat: 21.184932,
  lng: 72.814035,
  details: 'Mahavir Hospital, Opp. Gandhi Smruti Bhavan, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '205G',
      destination: 'Gabheni Gaam',
      time: '6:43 AM'
    },
    {
      bus_number: '205S',
      destination: 'Sachin Railway Station',
      time: '6:39 AM'
    },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:04 AM'
    },
    { bus_number: '205K', destination: 'Chowk', time: '6:00 AM' }
  ]
} ,
{
  name: 'Girls Polytechnic',
  lat: 21.186793,
  lng: 72.810452,
  details: 'Girls Polytechnic, Kharwawad, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    { bus_number: '216B', destination: 'Bhimpore', time: '6:58 AM' },
    { bus_number: '226J', destination: 'Kosad Gaam', time: '6:14 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:03 AM'
    },
    {
      bus_number: '206',
      destination: 'C.K. Pithwala Eng. College',
      time: '6:10 AM'
    },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:14 AM'
    }
  ]
} ,
{
  name: 'Athvagate',
  lat: 21.185972,
  lng: 72.810066,
  details: 'Athvagate, Athwa Gate, Surat, Gujarat 395001, India',
  timetable: []
} ,
{
  name: 'Athwagate',
  lat: 21.185152,
  lng: 72.811332,
  details: 'Athwagate, Near Kalyan Apartment, Athwa Gate, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:15 AM'
    },
    { bus_number: '106S', destination: 'Abhva Gaam', time: '6:05 AM' },
    {
      bus_number: '02',
      destination: 'Vanita Vishram Ground',
      time: '6:58 AM'
    },
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:25 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:29 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:09 AM' },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:09 AM' },
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:27 AM'
    }
  ]
} ,
{
  name: 'Man Mandir Apartment',
  lat: 21.187713,
  lng: 72.814851,
  details: 'Man Mandir Apartment, Timaliawad, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '205G',
      destination: 'Gabheni Gaam',
      time: '6:55 AM'
    },
    {
      bus_number: '205S',
      destination: 'Sachin Railway Station',
      time: '6:45 AM'
    },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:20 AM'
    },
    { bus_number: '205K', destination: 'Chowk', time: '6:28 AM' }
  ]
} ,
{
  name: 'Nanpura Post Office',
  lat: 21.190254,
  lng: 72.812963,
  details: 'Nanpura Post Office, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    { bus_number: '216B', destination: 'Bhimpore', time: '6:56 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:09 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:35 AM' },
    {
      bus_number: '206',
      destination: 'C.K. Pithwala Eng. College',
      time: '6:28 AM'
    },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:38 AM'
    }
  ]
} ,
{
  name: 'Bahumali',
  lat: 21.188453,
  lng: 72.810924,
  details: 'Bahumali, Kharwawad, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    { bus_number: '216B', destination: 'Bhimpore', time: '6:25 AM' },
    { bus_number: '226J', destination: 'Kosad Gaam', time: '6:22 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:48 AM'
    },
    {
      bus_number: '206',
      destination: 'C.K. Pithwala Eng. College',
      time: '6:47 AM'
    },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:23 AM'
    }
  ]
} ,
{
  name: 'Kuvawadi',
  lat: 21.189654,
  lng: 72.817082,
  details: 'Kuvawadi, Timaliawad, Nanpura, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '205G',
      destination: 'Gabheni Gaam',
      time: '6:15 AM'
    },
    {
      bus_number: '205S',
      destination: 'Sachin Railway Station',
      time: '6:56 AM'
    },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:36 AM'
    },
    { bus_number: '205K', destination: 'Chowk', time: '6:02 AM' }
  ]
} ,
{
  name: 'Machhiwad',
  lat: 21.191814,
  lng: 72.817168,
  details: 'Machhiwad, Machhiwar, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '205G',
      destination: 'Gabheni Gaam',
      time: '6:12 AM'
    },
    {
      bus_number: '205S',
      destination: 'Sachin Railway Station',
      time: '6:21 AM'
    },
    {
      bus_number: '204',
      destination: 'Raj Empire Godadara',
      time: '6:31 AM'
    },
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:30 AM'
    },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:55 AM'
    },
    { bus_number: '205K', destination: 'Chowk', time: '6:30 AM' }
  ]
} ,
{
  name: 'BAPS Swaminarayan Sanstha',
  lat: 21.192635,
  lng: 72.807362,
  details: 'BAPS Swaminarayan Sanstha, Anand Vatika Society, Bapu Nagar, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:44 AM'
    },
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:53 AM'
    }
  ]
} ,
{
  name: 'Corporation School',
  lat: 21.195275,
  lng: 72.809615,
  details: 'Corporation School, Bapu Nagar, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:47 AM'
    },
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:16 AM'
    }
  ]
} ,
{
  name: 'Shakti Niketan Mandir',
  lat: 21.196076,
  lng: 72.807105,
  details: 'Shakti Niketan Mandir, Jai Ambe Society, Adajan, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'Spipa (Surat)',
  lat: 21.194635,
  lng: 72.793629,
  details: 'Spipa (Surat), Shri Nath Society ,Adajan Gam, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:47 AM'
    },
    {
      bus_number: '117P',
      destination: 'Railway Station Terminal',
      time: '6:55 AM'
    }
  ]
} ,
{
  name: 'Shahi Masjid Adajan Gam',
  lat: 21.191174,
  lng: 72.794209,
  details: 'Shahi Masjid Adajan Gam, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:10 AM'
    },
    {
      bus_number: '117P',
      destination: 'Railway Station Terminal',
      time: '6:15 AM'
    }
  ]
} ,
{
  name: 'Van Bhavan',
  lat: 21.195155,
  lng: 72.793168,
  details: 'Van Bhavan, Shri Nath Society ,Adajan Gam, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '107',
      destination: 'Vivekanand College',
      time: '6:29 AM'
    },
    {
      bus_number: '107J',
      destination: 'Railway Station Terminal',
      time: '6:21 AM'
    }
  ]
} ,
{
  name: 'Shanti Kunj',
  lat: 21.194795,
  lng: 72.790486,
  details: 'Shanti Kunj, Hariom Nagar Society,Adajan Gam, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '107',
      destination: 'Vivekanand College',
      time: '6:04 AM'
    },
    {
      bus_number: '107J',
      destination: 'Railway Station Terminal',
      time: '6:45 AM'
    }
  ]
} ,
{
  name: 'Green Avenue',
  lat: 21.194375,
  lng: 72.786183,
  details: 'Green Avenue, TGB, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '107J',
      destination: 'Vivekanand College',
      time: '6:52 AM'
    },
    {
      bus_number: '107J',
      destination: 'Railway Station Terminal',
      time: '6:46 AM'
    },
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road Vesu',
      time: '6:38 AM'
    }
  ]
} ,
{
  name: 'Pal Gaam',
  lat: 21.193525,
  lng: 72.779896,
  details: 'Pal Gaam, Adajan Gam, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'Trinity Business Park',
  lat: 21.190874,
  lng: 72.788683,
  details: 'Trinity Business Park, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:39 AM'
    },
    {
      bus_number: '716',
      destination: 'Sai Pujan Residency',
      time: '6:36 AM'
    },
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road Vesu',
      time: '6:44 AM'
    }
  ]
} ,
{
  name: 'SMC Party Plot Pal',
  lat: 21.190244,
  lng: 72.782149,
  details: 'SMC Party Plot Pal, Adajan Gam, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:59 AM'
    },
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:54 AM'
    }
  ]
} ,
{
  name: 'Saurabh Society',
  lat: 21.190474,
  lng: 72.785422,
  details: 'Saurabh Society, Adajan Gam, Adajan, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:52 AM'
    },
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:33 AM'
    }
  ]
} ,
{
  name: 'Sargam Shopping Centre',
  lat: 21.171506,
  lng: 72.790722,
  details: 'Sargam Shopping Centre, City Light Town, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:45 AM' },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:40 AM'
    },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:39 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:41 AM' },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:02 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:45 AM'
    },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College',
      time: '6:27 AM'
    }
  ]
} ,
{
  name: 'Shrungar Society City Light Road',
  lat: 21.172507,
  lng: 72.793554,
  details: 'Shrungar Society City Light Road, Shringar Society, City Light Town, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:51 AM'
    },
    {
      bus_number: '126R',
      destination: 'Railway Station Terminal',
      time: '6:47 AM'
    },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:27 AM'
    },
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:18 AM'
    }
  ]
} ,
{
  name: 'Sushrut Hospital',
  lat: 21.16948,
  lng: 72.787578,
  details: 'Sushrut Hospital, SVNIT Campus, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:56 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:31 AM' },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:02 AM' },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:26 AM'
    },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:39 AM'
    },
    {
      bus_number: '107J',
      destination: 'Railway Station Terminal',
      time: '6:50 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:51 AM' },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College',
      time: '6:28 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:59 AM'
    }
  ]
} ,
{
  name: 'Umra Food Park',
  lat: 21.168665,
  lng: 72.784445,
  details: 'Umra Food Park, Sri Nehru Nagar Society, Umra Gam, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:22 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:15 AM' }
  ]
} ,
{
  name: 'Umra Gaam',
  lat: 21.171606,
  lng: 72.782144,
  details: 'Umra Gaam, Raghuvir Society, Sri Nehru Nagar Society, Umra Gam, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '14', destination: 'ONGC Colony', time: '6:33 AM' },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:30 AM'
    },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:34 AM' },
    { bus_number: '153R', destination: 'Kapodara', time: '6:29 AM' }
  ]
} ,
{
  name: 'Umra Health Centre',
  lat: 21.171954,
  lng: 72.779687,
  details: 'Umra Health Centre, Umra Gam, Athwa, Rundh, Surat, Gujarat 395007, India',
  timetable: [ { bus_number: '153R', destination: 'Kapodara', time: '6:16 AM' } ]
} ,
{
  name: 'Parle Point',
  lat: 21.175053,
  lng: 72.794619,
  details: 'Parle Point, Umra Gam, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '706', destination: 'Iskcon Cirle', time: '6:25 AM' },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College',
      time: '6:14 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:08 AM' },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:09 AM' },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:03 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Terminal',
      time: '6:36 AM'
    },
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:17 AM'
    },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:35 AM'
    },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:19 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:58 AM' }
  ]
} ,
{
  name: 'V.T Choksi College',
  lat: 21.17657,
  lng: 72.796679,
  details: 'V.T Choksi College, Meghdoot Society, Athwalines, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:45 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:30 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:16 AM'
    },
    { bus_number: '216K', destination: 'Chowk', time: '6:33 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:29 AM'
    },
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:31 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:35 AM' },
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:17 AM'
    },
    { bus_number: '216B', destination: 'Bhimpore', time: '6:03 AM' }
  ]
} ,
{
  name: 'Gujarati School Ghod DoD Road',
  lat: 21.174415,
  lng: 72.798465,
  details: 'Gujarati School Ghod DoD Road, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '106S',
      destination: 'Railway Station Terminal',
      time: '6:50 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:20 AM' },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:47 AM'
    }
  ]
} ,
{
  name: 'Tribhuvan Complex Ghod DoD Road',
  lat: 21.1748,
  lng: 72.801528,
  details: 'Tribhuvan Complex Ghod DoD Road, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '106S',
      destination: 'Railway Station Terminal',
      time: '6:37 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:41 AM' },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:44 AM'
    }
  ]
} ,
{
  name: 'Rangeela Park Ghod DoD Road',
  lat: 21.175054,
  lng: 72.804849,
  details: 'Rangeela Park Ghod DoD Road, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '106S',
      destination: 'Railway Station Terminal',
      time: '6:28 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:50 AM' },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:02 AM'
    }
  ]
} ,
{
  name: 'Athwa Pumping Station',
  lat: 21.177914,
  lng: 72.804426,
  details: 'Athwa Pumping Station, Arogya Nagar, Athwa, Surat, Gujarat 395001, India',
  timetable: []
} ,
{
  name: 'Mira Nagar Society',
  lat: 21.174575,
  lng: 72.811234,
  details: 'Mira Nagar Society, Ram Chowk, Subhash Nagar, Athwa, Surat, Gujarat 395008, India',
  timetable: []
} ,
{
  name: 'Adarsh Society',
  lat: 21.177849,
  lng: 72.811546,
  details: 'Adarsh Society, Athwa, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:24 AM'
    },
    {
      bus_number: '106S',
      destination: 'Railway Station Terminal',
      time: '6:42 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:10 AM' },
    {
      bus_number: '106S',
      destination: 'Abhva Gaam(Saraswati Mahavidhyalay)',
      time: '6:27 AM'
    }
  ]
} ,
{
  name: "St.Xavier's High School Ghod DoD Road",
  lat: 21.175717,
  lng: 72.810182,
  details: "St.Xavier's High School Ghod DoD Road, Miranagar Society, Athwa, Surat, Gujarat 395001, India",
  timetable: [
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:09 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:40 AM'
    },
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road',
      time: '6:50 AM'
    },
    {
      bus_number: '106S',
      destination: 'Abhva Gaam(Saraswati Mahavidhyalay)',
      time: '6:59 AM'
    },
    {
      bus_number: '716',
      destination: 'Sai Pujan Residency',
      time: '6:42 AM'
    },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:59 AM'
    }
  ]
} ,
{
  name: 'Panjara Pol Ghod DoD Road',
  lat: 21.176267,
  lng: 72.81609,
  details: 'Panjara Pol Ghod DoD Road, IOC Colony, Subhash Nagar, Athwa, Surat, Gujarat 395017, India',
  timetable: [
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:50 AM'
    },
    {
      bus_number: '126R',
      destination: 'Railway Station Terminal',
      time: '6:53 AM'
    }
  ]
} ,
{
  name: 'Income Tax',
  lat: 21.175848,
  lng: 72.819244,
  details: 'Income Tax, Khatodra Wadi, Surat, Gujarat 395001, India',
  timetable: [
    { bus_number: '205K', destination: 'Chowk', time: '6:30 AM' },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:19 AM'
    },
    { bus_number: '116R', destination: 'Khajod Gam', time: '6:56 AM' },
    {
      bus_number: '116R',
      destination: 'Railway Station Terminal',
      time: '6:03 AM'
    },
    {
      bus_number: '205G',
      destination: 'Gabheni Terminal',
      time: '6:33 AM'
    },
    {
      bus_number: '116BR',
      destination: 'Khajod Gam (Via Bhimrad Gaam)',
      time: '6:27 AM'
    }
  ]
} ,
{
  name: 'Khatodara Wadi',
  lat: 21.178197,
  lng: 72.825199,
  details: 'Khatodara Wadi, Khatodra Wadi, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '105',
      destination: 'Railway Station Terminal',
      time: '6:09 AM'
    },
    { bus_number: '105', destination: 'Chiku Wadi', time: '6:19 AM' }
  ]
} ,
{
  name: 'Galaxy Enclave',
  lat: 21.190046,
  lng: 72.774949,
  details: 'Galaxy Enclave, Pal Gam, Surat, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:48 AM'
    },
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:38 AM'
    }
  ]
} ,
{
  name: 'Green City',
  lat: 21.18976,
  lng: 72.770753,
  details: 'Green City, Surat, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:18 AM'
    },
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:29 AM'
    }
  ]
} ,
{
  name: 'Green City Bhatha Approach',
  lat: 21.18844,
  lng: 72.767818,
  details: 'Green City Bhatha Approach, Bhatha, Surat, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:39 AM'
    },
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:58 AM'
    }
  ]
} ,
{
  name: 'Green City Bhatha',
  lat: 21.188631,
  lng: 72.765808,
  details: 'Green City Bhatha, Bhatha, Surat, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Lambe Hanuman Temple',
      time: '6:01 AM'
    }
  ]
} ,
{
  name: 'Bhatha Gaam',
  lat: 21.184328,
  lng: 72.761888,
  details: 'Bhatha Gaam, Bhatha, Surat, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '658',
      destination: 'Mora Char Rasta',
      time: '6:24 AM'
    },
    { bus_number: '658', destination: 'Adajan GSRTC', time: '6:26 AM' }
  ]
} ,
{
  name: 'ONGC Road Junction',
  lat: 21.190507,
  lng: 72.722742,
  details: 'ONGC Road Junction, Ichchhapor, Gujarat 394515, India',
  timetable: [
    { bus_number: '658', destination: 'Adajan GSRTC', time: '6:18 AM' }
  ]
} ,
{
  name: 'Icchapor Town',
  lat: 21.191301,
  lng: 72.72805,
  details: 'Icchapor Town, Ichchhapor, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '658',
      destination: 'Mora Char Rasta',
      time: '6:34 AM'
    },
    { bus_number: '658', destination: 'Adajan GSRTC', time: '6:40 AM' }
  ]
} ,
{
  name: 'Hotel Excellency Icchapor',
  lat: 21.19156,
  lng: 72.731091,
  details: 'Hotel Excellency Icchapor, Ichchhapor, Gujarat 394510, India',
  timetable: [
    {
      bus_number: '658',
      destination: 'Mora Char Rasta',
      time: '6:17 AM'
    },
    { bus_number: '658', destination: 'Adajan GSRTC', time: '6:49 AM' }
  ]
} ,
{
  name: 'Rupali Junction BRTS',
  lat: 21.170972,
  lng: 72.816412,
  details: 'Rupali Junction BRTS, Janta Nagar, Navrachna Society, Bhatar, Athwa, Surat, Gujarat 395017, India',
  timetable: [
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:08 AM'
    },
    {
      bus_number: '15CC',
      destination: 'Althan Depot/Terminal',
      time: '6:02 AM'
    },
    { bus_number: '12', destination: 'ONGC Colony', time: '6:44 AM' },
    {
      bus_number: '116R',
      destination: 'Railway Station Terminal',
      time: '6:12 AM'
    },
    { bus_number: '116R', destination: 'Khajod Gam', time: '6:21 AM' },
    {
      bus_number: '15AA',
      destination: 'Althan Depot/Terminal',
      time: '6:31 AM'
    }
  ]
} ,
{
  name: 'Jamna Nagar Junction BRTS',
  lat: 21.16958,
  lng: 72.810913,
  details: 'Jamna Nagar Junction BRTS, Jeevkar Nagar, Athwa, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '15AA',
      destination: 'Althan Depot/Terminal',
      time: '6:46 AM'
    },
    {
      bus_number: '15CC',
      destination: 'Althan Depot/Terminal',
      time: '6:29 AM'
    },
    { bus_number: '12', destination: 'ONGC Colony', time: '6:04 AM' },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:50 AM'
    }
  ]
} ,
{
  name: 'Trimurti Apartment',
  lat: 21.170113,
  lng: 72.811664,
  details: 'Trimurti Apartment, Subhash Nagar, Athwa, Surat, Gujarat 395008, India',
  timetable: []
} ,
{
  name: 'Vivekanand Garden',
  lat: 21.169161,
  lng: 72.811787,
  details: 'Vivekanand Garden, Poonam Nagar, Bhatar, Athwa, Surat, Gujarat 395017, India',
  timetable: []
} ,
{
  name: 'Fruit Market',
  lat: 21.167021,
  lng: 72.814058,
  details: 'Fruit Market, Bhatar, Athwa, Surat, Gujarat 395017, India',
  timetable: []
} ,
{
  name: 'Uma Bhavan Bhatar Road',
  lat: 21.167728,
  lng: 72.814428,
  details: 'Uma Bhavan Bhatar Road, Bhatar, Athwa, Surat, Gujarat 395017, India',
  timetable: [
    { bus_number: '116R', destination: 'Khajod Gam', time: '6:44 AM' },
    {
      bus_number: '116BR',
      destination: 'Railway Station Terminal',
      time: '6:40 AM'
    }
  ]
} ,
{
  name: 'Rupali Canal Junction Bhatar Road',
  lat: 21.16984,
  lng: 72.815427,
  details: 'Rupali Canal Junction Bhatar Road, Bhatar, Athwa, Surat, Gujarat 395017, India',
  timetable: [
    {
      bus_number: '116BR',
      destination: 'Khajod Gam (Via Bhimrad Gaam)',
      time: '6:19 AM'
    },
    {
      bus_number: '116BR',
      destination: 'Railway Station Terminal',
      time: '6:06 AM'
    }
  ]
} ,
{
  name: 'Sosyo Circle Udhana Magdalla Road',
  lat: 21.171977,
  lng: 72.826363,
  details: 'Sosyo Circle Udhana Magdalla Road, Gandhi Kutir, Surat, Gujarat 395017, India',
  timetable: [
    {
      bus_number: '506',
      destination: 'Sunrise Vidyalay Dindoli',
      time: '6:05 AM'
    },
    {
      bus_number: '146',
      destination: 'Railway Station Terminal',
      time: '6:12 AM'
    },
    { bus_number: '506D', destination: 'Vesu Gaam', time: '6:54 AM' },
    {
      bus_number: '146',
      destination: 'Gail India Ltd VIP Road',
      time: '6:20 AM'
    }
  ]
} ,
{
  name: 'Sosyo Circle',
  lat: 21.171036,
  lng: 72.826953,
  details: 'Sosyo Circle, Laxmi Nagar, Udhana, Surat, Gujarat 395017, India',
  timetable: [
    {
      bus_number: '105',
      destination: 'Railway Station Terminal',
      time: '6:15 AM'
    },
    { bus_number: '205K', destination: 'Chowk', time: '6:46 AM' },
    { bus_number: '205G', destination: 'Chowk', time: '6:51 AM' },
    { bus_number: '105', destination: 'Chiku Wadi', time: '6:03 AM' },
    {
      bus_number: '205K',
      destination: 'Lajpore Jail',
      time: '6:57 AM'
    }
  ]
} ,
{
  name: 'Khatodara Water Works',
  lat: 21.174258,
  lng: 72.829131,
  details: 'Khatodara Water Works, Laxmi Nagar, Udhana, Surat, Gujarat 395017, India',
  timetable: [
    { bus_number: '506D', destination: 'Vesu Gaam', time: '6:17 AM' },
    {
      bus_number: '146',
      destination: 'Railway Station Terminal',
      time: '6:55 AM'
    },
    {
      bus_number: '146',
      destination: 'Gail India Ltd VIP Road',
      time: '6:15 AM'
    },
    {
      bus_number: '506',
      destination: 'Sunrise Vidyalay Dindoli',
      time: '6:05 AM'
    }
  ]
} ,
{
  name: 'Khatodara GIDC',
  lat: 21.175308,
  lng: 72.826492,
  details: 'Khatodara GIDC, Khatodra Wadi, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '105',
      destination: 'Railway Station Terminal',
      time: '6:25 AM'
    },
    { bus_number: '105', destination: 'Chiku Wadi', time: '6:29 AM' }
  ]
} ,
{
  name: 'Udhna Darvaja',
  lat: 21.183411,
  lng: 72.830622,
  details: 'Udhna Darvaja, Maan Darwaja, Khatodra Wadi, Surat, Gujarat 395008, India',
  timetable: []
} ,
{
  name: 'Maan Darwaja',
  lat: 21.183651,
  lng: 72.833025,
  details: 'Maan Darwaja, Maan Darwaja, Aman Nagar, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '105',
      destination: 'Railway Station Terminal',
      time: '6:25 AM'
    },
    {
      bus_number: '106S',
      destination: 'Railway Station Terminal',
      time: '6:18 AM'
    },
    {
      bus_number: '146',
      destination: 'Gail India Ltd VIP Road',
      time: '6:10 AM'
    },
    { bus_number: '204', destination: 'Chowk', time: '6:07 AM' },
    { bus_number: '105', destination: 'Chiku Wadi', time: '6:35 AM' },
    { bus_number: '01', destination: 'Udhna Darwaza', time: '6:36 AM' },
    {
      bus_number: '117',
      destination: 'Railway Station Terminal',
      time: '6:53 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:54 AM' },
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:42 AM'
    },
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:52 AM'
    },
    { bus_number: '116R', destination: 'Khajod Gam', time: '6:43 AM' },
    { bus_number: '106R', destination: 'Abhva Gam', time: '6:17 AM' },
    {
      bus_number: '02',
      destination: 'Kinnary Cinema',
      time: '6:49 AM'
    },
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:34 AM'
    },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:50 AM'
    }
  ]
} ,
{
  name: 'Kinnary Cinema',
  lat: 21.185512,
  lng: 72.836802,
  details: 'Kinnary Cinema, Maan Darwaja, Aanjada Nagar, Aman Nagar, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:20 AM'
    },
    { bus_number: '116R', destination: 'Khajod Gam', time: '6:05 AM' },
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:45 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gam', time: '6:10 AM' },
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:37 AM'
    },
    {
      bus_number: '02',
      destination: 'Kamela Darwaja',
      time: '6:05 AM'
    },
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:33 AM'
    },
    {
      bus_number: '146',
      destination: 'Railway Station Terminal',
      time: '6:17 AM'
    },
    {
      bus_number: '126R',
      destination: 'Someshwar Junction',
      time: '6:59 AM'
    },
    { bus_number: '105', destination: 'Chiku Wadi', time: '6:15 AM' },
    {
      bus_number: '204',
      destination: 'Raj Empire Gadodara',
      time: '6:44 AM'
    },
    { bus_number: '01', destination: 'Maan Darwaza', time: '6:41 AM' },
    {
      bus_number: '117',
      destination: 'Railway Station Terminal',
      time: '6:56 AM'
    }
  ]
} ,
{
  name: 'Janta Hospital',
  lat: 21.186753,
  lng: 72.827919,
  details: 'Janta Hospital, Sagrampura, Surat, Gujarat 395008, India',
  timetable: [
    { bus_number: '302V', destination: 'Moti Ved', time: '6:46 AM' },
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:58 AM'
    },
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:47 AM'
    },
    {
      bus_number: '302',
      destination: 'Dabholi Gaam Approach',
      time: '6:31 AM'
    },
    {
      bus_number: '302',
      destination: 'Kharwarnagar BRTS',
      time: '6:55 AM'
    }
  ]
} ,
{
  name: 'S.M.C. Water Department',
  lat: 21.188813,
  lng: 72.824399,
  details: 'S.M.C. Water Department, Rudrapura, Surat, Gujarat 395001, India',
  timetable: [
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:10 AM'
    },
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:20 AM'
    }
  ]
} ,
{
  name: 'Navsari Bazar',
  lat: 21.189013,
  lng: 72.826653,
  details: 'Navsari Bazar, Rustampura, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:06 AM'
    },
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:22 AM'
    },
    {
      bus_number: '302',
      destination: 'Kharwarnagar BRTS',
      time: '6:17 AM'
    },
    {
      bus_number: '302',
      destination: 'Dabholi Gaam Approach',
      time: '6:00 AM'
    },
    {
      bus_number: '302V',
      destination: 'Kharwarnagar BRTS',
      time: '6:25 AM'
    }
  ]
} ,
{
  name: 'Gopi Talav Market',
  lat: 21.190094,
  lng: 72.827747,
  details: 'Gopi Talav Market, Rustampura, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '209J',
      destination: 'Vrukshlaxmi Society',
      time: '6:13 AM'
    },
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:23 AM'
    },
    {
      bus_number: '302',
      destination: 'Kharwarnagar BRTS',
      time: '6:37 AM'
    },
    {
      bus_number: '302',
      destination: 'Dabholi Gaam Approach',
      time: '6:15 AM'
    },
    {
      bus_number: '302V',
      destination: 'Kharwarnagar BRTS',
      time: '6:06 AM'
    }
  ]
} ,
{
  name: 'Halpati Colony',
  lat: 21.183912,
  lng: 72.838991,
  details: 'Halpati Colony, Nehru Nagar, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '209J',
      destination: 'Dr S.P. Mukher Brid',
      time: '6:15 AM'
    },
    {
      bus_number: '104',
      destination: 'Vrukshlaxmi Society',
      time: '6:56 AM'
    },
    {
      bus_number: '104',
      destination: 'Railway Station Terminal',
      time: '6:35 AM'
    }
  ]
} ,
{
  name: 'Sahara Darwaja',
  lat: 21.194515,
  lng: 72.84457,
  details: 'Sahara Darwaja, Sahara Darwaja, New Textile Market, Surat, Gujarat 395101, India',
  timetable: []
} ,
{
  name: 'Sai Darshan Market',
  lat: 21.187433,
  lng: 72.843068,
  details: 'Sai Darshan Market, Sahara Darwaja, Moti Begumwadi, New Textile Market, Surat, Gujarat 395002, India',
  timetable: [
    { bus_number: '204', destination: 'Chowk', time: '6:50 AM' },
    {
      bus_number: '204',
      destination: 'Raj Empire Gadodara',
      time: '6:39 AM'
    },
    {
      bus_number: '254',
      destination: 'Suman Darshan',
      time: '6:19 AM'
    },
    {
      bus_number: '254',
      destination: 'Mangal Pandey Hall Gadodara',
      time: '6:16 AM'
    }
  ]
} ,
{
  name: 'Linear Bus Stop',
  lat: 21.202463,
  lng: 72.839463,
  details: 'Linear Bus Stop, Ring Rd, Railway Station Area, Varachha, Surat, Gujarat 395003, India',
  timetable: [
    { bus_number: '19', destination: 'Vareli Gaam', time: '6:49 AM' },
    {
      bus_number: '254',
      destination: 'Suman Darshan',
      time: '6:30 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:57 AM' },
    {
      bus_number: '23',
      destination: 'Sachin Railway Station',
      time: '6:44 AM'
    },
    {
      bus_number: '21',
      destination: 'Althan Depot/Terminal',
      time: '6:55 AM'
    },
    {
      bus_number: '23',
      destination: 'Kamrej Terminal',
      time: '6:58 AM'
    },
    { bus_number: '20', destination: 'Kosad EWS H2', time: '6:30 AM' },
    {
      bus_number: '117',
      destination: 'Railway Station Terminal',
      time: '6:12 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:20 AM'
    },
    {
      bus_number: '104',
      destination: 'Railway Station Terminal',
      time: '6:09 AM'
    },
    {
      bus_number: '116BR',
      destination: 'Khajod Gam (Via Bhimrad Gaam)',
      time: '6:39 AM'
    },
    {
      bus_number: '105',
      destination: 'Railway Station Terminal',
      time: '6:33 AM'
    },
    {
      bus_number: '104',
      destination: 'Vrukshlaxmi Society',
      time: '6:14 AM'
    },
    {
      bus_number: '126R',
      destination: 'Railway Station Terminal',
      time: '6:20 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:43 AM' },
    {
      bus_number: '02',
      destination: 'Railway Station Terminal',
      time: '6:47 AM'
    },
    {
      bus_number: '21',
      destination: 'Jahangirpura Community Hall',
      time: '6:50 AM'
    }
  ]
} ,
{
  name: 'Delhi Gate Surat',
  lat: 21.203357,
  lng: 72.83995,
  details: 'Delhi Gate Surat, Railway Station Area, Varachha, Surat, Gujarat 395008, India',
  timetable: []
} ,
{
  name: 'Lambe Hanuman Temple',
  lat: 21.204349,
  lng: 72.842798,
  details: 'Lambe Hanuman Temple, Saify Society, Varachha, Surat, Gujarat 395008, India',
  timetable: [
    {
      bus_number: '147J',
      destination: 'Green City Bhatha',
      time: '6:35 AM'
    },
    { bus_number: '402', destination: 'Magob Gam', time: '6:46 AM' },
    {
      bus_number: '402',
      destination: 'Utran Railway Station',
      time: '6:38 AM'
    },
    { bus_number: '103K', destination: 'Kathor Gaam', time: '6:45 AM' },
    {
      bus_number: '103V',
      destination: 'Ramvatika Society',
      time: '6:26 AM'
    },
    {
      bus_number: '103S',
      destination: 'Haridarshan Residency',
      time: '6:20 AM'
    }
  ]
} ,
{
  name: 'Tekrawala School',
  lat: 21.209249,
  lng: 72.793275,
  details: 'Tekrawala School, Pushpak Society, Adajan, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'bsnl Office',
  lat: 21.208144,
  lng: 72.789279,
  details: 'bsnl Office, Kedarnath Society, Mahadev Nagar, Pankaj Nagar, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '117',
      destination: 'Railway Station Terminal',
      time: '6:47 AM'
    },
    {
      bus_number: '117P',
      destination: 'Railway Station Terminal',
      time: '6:59 AM'
    },
    {
      bus_number: '117',
      destination: 'Suman Jyot EWS',
      time: '6:00 AM'
    }
  ]
} ,
{
  name: 'Vichar Kranti Circle',
  lat: 21.21122,
  lng: 72.790378,
  details: 'Vichar Kranti Circle, New Mahalaxmi Society, Adajan, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'Bhagyodaya Society',
  lat: 21.211105,
  lng: 72.788356,
  details: 'Bhagyodaya Society, Dindayal Society, Palanpur Patia, Surat, Gujarat 395005, India',
  timetable: [
    {
      bus_number: '716',
      destination: 'Sai Pujan Residency',
      time: '6:19 AM'
    },
    {
      bus_number: '117',
      destination: 'Railway Station Terminal',
      time: '6:36 AM'
    },
    {
      bus_number: '117P',
      destination: 'Railway Station Terminal',
      time: '6:11 AM'
    },
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road',
      time: '6:38 AM'
    }
  ]
} ,
{
  name: 'Palanpur Patiya Circle',
  lat: 21.21147,
  lng: 72.790083,
  details: 'Palanpur Patiya Circle, Dindayal Society, Palanpur Patia, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Housing Board Palanpur',
  lat: 21.21307,
  lng: 72.787868,
  details: 'Housing Board Palanpur, Dindayal Society, Palanpur Patia, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Ramnagar BRTS',
  lat: 21.2162,
  lng: 72.791422,
  details: 'Ramnagar BRTS, NH228, Ramnagar, Sima Nagar, Surat, Gujarat 395009, India',
  timetable: [
    {
      bus_number: '137J',
      destination: 'Kavi Shree Amrut Ghayal School Variav',
      time: '6:39 AM'
    },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:54 AM' },
    {
      bus_number: '137J',
      destination: 'Railway Station Terminal',
      time: '6:31 AM'
    },
    {
      bus_number: '21',
      destination: 'Jahangirpura Community Hall',
      time: '6:34 AM'
    },
    {
      bus_number: '21',
      destination: 'Althan Depot/Terminal',
      time: '6:43 AM'
    },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:50 AM' },
    { bus_number: '217M', destination: 'Bhesan Gaam', time: '6:15 AM' },
    { bus_number: '207E', destination: 'Chowk', time: '6:19 AM' }
  ]
} ,
{
  name: 'Ram Nagar',
  lat: 21.217361,
  lng: 72.787321,
  details: 'Ram Nagar, Ramnagar, Sima Nagar, Surat, Gujarat 395005, India',
  timetable: [
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:54 AM'
    },
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:08 AM'
    }
  ]
} ,
{
  name: 'Anand Nagar Society',
  lat: 21.219961,
  lng: 72.787213,
  details: 'Anand Nagar Society, Anand Nagar Society, Morabhagal, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Gayatri Mandir',
  lat: 21.222401,
  lng: 72.787278,
  details: 'Gayatri Mandir, Dattatrey Society, Morabhagal, Surat, Gujarat 395005, India',
  timetable: [
    {
      bus_number: '716',
      destination: 'Gail India Ltd VIP Road',
      time: '6:08 AM'
    },
    {
      bus_number: '706',
      destination: 'V.N.S.G. University',
      time: '6:24 AM'
    },
    {
      bus_number: '706',
      destination: 'Iskcon Circle',
      time: '6:39 AM'
    },
    { bus_number: '217M', destination: 'Bhesan Gaam', time: '6:37 AM' },
    {
      bus_number: '716',
      destination: 'Sai Pujan Residency',
      time: '6:26 AM'
    },
    {
      bus_number: '217M',
      destination: 'Makkai Pool U',
      time: '6:20 AM'
    }
  ]
} ,
{
  name: 'Devashish Nagar Mora Bhagal',
  lat: 21.221881,
  lng: 72.785218,
  details: 'Devashish Nagar Mora Bhagal, Devashish Nagar, Morabhagal, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Shreenathaji Haveli Ramnagar',
  lat: 21.219121,
  lng: 72.785089,
  details: 'Shreenathaji Haveli Ramnagar, Gopinath Society, Ramnagar, Sima Nagar, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Raj Harmony',
  lat: 21.221461,
  lng: 72.777965,
  details: 'Raj Harmony, Surat, Gujarat 395005, India',
  timetable: [
    {
      bus_number: '107J',
      destination: 'Railway Station Terminal',
      time: '6:58 AM'
    },
    {
      bus_number: '107J',
      destination: 'Vivekanand College',
      time: '6:02 AM'
    },
    {
      bus_number: '217M',
      destination: 'Makkai Pool U',
      time: '6:26 AM'
    },
    {
      bus_number: '217',
      destination: 'Makkai Pool U',
      time: '6:52 AM'
    }
  ]
} ,
{
  name: 'Anand Villa',
  lat: 21.220881,
  lng: 72.774146,
  details: 'Anand Villa, Prabhudarshan Society, Dahin Nagar, Surat, Gujarat 395005, India',
  timetable: [
    {
      bus_number: '217M',
      destination: 'Makkai Pool U',
      time: '6:58 AM'
    },
    {
      bus_number: '217',
      destination: 'Makkai Pool U',
      time: '6:15 AM'
    },
    { bus_number: '217M', destination: 'Bhesan Gaam', time: '6:12 AM' },
    { bus_number: '217', destination: 'Bhesan Gaam', time: '6:09 AM' }
  ]
} ,
{
  name: 'SMC Staff Quarters',
  lat: 21.218381,
  lng: 72.777879,
  details: 'SMC Staff Quarters, Jahangirabad, Sima Nagar, Surat, Gujarat 395005, India',
  timetable: []
} ,
{
  name: 'Tapash Nagar',
  lat: 21.21514,
  lng: 72.777514,
  details: 'Tapash Nagar, Prashant Nagar, Jahangirabad, Sima Nagar, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'SMC Ward Office',
  lat: 21.211865,
  lng: 72.77715,
  details: 'SMC Ward Office, Prashant Nagar, Jahangirabad, Palanpur Jakatnaka, Surat, Gujarat 395009, India',
  timetable: []
} ,
{
  name: 'Kargil Chowk BRTS',
  lat: 21.165123,
  lng: 72.780411,
  details: 'Kargil Chowk BRTS, SVNIT Campus, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '14', destination: 'ONGC Colony', time: '6:08 AM' },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:22 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:01 AM'
    },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:30 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:58 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:50 AM' },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:57 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:12 AM' },
    { bus_number: '206', destination: 'Chowk', time: '6:45 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:21 AM'
    },
    { bus_number: '216B', destination: 'Chwk', time: '6:30 AM' }
  ]
} ,
{
  name: 'S.V.N.I.T. BRTS',
  lat: 21.167374,
  lng: 72.784081,
  details: 'S.V.N.I.T. BRTS, SVNIT Campus, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:24 AM'
    },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:25 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:42 AM' },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:39 AM' },
    { bus_number: '206', destination: 'Chowk', time: '6:20 AM' },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:15 AM' },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:03 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:14 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:05 AM' },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:54 AM'
    },
    { bus_number: '216B', destination: 'Chowk', time: '6:22 AM' },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College U',
      time: '6:22 AM'
    }
  ]
} ,
{
  name: 'Icchanath Mahadev Temple',
  lat: 21.168145,
  lng: 72.786269,
  details: 'Icchanath Mahadev Temple, SVNIT Campus, Athwa, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '153R',
      destination: 'Umra Health Centre',
      time: '6:59 AM'
    },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:03 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:28 AM' },
    { bus_number: '216K', destination: 'Chowk', time: '6:31 AM' },
    { bus_number: '216B', destination: 'Bhimpore', time: '6:33 AM' },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:06 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:22 AM' },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:09 AM'
    },
    { bus_number: '153R', destination: 'Kapodara', time: '6:45 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:15 AM'
    }
  ]
} ,
{
  name: 'Lancers Army School BRTS',
  lat: 21.15949,
  lng: 72.770991,
  details: 'Lancers Army School BRTS, Piplod, Rundh, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:55 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:10 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:59 AM' },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:10 AM'
    },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:19 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:06 AM'
    },
    { bus_number: '226J', destination: 'Kosad Gam', time: '6:17 AM' },
    { bus_number: '206', destination: 'Chowk', time: '6:10 AM' },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:59 AM' },
    {
      bus_number: '226J',
      destination: 'V.N.S.G. University',
      time: '6:38 AM'
    },
    { bus_number: '216B', destination: 'Chowk', time: '6:37 AM' },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College U',
      time: '6:20 AM'
    }
  ]
} ,
{
  name: 'Piplod BRTS',
  lat: 21.161431,
  lng: 72.774639,
  details: 'Piplod BRTS, Piplod, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:32 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:55 AM'
    },
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:23 AM' },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:03 AM' },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:53 AM' },
    { bus_number: '216B', destination: 'Chowk', time: '6:42 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:47 AM'
    },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College U',
      time: '6:52 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:53 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:58 AM' }
  ]
} ,
{
  name: 'Goverdhan Nathji Haveli BRTS',
  lat: 21.155978,
  lng: 72.765734,
  details: 'Goverdhan Nathji Haveli BRTS, Piplod, Surat, Gujarat 395007, India',
  timetable: [
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:05 AM'
    },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:55 AM' },
    { bus_number: '14', destination: 'ONGC Colony', time: '6:11 AM' },
    { bus_number: '216K', destination: 'Chowk', time: '6:53 AM' },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:33 AM'
    },
    {
      bus_number: '206',
      destination: 'C.K. Pithawala Eng. College U',
      time: '6:13 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:25 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:42 AM' },
    { bus_number: '216B', destination: 'Bhimpore', time: '6:48 AM' }
  ]
} ,
{
  name: 'Bharti Maiya School',
  lat: 21.155178,
  lng: 72.771657,
  details: 'Bharti Maiya School, Piplod, Surat, Gujarat 395007, India',
  timetable: [
    { bus_number: '106R', destination: 'Abhva Gaam', time: '6:50 AM' },
    {
      bus_number: '106R',
      destination: 'Railway Station Terminal',
      time: '6:55 AM'
    }
  ]
} ,
{
  name: 'Magdalla Gam BRTS',
  lat: 21.14213,
  lng: 72.755585,
  details: 'Magdalla Gam BRTS, Gail Colony, Vesu, Surat, Gujarat 394518, India',
  timetable: [
    { bus_number: '12', destination: 'ONGC Colony', time: '6:45 AM' },
    { bus_number: '14', destination: 'Kosad EWS H2', time: '6:23 AM' },
    {
      bus_number: '12',
      destination: 'Sarthana Nature Park BRTS',
      time: '6:17 AM'
    },
    {
      bus_number: '216K',
      destination: 'Dumas Langar',
      time: '6:04 AM'
    },
    {
      bus_number: '136',
      destination: 'Railway Station Terminal',
      time: '6:39 AM'
    },
    {
      bus_number: '136',
      destination: 'Surat Airport',
      time: '6:33 AM'
    },
    { bus_number: '206', destination: 'Chowk', time: '6:18 AM' }
  ]
}];

Stop.insertMany(busStops)
.catch(()=>{
    console.log("Stops cannot be added");
});
