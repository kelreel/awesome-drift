// @ts-check
import { shopify } from '../shopify.js'

const NAMESPACE = 'billing';
const PLAN_KEY = 'plan';

const GET_APP_INSTALLATION_QUERY = `query {
    currentAppInstallation {
      id
    }
}`

const SET_APP_METAFIELD_MUTATION = `mutation SetAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafieldsSetInput) {
      metafields {
        id
        namespace
        key
      }
      userErrors {
        field
        message
      }
    }
  }`

export const setBillingMetafield = async (session, plan, initiator) => {
    const client = new shopify.api.clients.Graphql({ session })

    try {
        let result = await client.query({
            data: {
                query: GET_APP_INSTALLATION_QUERY
            }
        });

        const appInstallationId = result.body.data.currentAppInstallation.id;

        result = await client.query({
            data: {
                query: SET_APP_METAFIELD_MUTATION,
                variables: {
                    "metafieldsSetInput": [
                        {
                            "namespace": NAMESPACE,
                            "key": PLAN_KEY,
                            "type": "single_line_text_field",
                            "value": plan,
                            "ownerId": appInstallationId,
                        }
                    ]
                }
            }
        })

        console.log(`[Billing-Metafield]: set to ${plan}, for ${session.shop}; Initiator: ${initiator}`);

        return result.body.data.metafieldsSet
    } catch (e) {
        console.log(`[Billing-Metafield]: error while setting for ${session.shop}; Initiator: ${initiator}`, e, e?.response?.errors);
    }
};