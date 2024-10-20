export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expense = db.collection("expenseList");

    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;

    const skip = (page - 1) * limit;

    // Get the total count
    const total = await expense.countDocuments();

    // Fetch the data with pagination
    const expenses = await expense
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Return success response with expenses and total count
    return new Response(
      JSON.stringify({ expenses, total }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
