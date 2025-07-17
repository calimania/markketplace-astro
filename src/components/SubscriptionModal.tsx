import React from "react";

interface Props {
  error?: boolean;
  title?: string;
  message1?: string;
  message2?: string;
  buttonText?: string;
  onClose: () => void;
}

const SubscriptionModal: React.FC<Props> = ({
  error,
  title = "Welcome Aboard!",
  message1 = "Thanks for subscribing to our newsletter!",
  message2 = "You'll be the first to know about our latest updates, special offers, and exclusive content.",
  buttonText = "Got it, thanks!",
  onClose,
}) => {
  return (
    <div className="modal-content bg-white p-6 rounded-lg max-w-lg w-full mb-[600px] shadow-2xl">
      <div className="flex justify-center items-center relative">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          {error ? title : `🎉 ${title} ✨`}
        </h2>

        <button
          onClick={() => {
            try {
              console.log("Close button clicked");
              onClose();
            } catch (error) {
              console.error("Error in onClose handler:", error);
            }
          }}
          className="text-black dark:text-white hover:text-gray-400 absolute right-0 mb-[4em]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600">{message1}</p>
      <p className="mt-4 text-gray-600">{message2}</p>
      <button
        onClick={onClose}
        className="mt-6 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SubscriptionModal;
