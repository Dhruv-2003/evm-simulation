import { encodeFunctionData, parseEther, decodeFunctionResult } from "viem";

import { abi } from "./constants/contract";

async function main() {
  // 1. prepare params
  const data = encodeFunctionData({
    abi: abi,
    functionName: "increaseAllowance",
    args: ["0xB72a04B01BB80DfD6a42ea8E0907B892286113F2", parseEther("10")],
  });
  const from = "0xB72a04B01BB80DfD6a42ea8E0907B892286113F2";
  const to = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  console.log(`Tx data: ${data}`);
  console.log(`From : ${from}`);
  console.log(`To : ${to}`);

  // 2. define the RPC call data
  const providerEndpoint = "https://mainnet.gateway.tenderly.co";
  console.log("Using tenederly rpc endpoint ..");

  // 3. call RPC with eth_call method
  try {
    const response = await fetch(providerEndpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            nonce: null,
            type: null,
            from: from,
            to: to,
            gas: null,
            value: null,
            data: data,
            gasPrice: null,
            maxFeePerGas: null,
            maxPriorityFeePerGas: null,
            maxFeePerBlobGas: null,
          },
          "latest",
        ],
      }),
    });

    const resJson = await response.json();
    console.log(`Response for eth_call`, resJson);

    const { result } = resJson as { jsonrpc: string; result: `0x${string}` };

    const value = decodeFunctionResult({
      abi: abi,
      functionName: "increaseAllowance",
      data: result,
    });

    console.log(`Decoded result :`, resJson);
  } catch (error) {
    console.log(error);
  }

  // 4. call RPC with debug_traceCall method
  try {
    const response = await fetch(providerEndpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "debug_traceCall",
        params: [
          {
            from: from,
            to: to,
            gas: null,
            gasPrice: null,
            value: null,
            data: data,
          },
          "latest",
        ],
      }),
    });

    const resJson = await response.json();
    console.log(`Response for debug_traceCall :`, resJson);

    const { result } = resJson as any;

    console.log(`Debug Trace result :`, result);
  } catch (error) {
    console.log(error);
  }
}

main();
