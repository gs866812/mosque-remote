// api/get/donationList/route.js
export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donation = db.collection("donationList");

    // Extract query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Fetch paginated donations from MongoDB
    const result = await donation.find().sort({ _id: -1 }).skip(skip).limit(limit).toArray();

    // Fetch total count for pagination
    const totalDonations = await donation.countDocuments();

    // Return success response with donation data and total count
    return new Response(JSON.stringify({ donations: result, total: totalDonations }), {
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
