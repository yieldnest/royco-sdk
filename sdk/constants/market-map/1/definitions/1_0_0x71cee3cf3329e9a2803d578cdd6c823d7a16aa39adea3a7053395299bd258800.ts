import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x71cee3cf3329e9a2803d578cdd6c823d7a16aa39adea3a7053395299bd258800`,
  name: `BurrBear USDC Stable Pool`,
  description: `When USDC is deposited into the market: 1. It is bridged to Berachain mainnet 2. The funds are split: - 1&#x2F;3 is used in Beraborrow&#x27;s PSM Bond to mint NECT - 1&#x2F;3 is used to mint HONEY - 1&#x2F;3 remains as USDC 3. All funds are then deposited into BurrBear&#x27;s NECT&#x2F;USDC&#x2F;HONEY liquidity pool.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0xac672544ff301415547ac98558ca2988a26b9cbd"],
  external_incentives: [
    {
      token_id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
      label: "Beraborrow bPOLLEN",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],

  native_yield: [
    {
      token_id: "1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
      label: "Stargate Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        const STG_REWARD_AMOUNT = 499750;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;

        try {
          const market_req = await roycoClient.rpc("get_enriched_markets", {
            chain_id: 1,
            market_type: 0,
            market_id:
              "0x0a7565b14941c6a3dde083fb7a857e27e12c55fa34f709c37586ec585dbe7f3f",
            page_index: 0,
            page_size: 1,
          });

          const market = market_req.data?.data?.[0];

          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=stargate-finance&vs_currencies=usd",
          );
          const priceData = await response.json();
          const stgPrice = priceData["stargate-finance"].usd;

          // Calculate annual STG rewards value
          const annualRewardValueUSD =
            STG_REWARD_AMOUNT * stgPrice * (365 / LOCK_PERIOD_DAYS);

          // Calculate APY based on TVL
          if (market?.total_value_locked && market.total_value_locked > 0) {
            annual_change_ratio =
              annualRewardValueUSD / market.total_value_locked;
          }
        } catch (error) {
          console.error("Error fetching STG price:", error);
        }

        return annual_change_ratio;
      },
    },
  ],
});
