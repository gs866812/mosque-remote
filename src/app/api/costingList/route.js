import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {

        const client = await clientPromise;
        const db = client.db("mosqueData");
        const expense = db.collection("expenseList");


        // Fetch the data
        const result = await expense.find().toArray();


        // Return success response
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);

        // Return error response
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
