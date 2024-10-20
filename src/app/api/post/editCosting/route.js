import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Utility function to convert Bengali numerals to English numerals
function convertBengaliToEnglish(bengaliNum) {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return bengaliNum.toString().replace(/[\u09E6-\u09EF]/g, (digit) => {
    return englishDigits[bengaliDigits.indexOf(digit)];
  });
}

// Utility function to convert English numerals to Bengali numerals
function convertEnglishToBengali(englishNum) {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return englishNum.toString().replace(/[0-9]/g, (digit) => {
    return bengaliDigits[englishDigits.indexOf(digit)];
  });
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mosqueData");
    const expenseList = db.collection("expenseList");

    const body = await req.json(); // Parse the incoming request body

    // Convert expenseAmount from Bengali to English for calculation
    const expenseAmountInEnglish = convertBengaliToEnglish(body.expenseAmount);

    // Update the expense in MongoDB using the provided _id
    const result = await expenseList.updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          expenseDescription: body.expenseDescription,
          expenseCategory: body.expenseCategory,
          expenseAmount: convertEnglishToBengali(expenseAmountInEnglish),
          date: body.date,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: 'No document was updated' }), {
        status: 404,
      });
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
