// SIMULATE A FETCH TO THE API TO RETURN SOME DATA

export interface Data {
  status: boolean;
  nameOfClient: string;
  sensors: Sensors[];
}

export interface Sensors {
  Vehicle_Latitude: string;
  Vehicle_Longitude: string;
  Vehicle_Angle: string;
  Vehicle_Color: string;
  Vehicle_Label: string;
  Vehicle_Drive_type: string;
  Event_Time: string;
  Vehicle_Online_Status: string;
  REGION_NAME: string;
}

export interface LoneSensors {
  Client: string;
  Vehicle_Latitude: string;
  Vehicle_Longitude: string;
  Vehicle_Angle: string;
  Vehicle_Color: string;
  Vehicle_Label: string;
  Vehicle_Drive_type: string;
  Event_Time: string;
  Vehicle_Online_Status: string;
  REGION_NAME: string;
}

// export interface Sensors {
//   message: number;
//   room: string;
//   sensor: string;
//   status: number;
//   timestamp: Date;
// }
// export let data: Data[] = [
//   {
//   status: true,
//   nameOfClient: "Client1",
//   sensors: [
//     { message: 1, room: "0", sensor: "C1S1", status: 1, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C1S2", status: 0, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C1S3", status: 1, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C1S4", status: 0, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C1S5", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C1S6", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C1S7", status: 1, timestamp: new Date() },
//   ],
// },
// {
//   status: true,
//   nameOfClient: "Client2",
//   sensors: [
//     { message: 1, room: "0", sensor: "C2S1", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S2", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S3", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S4", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S5", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S6", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C2S7", status: 1, timestamp: new Date() },
//   ],
// },
// {
// status: true,
//   nameOfClient: "Client3",
//   sensors: [
//     { message: 1, room: "0", sensor: "C3S1", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C3S2", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C3S3", status: 1, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C3S4", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C3S5", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C3S6", status: 1, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C3S7", status: 1, timestamp: new Date() },
//   ],
// },
// {
// status: true,
//   nameOfClient: "Client4",
//   sensors: [
//     { message: 1, room: "0", sensor: "C4S1", status: 1, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C4S2", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C4S3", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C4S4", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C4S5", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C4S6", status: 0, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C4S7", status: 1, timestamp: new Date() },
//   ],
// },
// {
// status: true,
//   nameOfClient: "Client5",
//   sensors: [
//     { message: 1, room: "0", sensor: "C5S1", status: 1, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C5S2", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C5S3", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C5S4", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C5S5", status: 0, timestamp: new Date() },
//     { message: 0, room: "0", sensor: "C5S6", status: 0, timestamp: new Date() },
//     { message: 1, room: "0", sensor: "C5S7", status: 1, timestamp: new Date() },
//   ],
// },
// ];
