import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { TbConfetti } from "react-icons/tb";

import { FetchDocument, UpdateDcoument } from "@/Api/Apis";
import { FaSpellCheck } from "react-icons/fa";

const initialState = {
  Name: "",
  Price: null,
  Discount: null,
  Offer: "",
  Category: "",
  Brand: "",
  Description: "",
  productNo: null,
  imageUrl: "",
  ExpiryTime: "",
};
const UpdateOffer = ({ id }) => {
  const { document } = FetchDocument("products", id);
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    Name,
    Price,
    Discount,
    Offer,
    productNo,
    Category,
    Brand,
    Description,
    imageUrl,
    ExpiryTime,
  } = form;
  const router = useRouter();

  useEffect(() => {
    setForm({ ...document });
    setSelectedFile(imageUrl);
  }, [document, imageUrl]);

  // add product
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (id) {
      try {
        UpdateDcoument("products", form.id, selectedFile, imageUrl, form);
        router.push("/ProductView");
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };
  const onOfferChange = (e) => {
    setForm({ ...form, Offer: e.target.value });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="lg:w-[40%] w-[85%] flex flex-col items-center m-auto p-[3vmax]
       bg-dark lg:gap-3 gap-2 rounded-lg text-black"
      onSubmit={HandleSubmit}
    >
      <h1 className="font-sans block lg:text-3xl text-2xl text-white">
        Update Product's Offer
      </h1>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full p-2"
      >
        <TbConfetti className="h-7 w-7" />

        <select
          className="w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
          onChange={onOfferChange}
          value={Offer}
        >
          <option value="Offer">Set Offer</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <p className="mb-2.5 text-xl font-semibold text-white">
        Expiry Date Should Be Like: (June 8, 2023 04:55:00)
      </p>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border border-gray-300
       text-gray-900 text-sm rounded-lg w-full p-2"
      >
        <FaSpellCheck className="h-7 w-7" />
        {/* June 8, 2023 04:55:00 */}
        <input
          type="text"
          placeholder="Expiry Date"
          name="ExpiryTime"
          value={ExpiryTime}
          onChange={handleChange}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>
      <button
        className="block border-none w-full pl-10 p-2.5 rounded-[4px] bg-primary 
        outline-none cursor-pointer font-medium disabled:bg-green-200 disabled:cursor-default"
        type="submit"
        disabled={isLoading}
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateOffer;
