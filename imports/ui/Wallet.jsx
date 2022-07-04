import React, { useState } from "react";
import { Modal } from "./components/Modal";


export const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationWallet, setDestinationWallet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const wallet = {
    _id: "123123123",
    balance: 5,
    currency: 'USD'
  }

  const addTransaction = () => {
    console.log('New Transaction', amount, destinationWallet)
  }

  return (
    <>
      <div class="flex font-sans shadow-md my-10">
        <form class="flex-auto p-6">
          <div class="flex flex-wrap">
            <div class="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Main Account
            </div>
            <div class="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Wallet ID:
            </div>
            <h1 class="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div class="text-2xl font-bold text-gray-700">
              {` ${wallet.balance} ${wallet.currency}` }
            </div>
          </div>

          <div class="flex space-x-4 text-sm font-medium">
            <div class="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-slate-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
                onClick={() => {
                  setIsTransferring(false);
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-slate-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
                onClick={() => {
                  setIsTransferring(true);
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal 
        open={open}
        setOpen={setOpen}
        title={
          isTransferring ? 'Transfer money to other wallet' : 'Add money to your wallet'
        }
        body={
          <>
            {isTransferring && (
              <div>
                <label 
                  htmlFor="destination" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Destination wallet
                </label>
                <input
                  type="string"
                  id="destination"
                  value={destinationWallet}
                  onChange={(e) => setDestinationWallet(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                  placeholder="12334555"
                />
              </div>
            )}

            <div>
              <label 
                htmlFor="amount" 
                className="block text-sm font-medium text-gray-700"
              >
                Amount value
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="bg-slate-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
            onClick={addTransaction}
          >
            {isTransferring ? "Transfer" : "Add"}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  )
}
