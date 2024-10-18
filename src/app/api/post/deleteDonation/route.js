import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";  // Import ObjectId to handle MongoDB _id

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
    const client = await clientPromise;  // Connect to MongoDB
    const db = client.db("mosqueData");  // Use the correct database
    const donationCollection = db.collection("donationList");  // Collection name
    const totalIncome = db.collection("totalIncomeList");
    const donorInfo = db.collection("donorList");

    const { id } = await req.json();  // Get the id from the request body

    if (!id) {
      console.error('Donation ID is missing');
      return new Response(JSON.stringify({ success: false, message: 'Donation ID is required' }), {
        status: 400,
      });
    }

    // Find the donation to get its amount and donorID before deleting
    const donation = await donationCollection.findOne({ _id: new ObjectId(id) });

    if (!donation) {
      console.error('Donation not found');
      return new Response(JSON.stringify({ success: false, message: 'Donation not found' }), {
        status: 404,
      });
    }

    // Convert Bengali donationAmount to English numerals and parse it as a float
    const donationAmountInEnglish = parseFloat(convertBengaliToEnglish(donation.donationAmount));

    // Log for debugging
    console.log('Deleting donation with amount (English):', donationAmountInEnglish);
    console.log('Donor ID:', donation.donorID);

    // Step 1: Retrieve the current totalIncome in Bengali numerals
    const incomeData = await totalIncome.findOne({});
    const totalIncomeInBengali = incomeData.totalIncome;

    // Convert totalIncome from Bengali to English numerals and parse as float
    const totalIncomeInEnglish = parseFloat(convertBengaliToEnglish(totalIncomeInBengali));

    // Step 2: Calculate new total income after deduction
    const newTotalIncomeInEnglish = totalIncomeInEnglish - donationAmountInEnglish;

    // Step 3: Update the total income, converting it back to Bengali numerals
    const totalIncomeUpdateResult = await totalIncome.updateOne(
      {}, // Assuming there's only one document representing total income
      { $set: { totalIncome: convertEnglishToBengali(newTotalIncomeInEnglish) } }
    );

    console.log('Total income update result:', totalIncomeUpdateResult);

    // Step 4: Find the donor and convert the donor's donateAmount to English numerals
    const donor = await donorInfo.findOne({ donorID: donation.donorID });

    if (!donor) {
      console.error('Donor not found');
      return new Response(JSON.stringify({ success: false, message: 'Donor not found' }), {
        status: 404,
      });
    }

    const donateAmountInEnglish = parseFloat(convertBengaliToEnglish(donor.donateAmount));

    // Step 5: Calculate new donation amount for the donor
    const newDonateAmountInEnglish = donateAmountInEnglish - donationAmountInEnglish;

    // Step 6: Update the donateAmount for the donor, converting it back to Bengali numerals
    const donorUpdateResult = await donorInfo.updateOne(
      { donorID: donation.donorID },
      { $set: { donateAmount: convertEnglishToBengali(newDonateAmountInEnglish) } }
    );

    console.log('Donor update result:', donorUpdateResult);

    // Step 7: Delete the donation
    const result = await donationCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      // Successfully deleted
      return new Response(JSON.stringify({ success: true, message: 'Donation deleted successfully' }), {
        status: 200,
      });
    } else {
      // Donation not found
      return new Response(JSON.stringify({ success: false, message: 'Donation not found' }), {
        status: 404,
      });
    }

  } catch (error) {
    // Log the error for better debugging
    console.error('Error occurred while deleting donation:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
