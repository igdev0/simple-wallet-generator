# Simple Wallet Generator

A wallet generator that allows users to create multiple individual wallets from a single, randomly generated seed phrase, enhancing manageability.

<img src="./public/demo.gif" alt="Demo">

## Setting up

1. Clone the repo

```bash
git clone https://github.com/your-username/simple-wallet-generator.git && cd simple-wallet-generator
```
2. Install dependencies

```bash 
npm install
```

3. Copy & setup the environment variables

```bash
cp .env.example .env
```

## Start the project

```bash
npm run dev 
```

## Running the tests

1. End-to-end (make sure the app is running)

```bash 
npm run e2e:run
```
or 
```bash
npm run e2e:open
```

2. Unit tests

```bash 
npm test 
```