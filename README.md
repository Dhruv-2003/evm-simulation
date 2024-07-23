# EVM Transaction Simulation

## Overview

This project demonstrates an EVM simulation, including tracing against a forked Ethereum mainnet or other chain. Below are the instructions to install dependencies and run the simulation.

## Installation

To install dependencies, run:

```bash
bun install
```

## Running the Simulation

To execute the simulation, run:

```bash
bun run index.ts
```

## RPC Calls Used & How ? 

- Method `eth_call` and the actual transaction params : https://ethereum-json-rpc.com/?method=eth_call , returns the response of the call.
- Method `debug_traceCall` only available with certain clients : https://ethereum-json-rpc.com/?method=debug_traceCall , requires the tx `to` , `from` & `data` as inputs and returns the whole trace 

## Example response 

<img width="1103" alt="Screenshot 2024-07-23 at 2 27 21 AM" src="https://github.com/user-attachments/assets/0cb14056-768c-4c37-8473-d09c3dc1c8b2">

## Notes

Ensure you have the correct RPC endpoint configured for accessing the Ethereum mainnet or the desired chain fork.
