import React, { useEffect, useState } from 'react';
import { ProductForm } from "scripts/ui.product"

interface Props {
  prices: any;
  product: any;
}

const CheckoutModal = ({ prices, product }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const handlePriceChange = (event: any) => {
    const price = event.target.value;
    setSelectedPrice(price);
    updateTotal(price, quantity);
  };

  useEffect(() => {
    if (isModalOpen) {
      ProductForm(); // Initialize ProductForm when modal is open
    }
  }, [isModalOpen]);

  const handleQuantityChange = (event: any) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    updateTotal(selectedPrice, newQuantity);
  };

  const handleCustomPriceChange = (event: any) => {
    const customPrice = event.target.value;
    updateTotal(customPrice, quantity);
  };

  const updateTotal = (price: number, quantity: number) => {
    const newTotal = price * quantity;
    setTotal(newTotal);
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="modal-content bg-skin-card p-6 rounded-lg max-w-lg w-full">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <form
              data-product-price={product?.data.id}
              data-product-json={JSON.stringify(product?.data)}
              className="product-form-container"
            >
              <div className="hidden md:flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                  Available Options
                </h3>
                <span className="text-sm text-gray-500">Select your preferred option</span>
              </div>

              <div className="m-4">
                <label htmlFor="price"><strong>Price Options</strong></label>
                <select
                  id="price"
                  name="price"
                  data-input="product.prices"
                  className="block w-full rounded-md border-2 border-solid border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent-500 focus:outline-none focus:ring-accent-500 dark:border-gray-600 dark:bg-gray-700"
                  onChange={handlePriceChange}
                >
                  <option value=""></option>
                  {prices.map((price: any) => (
                    <option value={price.STRIPE_ID} key={price.STRIPE_ID}>
                      {price.Name.replace(/_/gi, " ")} - ${price.Price} {price.Currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="m-4">
                <label htmlFor="quantity"><strong>Quantity</strong></label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  data-input="quantity"
                  className="w-full rounded-md border-2 border-solid border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent-500 focus:outline-none focus:ring-accent-500 dark:border-gray-600 dark:bg-gray-700"
                  onChange={handleQuantityChange}
                />
              </div>

              <div className="m-4">
                <label htmlFor="custom-price"><strong>Custom Price</strong></label>
                <input
                  type="number"
                  id="custom-price"
                  placeholder="0"
                  name="custom-price"
                  className="w-full rounded-md border-2 border-solid border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent-500 focus:outline-none focus:ring-accent-500 dark:border-gray-600 dark:bg-gray-700"
                  onChange={handleCustomPriceChange}
                />
              </div>

              <div className="m-4">
                <label htmlFor="total"><strong>Total</strong></label>
                <p className="text-4xl">${total || 0}</p>
              </div>

              <div className="m-4">
                <button
                  disabled
                  data-action-button="submit"
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-8 py-3 text-base font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Payment
                </button>

                <ol className="mt-4 text-sm text-gray-500 hidden md:flex flex-col ">
                  <li className="mb-2">We use Stripe to collect payments, and send payouts to the artists.</li>
                  <li className="mb-2">You'll be redirected to a Stripe page to continue, and we'll notify the artists after a successful transaction.</li>
                  <li className="mb-2">Currently, we don't support a shopping cart. You can get one or multiple units of the same <em>Price</em> per transaction.</li>
                  <li className="mb-2">We notify the artist after a successful transaction and forward your shipping details and email to them.</li>
                  <li className="mb-2">The artists will reach out with tracking details or follow-up steps to complete the transaction.</li>
                </ol>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Trigger Button */}
      <button
        className="flex items-center justify-center rounded-md border border-transparent bg-sky-500 px-8 py-3 text-base font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
        onClick={() => {setIsModalOpen(true)}}
      >
        Continue to Payment
      </button>
    </>
  );
};

export default CheckoutModal;