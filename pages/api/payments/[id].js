import * as Stripe from "stripe";
import nc from "next-connect";

const API_SECRET = process.env.STRIPE_API_SECRET_TEST;

const stripe = new Stripe(API_SECRET);

const handler = nc().post(async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const payment = await stripe.paymentIntents.retrieve(id);
    return res.json({
      id: payment.id,
      amount: payment.amount / 100,
      created: payment.created,
      description: payment.description,
      email: payment.receipt_email,
      name: payment.metadata.name,
    });
  } catch (e) {
    console.log(e);
    return res.statusCode(404);
  }
});

export default handler;
