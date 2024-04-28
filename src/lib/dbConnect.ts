import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function ConnectToDB(): Promise<void> {
  if (connection.isConnected) {
    console.log(`Already connected to the database`);
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log(`Connected to database successfully`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    connection.isConnected = 0;
    process.exit(1);
  }
}

export default ConnectToDB;
