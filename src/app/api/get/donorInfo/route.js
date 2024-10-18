// /api/get/donorInfo/route.js
export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const donorID = url.searchParams.get("id");

    if (!donorID) {
      return new Response(JSON.stringify({ success: false, error: "Missing donor ID" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donorCollection = db.collection("donorList");

    // Fetch the donor info based on the provided donorID
    const donorInfo = await donorCollection.findOne({ donorID: parseInt(donorID) });

    if (!donorInfo) {
      return new Response(JSON.stringify({ success: false, error: "Donor not found" }), {
        status: 404,
      });
    }

    // Return the donor information
    return new Response(JSON.stringify({ success: true, ...donorInfo }), {
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
