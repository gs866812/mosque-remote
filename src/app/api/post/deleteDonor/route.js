import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";  // Import ObjectId to handle MongoDB _id

export async function POST(req) {
    try {
      const client = await clientPromise;  // Connect to MongoDB
      const db = client.db("mosqueData");  // Use the correct database
      const donor = db.collection("donorList");  // Collection name

  
      const { id } = await req.json();  // Get the id from the request body

  
      // Step 7: Delete the costing
      const result = await donor.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        // Successfully deleted
        return new Response(JSON.stringify({ success: true, message: 'Data deleted successfully' }), {
          status: 200,
        });
      } else {
        // Costing not found
        return new Response(JSON.stringify({ success: false, message: 'Costing not found' }), {
          status: 404,
        });
      }
  
    } catch (error) {
      // Log the error for better debugging
      console.error('Error occurred while deleting Costing:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
      });
    }
  }