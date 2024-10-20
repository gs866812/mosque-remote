// /api/get/donationList/route.js
export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donationCollection = db.collection("donationList");

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
      const isNumericSearch = !isNaN(search); // Check if search is a number
      filter = {
        $or: [
          ...(isNumericSearch ? [{ donorID: parseInt(search) }] : []),
          { donorName: { $regex: searchRegex } },
          { donorAddress: { $regex: searchRegex } },
          { donationAmount: { $regex: searchRegex } },
          { paymentOption: { $regex: searchRegex } },
          { references: { $regex: searchRegex } },
          { date: { $regex: searchRegex } },
          { incomeCategory: { $regex: searchRegex } },
        ],
      };
    }

    // Fetch paginated and filtered donations from MongoDB
    const donations = await donationCollection.find(filter).sort({ _id: -1 }).skip(skip).limit(limit).toArray();

    // Fetch total count for pagination (with filter applied)
    const totalDonations = await donationCollection.countDocuments(filter);

    // Return success response with donation data and total count
    return new Response(JSON.stringify({ donations, total: totalDonations }), {
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
