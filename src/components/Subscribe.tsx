// src/components/Subscribe.tsx
import { markketplace } from "@config";
import SubscriptionModal from "./SubscriptionModal";
import { useState } from "react";

interface Props {
  storeId: string;
  storeName: string;
}

export default function Subscribe({ storeId, storeName }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

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
            title={`${storeName} Error`}
            message1="Something went wrong."
            message2="Please try again later or contact support if the issue persists."
            buttonText="Close"
            onClose={() => { setOpenErrorModal(false) }}
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
            setOpenModal(true);
          } catch (error) {
            console.log(error)
            setOpenErrorModal(true)
          }
        }}
      >
        <section className="bg-gray-900 py-24 text-white">
          <div className="mx-auto max-w-4xl px-8 text-center">
            <div className="mb-8">
              <div className="mx-auto mb-8 h-16 w-px bg-white"></div>
            </div>

            <h3 className="mb-8 text-4xl font-extralight tracking-tight md:text-5xl">
              Stay Connected
            </h3>

            <p className="mb-12 text-lg leading-relaxed font-light text-gray-300">
              Be the first to discover new features, events, and artist
              spotlights
            </p>

            <div className="mx-auto mb-8 flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 border border-white/20 bg-white/10 px-6 py-4 font-light text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white px-8 py-4 text-sm font-light tracking-wider text-gray-900 uppercase transition-colors hover:bg-gray-100"
              >
                Subscribe
              </button>
            </div>

            <p className="text-xs font-light text-gray-400">
              There are literally dozens of us
            </p>
          </div>
        </section>
      </form>
    </div>
  );
}
