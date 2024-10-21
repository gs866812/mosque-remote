// /api/get/donorList/route.js
export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donorCollection = db.collection("donorList");

    // Extract query parameters for pagination and search term
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 20;
    const search = url.searchParams.get('search') || '';

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Define the filter based on the search term
    let filter = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
      const isNumericSearch = !isNaN(search); // Check if search is a number
      filter = {
        $or: [
          ...(isNumericSearch ? [{ donorID: parseInt(search) }] : []),
          { donorName: { $regex: searchRegex } },
          { donorAddress: { $regex: searchRegex } },
          { donorContact: { $regex: searchRegex } },
        ],
      };
    }

    // Fetch paginated and filtered donors from MongoDB
    const result = await donorCollection.find(filter).sort({ _id: -1 }).skip(skip).limit(limit).toArray();

    // Fetch total count for pagination (with filter applied)
    const totalDonors = await donorCollection.countDocuments(filter);

    // Return success response with donor data and total count
    return new Response(JSON.stringify({ donors: result, total: totalDonors }), {
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
