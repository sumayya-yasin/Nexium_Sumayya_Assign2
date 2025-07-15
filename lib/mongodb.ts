import mongoose, { Document, Model } from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

interface FullTextDocument extends Document {
  url: string;
  text: string;
  createdAt: Date;
}

const fullTextSchema = new mongoose.Schema(
  {
    url: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "fulltexts", 
  }
);


const FullText: Model<FullTextDocument> =
  mongoose.models.FullText || mongoose.model<FullTextDocument>("FullText", fullTextSchema);

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
  } catch (error) {
    throw error;
  }
};

export async function saveFullText(url: string, text: string): Promise<FullTextDocument> {
  await connectDB();

  try {
    const result = await FullText.create({ url, text });

    return result;
  } catch (error) {
    throw error;
  }
}

export type { FullTextDocument };
