// /api/post/incomeCategory/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const incomeCategory = db.collection("incomeCategories");

    const body = await req.json(); // Parse the incoming request body

    // Insert the income category into MongoDB
    const result = await incomeCategory.insertOne(body);

    // Return success response
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}