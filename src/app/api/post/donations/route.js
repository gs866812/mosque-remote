// /api/post/donations.route.js
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
    const totalIncome = db.collection("totalIncomeList");

    const body = await req.json(); // Parse the incoming request body

    // Check if donor already exists using donorID or donorContact
    let existingDonor = null;

    if (body.donorID) {
      existingDonor = await donor.findOne({ donorID: parseInt(body.donorID, 10) });
    } else {
      existingDonor = await donor.findOne({ donorName: body.donorName.trim(), donorAddress: body.donorAddress.trim() });
    }

    let donorID;

    if (existingDonor) {
      // Donor exists, update donateAmount and use the existing donorID
      const currentDonationAmountInEnglish = parseFloat(convertBengaliToEnglish(existingDonor.donateAmount));
      const newDonationAmount = currentDonationAmountInEnglish + parseFloat(convertBengaliToEnglish(body.donationAmount));

      await donor.updateOne(
        { donorID: existingDonor.donorID },
        {
          $set: {
            donateAmount: convertEnglishToBengali(newDonationAmount),
          },
        }
      );

      donorID = existingDonor.donorID;
    } else {
      // Donor does not exist, create a new donor and get the new donorID
      const lastDonor = await donor.find().sort({ donorID: -1 }).limit(1).toArray();
      donorID = lastDonor.length > 0 ? lastDonor[0].donorID + 1 : 10;

      await donor.insertOne({
        donorID: donorID, // Keeping donorID in English
        donorName: body.donorName.trim(),
        donorAddress: body.donorAddress.trim(),
        donorContact: body.donorContact.trim(),
        donateAmount: body.donationAmount, // Store the amount in Bengali numerals
      });
    }

    // Insert the donation data into MongoDB (store as Bengali numerals from user input)
    await donation.insertOne({
      ...body,
      donorID, // Assign the donorID from either the existing or the newly created donor
    });

    // Convert donationAmount from Bengali numerals to English numerals for calculation
    const donationAmountInEnglish = parseFloat(convertBengaliToEnglish(body.donationAmount));

    // Check if the total balance exists in totalIncome collection and update accordingly
    const incomeExist = await totalIncome.findOne({});
    if (!incomeExist) {
      await totalIncome.insertOne({
        totalIncome: convertEnglishToBengali(donationAmountInEnglish),
      });
    } else {
      const currentIncomeInEnglish = parseFloat(convertBengaliToEnglish(incomeExist.totalIncome));
      const updatedIncomeInEnglish = currentIncomeInEnglish + donationAmountInEnglish;
      const updatedIncomeInBengali = convertEnglishToBengali(updatedIncomeInEnglish);

      await totalIncome.updateOne({}, {
        $set: { totalIncome: updatedIncomeInBengali },
      });
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
