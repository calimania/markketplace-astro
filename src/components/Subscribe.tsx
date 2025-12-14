// src/components/Subscribe.tsx
import { markketplace } from "@config";
import SubscriptionModal from "./SubscriptionModal";
import { useState } from "react";
import type Page from "../interfaces/Page";

interface Props {
  storeId: string;
  storeName: string;
  page: Page;
}

export default function Subscribe({ storeId, storeName, page }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  return (
    <div className="">
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
        <section
          className="py-8 text-white transition-colors"
        >
          <div className="mx-auto max-w-4xl px-8 text-center">
            <div className="mx-auto mb-8 flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 border theme-fae:border-fae-yellow border-white/20 theme-fae:bg-fae-mint/10 bg-white/10 px-6 py-4 font-light text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white px-8 py-4 text-sm font-light tracking-wider text-gray-900 uppercase transition-colors hover:bg-gray-100"
              >
                Subscribe
              </button>
            </div>
            <p className="mb-12 text-lg leading-relaxed font-light  text-gray-300">
              {page?.SEO?.metaDescription || 'Be the first to discover new features, events, and artist spotlights'}
            </p>
          </div>
        </section>
      </form>
    </div>
  );
}
