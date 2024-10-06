import clientPromise from "@/lib/mongodb";

// Utility function to convert Bengali numerals to English numerals
function convertBengaliToEnglish(bengaliNum) {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return bengaliNum.replace(/[০-৯]/g, (digit) => {
    return bengaliDigits.indexOf(digit);
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
    const expense = db.collection("expenseList");
    const donationBalance = db.collection("donateBalanceList");

    const body = await req.json(); // Parse the incoming request body

    // Insert the expense data into MongoDB (as Bengali numerals from user input)
    const result = await expense.insertOne(body);

    // Convert expenseAmount from Bengali numerals to English numerals for calculation
    const expenseAmountInEnglish = convertBengaliToEnglish(body.expenseAmount);
    const expenseAmount = parseFloat(expenseAmountInEnglish); // Convert to float for calculations

    // Check if the donation balance exists
    const isExist = await donationBalance.findOne({});
    
    if (!isExist) {
      // No balance exists, create a new one and store the totalBalance as Bengali numerals
      await donationBalance.insertOne({
        totalBalance: convertEnglishToBengali(- expenseAmountInEnglish), // Convert back to Bengali numerals
      });
    } else {
      // Fetch the current total balance (in Bengali numerals) and convert it to English numerals for calculation
      const currentBalanceInBengali = isExist.totalBalance;
      const currentBalanceInEnglish = parseFloat(convertBengaliToEnglish(currentBalanceInBengali));

      // Subtract the expense amount and convert the result back to Bengali numerals
      const updatedBalanceInEnglish = currentBalanceInEnglish - expenseAmount;
      const updatedBalanceInBengali = convertEnglishToBengali(updatedBalanceInEnglish);

      // Update the total balance in Bengali numerals
      await donationBalance.updateOne({}, {
        $set: { totalBalance: updatedBalanceInBengali },
      });
    }

    // Return success response
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
    });
  } catch (error) {
    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
