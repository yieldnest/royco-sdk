import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xa74b61544834483b093531cff533d01788a5dea12d8a83902646111025303bfb`,
  name: `Provide WBTC-pumpBTC.bera Liquidity on Kodiak`,
  description: `Deposit WBTC-pumpBTC.bera Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-pumpBTC.bera Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, PumpBTC, and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.     

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~2x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],
  external_incentives: [
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "PumpBTC Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x (for eligible assets)";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
