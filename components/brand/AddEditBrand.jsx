import { useEffect, useRef, useState } from "react";
import { MdDelete, MdOutlineCreate } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineTag } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import { FetchDocument, UpdateDcoument, uploadDocument } from "@/Api/Apis";

const initialState = {
  Brand: "",
  imageUrl: "",
};

const AddEditBrand = ({ id }) => {
  const { document } = FetchDocument("brand", id);
  const [form, setForm] = useState(initialState);
  const [fileType, setFileType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const { Brand, imageUrl } = form;
  const router = useRouter();

  useEffect(() => {
    setForm({ ...document });
    setSelectedFile(imageUrl);
  }, [document, imageUrl]);

  // add product
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (Brand && selectedFile) {
      if (!id) {
        if (fileType === false) {
          toast.error("Wrong Type of Picture. Please try again.");
          setIsLoading(false);
        } else {
          try {
            uploadDocument("brand", form, selectedFile);
            setForm(initialState);
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
            UpdateDcoument("brand", form.id, selectedFile, imageUrl, form);
            router.push("/CustomizeBrand");
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

  // input image
  const addBrandLogo = (e) => {
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
  return (
    <tbody>
      <tr className="border-b bg-dark border-gray-700">
        <th
          scope="row"
          className="flex items-center px-6 py-4 whitespace-nowrap text-white"
        >
          {selectedFile && (
            <>
              <div
                className="absolute w-6 h-6 -ml-2 -mt-4 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
            rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <MdDelete className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="logo"
                className="w-10 h-10 rounded-full"
              />
            </>
          )}
          {!selectedFile && (
            <div className="pl-3">
              <div className="text-base font-semibold">
                <div
                  className="inline-flex items-center rounded-full bg-primary cursor-pointer px-3 space-x-2"
                  onClick={() => filePickerRef.current.click()}
                >
                  <AiOutlineCloudUpload className="w-5 h-5 mb-3 text-black mt-3" />
                  Upload Logo
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addBrandLogo}
                  />
                </div>
              </div>
            </div>
          )}
        </th>
        <td className="px-7 py-2">
          <div className="flex items-center">
            <div
              className="inset-y-0 inline-flex items-center justify-center pl-3 bg-gray-100 border 
            border-gray-300 text-sm rounded-lg p-2 w-56 h-12 mt-1.5 "
            >
              <AiOutlineTag className="w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Brand Name"
                name="Brand"
                onChange={handleChange}
                value={Brand}
                className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none text-gray-800 placeholder:text-gray-600"
              />
            </div>
          </div>
        </td>
        <td className="px-7 py-2 items-center justify-center">
          <button
            onClick={HandleSubmit}
            className="disabled:cursor-auto disabled:text-green-300 text-primary hover:text-primary 
            cursor-pointer  hover:bg-gray-700 rounded-full p-2"
          >
            <MdOutlineCreate className="w-6 h-6" />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default AddEditBrand;
