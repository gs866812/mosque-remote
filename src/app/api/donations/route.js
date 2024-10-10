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
    const donation = db.collection("donationList");
    const donor = db.collection("donorList");
    const donationBalance = db.collection("donateBalanceList");

    const body = await req.json(); // Parse the incoming request body

    // Insert the donation data into MongoDB (store as Bengali numerals from user input)
    const result = await donation.insertOne(body);

    // Convert donationAmount from Bengali numerals to English numerals for calculation
    const donationAmountInEnglish = convertBengaliToEnglish(body.donationAmount);
    const donationAmount = parseFloat(donationAmountInEnglish); // Convert to float for calculations

    // Check if the donation balance exists
    const isExist = await donationBalance.findOne({});

    if (!isExist) {
      // No balance exists, insert a new entry with the positive initial balance (in Bengali)
      await donationBalance.insertOne({
        totalBalance: convertEnglishToBengali(donationAmountInEnglish), // Insert positive value in Bengali numerals
      });
    } else {
      // Fetch the current total balance (in Bengali numerals) and convert it to English numerals for calculation
      const currentBalanceInBengali = isExist.totalBalance;
      const currentBalanceInEnglish = parseFloat(convertBengaliToEnglish(currentBalanceInBengali));

      // Add the donation amount to the current balance and convert back to Bengali
      const updatedBalanceInEnglish = currentBalanceInEnglish + donationAmount;
      const updatedBalanceInBengali = convertEnglishToBengali(updatedBalanceInEnglish);

      // Update the total balance in Bengali numerals
      await donationBalance.updateOne({}, {
        $set: { totalBalance: updatedBalanceInBengali },
      });
    }

    // Add donor list code here
    const existingDonor = await donor.findOne({ donorContact: body.donorContact });
    if (!existingDonor) {
      // Find the highest donorID and increment it
      const lastDonor = await donor.find().sort({ donorID: -1 }).limit(1).toArray();
      const newDonorID = lastDonor.length > 0 ? lastDonor[0].donorID + 1 : 10;

      await donor.insertOne({
        donorID: newDonorID,
        donorName: body.donorName,
        donorContact: body.donorContact,
        donorAddress: body.donorAddress,
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