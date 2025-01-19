"use strict";
// import redisClient from "../redis-client.js";
// import dotenv from "dotenv";
// dotenv.config();
// export class CachedDataClass {
//   sampleDataRetrive = async (): Promise<any[]> => {
//     let data: any = [];
//     const CACHE_TTL = parseInt(process.env.CACHE_TTL || "3600", 10); // Default to 3600 seconds if not set
//     const cacheKey = "sensors";
//     try {
//       // // Check if data is in cache
//       const cachedData = await redisClient.get(cacheKey);
//       if (cachedData) {
//         console.log("Cache hit!");
//         return JSON.parse(cachedData);
//       }
//       console.log("Cache miss. Fetching from database...");
//       data = []; // Simulate DB call
//       // Store the fetched data in Redis cache
//       await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
//       console.log("Data cached in Redis!");
//       return data;
//     } catch (error) {
//       return data;
//     }
//   };
// }
