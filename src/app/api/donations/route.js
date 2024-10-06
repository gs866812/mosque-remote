import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donation = db.collection("donationList");

    const body = await req.json(); // Parse the incoming request body

    const result = await donation.insertOne(body); // Insert data into MongoDB

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}