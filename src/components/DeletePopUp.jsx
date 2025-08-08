"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Loader from "@/components/Loader";

const DeletePopUp = ({
  deletePopUp,
  setDeletePopUp,
  setKeyValue,
 
  keyValueToDelete,
  setKeyValueToDelete,
  userCredentials,
  error,setError
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete("/api/deleteKeyValue", {
        data: { userCredentials, _id: keyValueToDelete._id },
      });
      console.log("res= ", res);
      setDeletePopUp(false);
      setLoading(false);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  // fetch data after each deletion
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/fetchUserData", {
          userId: userCredentials._id,
        });
        console.log("res== ", res);
        setKeyValue(res.data.data);
      } catch (error) {
        console.log("Error in fetching user data in API: ", error);
      }
    };
    userCredentials._id && fetchUserData();
  }, [loading]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 text-black  ${
          deletePopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}
        >
          <CloseIcon
            onClick={() => setDeletePopUp(false)}
            sx={{ fontSize: 25 }}
            className="mr-2 text-slate-700 cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Delete</h1>
          <p className="text-gray-600 mb-2 text-center">
            Are you sure to Delete this coupon ?
          </p>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* choice for delete */}
          <div>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 cursor-pointer "
            >
              Delete
            </button>
            <button
              onClick={() => setDeletePopUp(false)}
              className="bg-slate-700 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopUp;
