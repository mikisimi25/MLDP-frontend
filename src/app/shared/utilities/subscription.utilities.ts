import { Subscription } from "rxjs";

/**
 *  Function to unsubscribe of a subscription
 * @param subscriptions collection of subscriptions, of wich you want unsuscribe
 */
export const unsubscribe = ( subscriptions: Subscription[] ) => {
  subscriptions.forEach( subscription => subscription.unsubscribe());
}
