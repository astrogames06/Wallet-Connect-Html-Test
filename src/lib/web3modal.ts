import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi'

import {
	reconnect, getAccount
} from '@wagmi/core'

import {
	arbitrum,
	aurora,
	avalanche,
	base,
	bsc,
	celo,
	gnosis,
	mainnet,
	optimism,
	polygon,
	zkSync,
	zora,
	goerli,
	ronin,
	saigon,
	dogechain,
} from 'viem/chains'

const projectId = "bd9425e479238b5be58b574c55534f34";

const metadata = {
	name: 'Web3Modal',
	description: 'Web3Modal Example',
	url: 'https://web3modal.com',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const chains = [
	mainnet,
	polygon
] as const

export const wagmiConfig = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	enableCoinbase: false,
	enableInjected: false,
})

reconnect(wagmiConfig)

export let modal = createWeb3Modal({
	wagmiConfig,
	projectId,
	themeMode: 'dark',
	featuredWalletIds: [],
	enableAnalytics: true,
})

export function get_address()
{
	return getAccount(wagmiConfig).address;
}