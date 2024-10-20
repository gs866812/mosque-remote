import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Make sure to import ObjectId if you want to use it

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
    const donorInfo = db.collection("donorList");

    const body = await req.json(); // Parse the incoming request body

    // Find the current donation by _id to get the previous donationAmount
    const currentDonation = await donation.findOne({ _id: new ObjectId(body._id) });
    if (!currentDonation) {
      return new Response(JSON.stringify({ success: false, message: 'Donation not found' }), {
        status: 404,
      });
    }

    // Convert previous and new donationAmount to English numerals for calculation
    const previousDonationAmount = parseFloat(convertBengaliToEnglish(currentDonation.donationAmount));
    const newDonationAmount = parseFloat(convertBengaliToEnglish(body.donationAmount));

    // Update the donation in MongoDB using the provided _id
    const result = await donation.updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          donationAmount: body.donationAmount,
          incomeCategory: body.incomeCategory,
          paymentOption: body.paymentOption,
          references: body.references,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: 'No document was updated' }), {
        status: 404,
      });
    }

    // Find the donor by donorID in the donorInfo collection
    const donor = await donorInfo.findOne({ donorID: body.donorID});
    if (!donor) {
      return new Response(JSON.stringify({ success: false, message: 'Donor not found' }), {
        status: 404,
      });
    }

    // Convert current donor's donateAmount to English numerals for calculation
    const currentDonateAmount = parseFloat(convertBengaliToEnglish(donor.donateAmount));

    // Calculate the updated donateAmount based on the difference between previous and new donationAmount
    let updatedDonateAmount = currentDonateAmount;

    if (newDonationAmount > previousDonationAmount) {
      updatedDonateAmount += (newDonationAmount - previousDonationAmount);
    } else {
      updatedDonateAmount -= (previousDonationAmount - newDonationAmount);
    }

    // Convert updated donateAmount to Bengali numerals
    const updatedDonateAmountInBengali = convertEnglishToBengali(updatedDonateAmount);

    // Update the donor's donateAmount in the donorInfo collection
    await donorInfo.updateOne(
      { donorID: body.donorID },
      {
        $set: {
          donateAmount: updatedDonateAmountInBengali,
        },
      }
    );

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
