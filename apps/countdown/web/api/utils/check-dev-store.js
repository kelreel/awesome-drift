// @ts-check
import { shopify } from "../shopify.js";

const GET_PLAN_QUERY = `query {
	shop {
        plan {
            partnerDevelopment
        }
	}
}`

export const checkDevStore = async (session) => {
    try {
        const client = new shopify.api.clients.Graphql({ session });

        const result = await client.query({
            data: {
                query: GET_PLAN_QUERY
            }
        });

        return result.body?.data?.shop?.plan?.partnerDevelopment || false
    } catch (e) {
        console.log("Error while checking store has 'dev' plan, e, e?.response?.errors");
        return false
    }
}