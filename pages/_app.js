import GlobalStyles from "../theme/GlobalStyles";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;

const stripePromise = loadStripe(PUBLISHABLE_KEY);

function MyApp({ Component, pageProps }) {
  return (
    <Elements stripe={stripePromise}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Elements>
  );
}

export default MyApp;
