import dotenv, {DotenvConfigOutput} from 'dotenv';
import {TronWeb} from "tronweb";

const dotenvConfigOutput: DotenvConfigOutput = dotenv.config();
if (dotenvConfigOutput.error) {
    console.error('Error loading .env file:', dotenvConfigOutput.error.message);
} else {
    const tronNetwork: string | undefined = process.env.TRON_NETWORK;
    if (tronNetwork) {
        // console.log(tronNetwork);
        const adminPrivateKey: string | undefined = process.env.ADMIN_PRIVATE_KEY;
        if (adminPrivateKey) {
            // console.log(adminPrivateKey);
            try {
                const tronWeb: TronWeb = new TronWeb(
                    tronNetwork,
                    tronNetwork,
                    tronNetwork,
                    adminPrivateKey,
                );
                // console.log(tronWeb);
                const account: {
                    address: { base58: string; hex: string };
                    privateKey: string;
                    publicKey: string
                } = await tronWeb.createAccount();
                console.log(account);
            } catch (error: unknown) {
                console.error('TronWeb Error: ', error);
            }
        } else {
            console.error('ADMIN_PRIVATE_KEY is not defined in the environment variables.');
        }
    } else {
        console.error('TRON_NETWORK is not defined in the environment variables.');
    }
}
