
# Alread added
 - safe
 1. Auth Kit
 2. OnramopKit
 3. Relay Kit
We are using the Relay Kit  & 1Balance to cover all gas costs and fees for any relay call, regardless of the underlying chain.

A user could request relay calls on Ethereum mainnet, and Gelato will query their 1Balance to see if they possess enough equivalent USDC to cover the costs for this call.  If the balance is sufficient, Gelato will go ahead and relay the message on-chain.
To see the balance
https://relay.gelato.network/balance


 - stripe for demo purposes use this information https://docs.safe.global/learn/safe-core/safe-core-account-abstraction-sdk/onramp-kit

# I need to add
- base: baseDeployedContract: 0x9221bde96f1EdD09716253380C8ba15C2F7d00a2 for details: https://docs.base.org/using-base
Network Name	Base Goerli
RPC Endpoint	https://goerli.base.org
Chain ID	84531
Currency Symbol	ETH
Block Explorer	https://goerli.basescan.org/


- Gnosis Chain baseDeployedContract

- Integrate Gelato’s Gasless Wallet SDK for smooth onboarding & UX
    -



- Best use of Superfluid and NFTs






This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
