<template>
  <div class="flex h-100% w-full flex-row justify-start items-center">
    <main class="w-full h-full flex justify-between font">
      <div class="absolute h-100% flex flex-col mt-[1rem] space-y-10 ml-[5rem] max-w-[40rem]">
        <p class="text-white z-[300] text-3xl ml-16 font-extrabold mb-10 relative top-[3.5rem] p-4">
          Step - by - step guide
        </p>

        <div class="flex text-gray-400 items-stretch">
          <div
            class="bg-[#1e1f24] text-white font-extrabold text-3xl h-20 min-w-20 flex items-center justify-center rounded-full z-10"
          >
            1
          </div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-3 text-white">Spend 2 hour on project</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Read the project documentation</li>
              <li>Understand the project requirements</li>
              <li>Plan your approach</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div
            class="bg-[#1e1f24] text-white font-extrabold h-20 text-3xl min-w-20 flex items-center justify-center rounded-full z-10"
          >
            2
          </div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-2 mt-2 text-white">Mint SCube</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Connect your wallet</li>
              <li>Select the desired SCube</li>
              <li>Confirm the transaction</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div
            class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10"
          >
            3
          </div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-2 mt-2 text-white">Deposit your e-wallet "MetaMask"</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Open your MetaMask wallet</li>
              <li>Select the deposit option</li>
              <li>Follow the on-screen instructions</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div
            class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10"
          >
            4
          </div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-2 mt-2 text-white">Transfer funds to SCube</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Open your SCube account</li>
              <li>Initiate a transfer</li>
              <li>Verify the transaction</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div
            class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10"
          >
            5
          </div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-2 mt-2 text-white">Stake your SCube</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Go to the staking page</li>
              <li>Select the amount to stake</li>
              <li>Confirm and finalize the staking</li>
            </ul>
          </div>
        </div>

        <div
          class="top-0 bottom-0 fixed left-[7.1rem] transform translate-x-1 w-1 bg-gray-500 z-0"
        ></div>
      </div>

      <aside
        class="w-[32rem] h-[47rem] flex flex-col rounded-lg self-center fixed left-[55rem] top-[6.5rem]"
      >
        <div class="mt-10 ml-auto mr-auto">
          <img class="" src="https://drift-boss.io/cache/data/image/game/drift-io-m672x378.png" />
        </div>
        <p class="text-start pl-2 mt-8 font-extrabold text-2xl text-white">Description:</p>
        <div class="mt-5 ml-auto mr-auto rounded-lg p-5 text-gray-400">
          <p>
            Drift is a fully on-chain perpetual and spot DEX built on Solana. The exchange offers
            traders the ability to trade pre-launch markets and launched tokens with up to 10x
            leverage. Beyond stablecoins, traders can use a wide range of assets as collateral,
            allowing for greater capital efficiency.
          </p>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager'
import { ref } from 'vue'

// const project = ref(LocalStorageManager.getProjectByName())
</script>

<style module>
.font {
  font-family: 'Montserrat', sans-serif;
}
</style>
