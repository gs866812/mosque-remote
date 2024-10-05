import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise; // Await connection to MongoDB
        const db = client.db("mosqueData"); // Select your database
        const costing = db.collection("costingList"); // Access the 'costingList' collection

        const result = await costing.find({}).toArray();

        // Return the data as a JSON string
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
