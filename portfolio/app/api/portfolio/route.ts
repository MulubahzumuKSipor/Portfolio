import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    // Targeting your specific database name
    const db = client.db("portfolio");

    // Fetching from your three collections
    const [projects, skills, certificates] = await Promise.all([
      db.collection("projects").find({}).toArray(),
      db.collection("skills").find({}).toArray(),
      db.collection("certificates").find({}).toArray()
    ]);

    // This structure matches exactly what Portfolio.tsx expects
    return NextResponse.json({
      projects,
      skills,
      certificates
    });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}