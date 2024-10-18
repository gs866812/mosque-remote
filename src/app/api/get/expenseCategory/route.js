// /api/get/expenseCategory/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expenseCategory = db.collection("expenseCategories");

    // Fetch all income categories
    const categories = await expenseCategory.find().toArray();

    // Return success response
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
