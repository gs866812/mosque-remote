// /api/post/expenseCategory/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expenseCategory = db.collection("expenseCategories");

    const body = await req.json(); // Parse the incoming request body

    // Insert the expense category into MongoDB
    const result = await expenseCategory.insertOne(body);

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