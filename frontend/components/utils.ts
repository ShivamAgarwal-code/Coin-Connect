import { NFTAbi__factory } from "@/contracts/nft";
import { config } from "@/config";
import { Address, Wallet } from "fuels";

const w: any = typeof window !== "undefined" && window;

export const getWallet = async () => {
  return Wallet.fromPrivateKey(
    "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
  );
};

export const getPublicKey = async () => {
  if (w.fuel) {
    const accounts = await w.fuel.accounts();
    const publicKey = accounts[0];
    return Address.fromAddressOrString(publicKey).toB256();
  }
};

export const getContract = async () => {
  const wallet = await getWallet();
  return NFTAbi__factory.connect(config.contractId, wallet);
};
