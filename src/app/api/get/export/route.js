export const dynamic = 'force-dynamic';
import clientPromise from "@/lib/mongodb";
import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expense = await db.collection("expenseList").find().toArray();

    const filePath = path.join(process.cwd(), "expense.json");

    // Write the JSON data to a file on the server
    fs.writeFileSync(filePath, JSON.stringify(expense, null, 2));

    // Read the file to create a response
    const fileBuffer = fs.readFileSync(filePath);

    // Send the JSON file as a response
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="expense.json"`,
      },
    });
  } catch (error) {
    console.error("Error exporting donation list:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
