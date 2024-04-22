const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Set up a route to handle credit score check requests
app.post("/check-credit-score", async (req, res) => {
  const { name, ssn, address } = req.body;

  // Construct the request body
  const requestBody = {
    productCode: "creditreport",
    ssn: ssn,
    name: {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
    },
    address: {
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    },
  };

  try {
    // Send a request to Equifax API to get the credit score
    const response = await axios.post(
      "https://api.equifax.com/v1/report/consumer/creditreport",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "X-EFX-API-KEY": "<YOUR_API_KEY>", // Replace with your Equifax API key
        },
      }
    );

    // Extract the credit score from the response
    const creditScore = response.data.score;

    // Return the credit score to the client
    res.json({ creditScore });
  } catch (error) {
    // Handle any errors that occur during the credit check process
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
