import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
      const client = await clientPromise;
      const db = client.db("mosqueData");
      const hadith = db.collection("hadithList");
  
      const body = await req.json(); // Parse the incoming request body
  
      const result = await hadith.insertOne(body);
  
      // Return success response
      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 201,
      });
    } catch (error) {
      // Return error response
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
      });
    }
  }