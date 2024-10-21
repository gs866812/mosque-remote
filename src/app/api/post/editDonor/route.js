import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const donorCollection = db.collection("donorList");
    const donationCollection = db.collection("donationList");

    const body = await req.json(); // Parse the incoming request body

    // Update the donor in MongoDB using the provided _id
    const result = await donorCollection.updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          donorName: body.donorName,
          donorAddress: body.donorAddress,
          donorContact: body.donorContact,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No donor document was updated' }),
        {
          status: 404,
        }
      );
    }

    // Update all matching donations in the donationCollection by donorID
    const donationUpdateResult = await donationCollection.updateMany(
      { donorID: body.donorID },
      {
        $set: {
          donorName: body.donorName,
          donorAddress: body.donorAddress,
          donorContact: body.donorContact,
        },
      }
    );

    if (donationUpdateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No donations were updated' }),
        {
          status: 404,
        }
      );
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    // Return error response
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
