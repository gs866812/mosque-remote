export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {

        const client = await clientPromise;
        const db = client.db("mosqueData");
        const expense = db.collection("expenseList");


        // Fetch the data
        const result = await expense.find().sort({_id: -1}).toArray();


        // Return success response
        return new Response(JSON.stringify(result), {
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
