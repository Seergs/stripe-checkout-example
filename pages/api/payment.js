import * as Stripe from "stripe";
const API_SECRET = process.env.STRIPE_API_SECRET_TEST;

const stripe = new Stripe(API_SECRET);

const calculateAmount = (current) => current * 100;

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(body.amount),
        currency: "mxn",
        receipt_email: body.email,
        description: body.description,
        metadata: { integration_check: "accept_a_payment" },
      });

      return res.json({ clientSecret: paymentIntent.client_secret });
  }
};
