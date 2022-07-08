import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useSubscribe, useFind } from "meteor/react-meteor-data"

import { ContactsCollection } from "../api/ContactsCollection";
import { WalletsCollection } from "../api/WalletsCollection";

import { Loading } from "./components/Loading";
import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";

export const Wallet = () => {
  const isLoadingContacts = useSubscribe('contacts');
  const isLoadingWallets = useSubscribe('wallets');

  const contacts = useFind(() => {
    return ContactsCollection.find(
      { archived: { $ne: true }}, 
      { sort: {createdAt: -1 }}
    );
  });

  const [wallet] = useFind(() => WalletsCollection.find());

  const [open, setOpen] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationWallet, setDestinationWallet] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const addTransaction = () => {
    Meteor.call('transactions.insert', {
      isTransferring,
      sourceWalletId: wallet._id,
      destinationWalletId: destinationWallet?.walletId || "",
      amount: Number(amount),
      createdAt: new Date(),
    }, (errorResponse) => {
      if (errorResponse) {
        errorResponse.details?.forEach((error) => {
          setErrorMessage(error.message);
        });
      } else {
        setOpen(false);
        setDestinationWallet({});
        setAmount(0);
        setErrorMessage("");
      }
    });
  }

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Main Account
            </div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Wallet ID:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div className="text-2xl font-bold text-gray-700">
              {` ${wallet.balance} ${wallet.currency}` }
            </div>
          </div>

          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-slate-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage("");
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
                  setErrorMessage("");
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
              <div className="mt-2">
                <SelectContact 
                  title="Destination contact"
                  contacts={contacts}
                  contact={destinationWallet}
                  setContact={setDestinationWallet}
                />
              </div>
            )}

            <div className="mt-2">
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
                min={0}
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
