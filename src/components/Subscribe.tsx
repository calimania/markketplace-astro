// src/components/Subscribe.tsx
import { markketplace } from "@config";
import SubscriptionModal from "./SubscriptionModal";
import { useState } from "react";

interface Props {
  storeId: string;
  storeName: string;
}

export default function Subscribe({ storeId, storeName }: Props) {
  const [openModal, setOpenModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  return (
    <div className="">
    {/* <!-- Modal --> */}
      {openModal &&
        <div className="modal-overlay fixed inset-0 bg-opacity-70 flex justify-center items-center z-50">
          <SubscriptionModal onClose={() => {setOpenModal(false)}} />
        </div>
      }
       {openErrorModal && (
          <div className="modal-overlay fixed inset-0 bg-opacity-70 flex justify-center items-center z-50">
            <SubscriptionModal
              error={true}
              title="Error"
              message1="Something went wrong."
              message2="Please try again later or contact support if the issue persists."
              buttonText="Close"
              onClose={() => {setOpenErrorModal(false)}} 
            />
          </div>
        )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;

          try {
            const response = await fetch(`${markketplace.STRAPI_URL}/api/subscribers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                data: {
                  Email: email,
                  stores: [storeId],
                }
              })
            });

            if (!response.ok) throw new Error();
            form.reset();
            opasdsaen();
            // setOpenModal(true);
          } catch (error) {
            console.log(error)
            setOpenErrorModal(true)
          }
        }}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subscribe to {storeName}'s newsletter
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-accent-500 focus:ring-accent-500"
              placeholder="your@email.com"
            />
            <button
              style={{ background: markketplace.colors.primary, color: 'black' }}
              type="submit"
              className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
