import { writable } from 'svelte/store';
import { useBalance } from 'wagmi';

export const ethBalance = writable('Loading...');

export function fetchBalance(address: string) {

  const ethAddress = address as `0x${string}`;

  const { data: balanceData, isError, isLoading } = useBalance({
    address: ethAddress,
  });

  if (isLoading) {
    ethBalance.set('Loading...');
  } else if (isError) {
    ethBalance.set('Error fetching balance');
  } else {
    ethBalance.set(balanceData ? balanceData.formatted : 'No balance');
  }
}