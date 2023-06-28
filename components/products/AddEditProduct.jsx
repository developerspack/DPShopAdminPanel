import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import {
  AiOutlineCloudUpload,
  AiOutlineFieldNumber,
  AiOutlineTag,
} from "react-icons/ai";
import { BsPatchMinusFill } from "react-icons/bs";
import { TbConfetti } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { FaSpellCheck } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdDelete, MdDescription } from "react-icons/md";

import {
  FetchCollection,
  FetchDocument,
  UpdateDcoument,
  uploadDocument,
} from "@/Api/Apis";

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

const AddEditProduct = ({ id }) => {
  const { data: brandData } = FetchCollection("brand");
  const { data: categoryData } = FetchCollection("category");
  const { document } = FetchDocument("products", id);
  const [form, setForm] = useState(initialState);
  const [fileType, setFileType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
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
    if (
      Category &&
      Name &&
      Brand &&
      Description &&
      Price &&
      Discount &&
      productNo &&
      selectedFile
    ) {
      if (!id) {
        if (fileType === false) {
          toast.error("Wrong Type of Picture. Please try again.");
          setIsLoading(false);
        } else {
          try {
            setIsLoading(true);
            uploadDocument("products", form, selectedFile);
            router.push("/ProductView");
            setIsLoading(false);
          } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
          }
        }
      } else {
        if (fileType === false) {
          toast.error("Wrong Type of Picture. Please try again.");
          setIsLoading(false);
        } else {
          try {
            setIsLoading(true);
            UpdateDcoument("products", form.id, selectedFile, imageUrl, form);
            router.push("/ProductView");
            setIsLoading(false);
          } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
          }
        }
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNoChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value); // Convert the value to a number

    setForm({ ...form, [name]: parsedValue });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, Category: e.target.value });
  };

  const onBrandChange = (e) => {
    setForm({ ...form, Brand: e.target.value });
  };
  // input image
  const addProductImage = (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    } else {
      setFileType(false);
    }
  };
  console.log(selectedFile);
  return (
    <form
      className="lg:w-[40%] w-[85%] flex flex-col items-center m-auto p-12 py-8
       bg-dark gap-2 rounded-lg text-black"
      onSubmit={HandleSubmit}
    >
      <h1 className="font-sans block lg:text-3xl text-2xl text-white">
        {id ? "Update Product" : "Create Product"}
      </h1>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border border-gray-300
       text-gray-900 text-sm rounded-lg w-full p-2"
      >
        <FaSpellCheck className="h-7 w-7" />

        <input
          type="text"
          required
          placeholder="Product Name"
          name="Name"
          value={Name}
          onChange={handleChange}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full p-2"
      >
        <GiMoneyStack className="h-7 w-7" />

        <input
          type="number"
          placeholder="Price"
          name="Price"
          onChange={handleNoChange}
          value={Price}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full p-2"
      >
        <BsPatchMinusFill className="h-7 w-7" />

        <input
          type="number"
          placeholder="Discount"
          name="Discount"
          onChange={handleNoChange}
          value={Discount}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border border-gray-300
       text-gray-900 text-sm rounded-lg w-full p-2"
      >
        <AiOutlineFieldNumber className="h-7 w-7 font-extrabold" />

        <input
          type="number"
          required
          name="productNo"
          placeholder="Number Of Items"
          onChange={handleNoChange}
          value={productNo}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>

      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full p-2"
      >
        <BiCategoryAlt className="h-7 w-7" />

        <select
          className="w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
          onChange={onCategoryChange}
          value={Category}
          required
        >
          <option value="Category">Choose Category</option>
          {categoryData.map((item, id) => (
            <option key={id}>{item?.Category}</option>
          ))}
        </select>
      </div>

      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full p-2"
      >
        <AiOutlineTag className="h-7 w-7" />

        <select
          className="w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
          onChange={onBrandChange}
          value={Brand}
          required
        >
          <option value="">Choose Brand</option>
          {brandData.map((item, id) => (
            <option key={id}>{item?.Brand}</option>
          ))}
        </select>
      </div>
      <div
        className="inset-y-0 flex items-center pl-3 bg-gray-100 border
       border-gray-300 text-sm rounded-lg w-full"
      >
        <MdDescription className="h-7 w-7" />

        <textarea
          type="text"
          required
          placeholder="Product Description"
          name="Description"
          value={Description}
          onChange={handleChange}
          className="block overflow-y-hidden w-full pl-10 p-2 bg-gray-100 border-none outline-none
           text-gray-800 placeholder:text-gray-600"
        />
      </div>
      {!selectedFile && (
        <div
          className="flex items-center justify-center w-full"
          onClick={() => filePickerRef.current.click()}
        >
          <span
            className="flex items-center justify-center w-full h-12 border-none 
          rounded-lg cursor-pointer  bg-primary"
          >
            <AiOutlineCloudUpload className="w-5 h-5 mb-3 mt-3" />
            Upload Images
            <input
              type="file"
              ref={filePickerRef}
              hidden
              onChange={addProductImage}
            />
          </span>
        </div>
      )}
      {/* Image View */}
      {selectedFile && (
        <div className="flex items-start space-x-2 scrollbar-hide">
          <div
            className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
            rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedFile(null)}
          >
            <MdDelete className="text-white h-5" />
          </div>
          <img
            src={selectedFile}
            alt=""
            className="w-full h-[20%] rounded-2xl max-h-40 object-contain"
          />
        </div>
      )}
      <button
        className="block border-none w-full pl-10 p-2.5 rounded-[4px] bg-primary 
        outline-none cursor-pointer font-medium disabled:bg-green-200 disabled:cursor-default"
        type="submit"
        disabled={isLoading}
      >
        {id ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default AddEditProduct;
