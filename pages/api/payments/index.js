import * as Stripe from "stripe";
import nc from "next-connect";
const API_SECRET = process.env.STRIPE_API_SECRET_TEST;

const stripe = new Stripe(API_SECRET);

const handler = nc()
  .get(async (req, res) => {
    let payments;
    try {
      const allPayments = await stripe.paymentIntents.list();

      payments = allPayments.data.map((payment) => {
        return {
          id: payment.id,
          amount: payment.amount / 100,
          created: payment.created,
          description: payment.description,
          email: payment.receipt_email,
          name: payment.metadata.name,
        };
      });
    } catch (e) {
      console.log(e);
    }

    return res.json(payments);
  })
  .post(async (req, res) => {
    const { body } = req;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount * 100,
      currency: "mxn",
      receipt_email: body.email,
      description: body.description,
      metadata: { integration_check: "accept_a_payment", name: body.name },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  });

export default handler;
