// /api/get/costingList/route.js
export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expenseCollection = db.collection("expenseList");

    // Extract query parameters for pagination and search term
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || '';

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Define the filter based on the search term
    let filter = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
      filter = {
        $or: [
          { expenseDescription: { $regex: searchRegex } },
          { expenseAmount: { $regex: searchRegex } },
          { date: { $regex: searchRegex } },
          { expenseCategory: { $regex: searchRegex } },
        ],
      };
    }

    // Fetch paginated and filtered expenses from MongoDB
    const result = await expenseCollection.find(filter).sort({ _id: -1 }).skip(skip).limit(limit).toArray();

    // Fetch total count for pagination (with filter applied)
    const totalExpenses = await expenseCollection.countDocuments(filter);

    // Return success response with expense data and total count
    return new Response(JSON.stringify({ expenses: result, total: totalExpenses }), {
      status: 200,
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
