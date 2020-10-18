import * as Stripe from "stripe";
const API_SECRET = process.env.STRIPE_API_SECRET;

const stripe = new Stripe(API_SECRET);

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "mxn",
        metadata: { integration_check: "accept_a_payment" },
      });

      return res.json({ clientSecret: paymentIntent.client_secret });
  }
};
