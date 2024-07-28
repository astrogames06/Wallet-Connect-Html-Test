<script lang="ts">
	import '../css/global.css'
	import '../lib/web3modal'

	import Fa from 'svelte-fa'
	import { faMoon, faSun, faDollarSign } from '@fortawesome/free-solid-svg-icons'

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Web3 from 'web3';
	import { get_address, modal } from '../lib/web3modal'

	let isDarkMode = true;
	
	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
			modal.setThemeMode('dark');
		} else {
			document.documentElement.classList.remove('dark');
			modal.setThemeMode('light');
		}
	}

  	const ethBalance = writable('Loading...');

	const url = 'https://mainnet.infura.io/v3/f82c3d3950ef4fe989f9075774442882';
	const web3 = new Web3(url);

	type EthereumAddress = `0x${string}`;

	let address: EthereumAddress = `0x${get_address()?.toString().replace('0x', '')}`;

	async function getEthBalance(address: EthereumAddress) {
		try {
		const balance = await web3.eth.getBalance(address);
		ethBalance.set(`${web3.utils.fromWei(balance, 'ether')} ETH`);
		} catch (err) {
		ethBalance.set('Error fetching balance');
		}
	}

	onMount(() => {
		getEthBalance(address);
		document.documentElement.classList.add('dark');
	});

	let got_address = get_address();
</script>

<i class="fa-regular fa-moon"></i>

<div class="navbar w-full flex justify-end h-14 items-center dark:bg-zinc-800 bg-[#FAFAFA]">
	<w3m-button id="w3m-main-button" class="mr-5"/>
	<button id="toggleDarkModeBtn" on:click={toggleDarkMode}>
		<Fa icon={!isDarkMode ? faSun : faMoon} class="mr-5 text-zinc-800 dark:text-white" />
	</button>
	
</div>

<h1 class="text-black dark:text-zinc-400 text-center underline text-xl flex items-center justify-center">
	<Fa icon={faDollarSign} class="mr-2" /> Ethereum Balance:
</h1>
<p class="text-black dark:text-zinc-400 text-center">{$ethBalance}</p>
<p class="text-black dark:text-zinc-400 text-center">{got_address}</p>