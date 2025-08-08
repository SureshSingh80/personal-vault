"use client";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const EditPopUp = ({
  editPopUp,
  setEditPopUp,
  setKeyValue,
  keyValueToEdit,
  setKeyValueToEdit,
  userCredentials,
  error,
  setError,
}) => {
  const [loading, setLoading] = useState(false);

  const handleEditKeyValue = async () => {
    if (!keyValueToEdit.key || !keyValueToEdit.value) {
      setError("Please enter key and value");
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const res = await axios.post("/api/editKeyValue", {
        newKey: keyValueToEdit.key,
        newValue: keyValueToEdit.value,
        userCredentials,
        _id: keyValueToEdit._id,
      });
      console.log(res);
      setEditPopUp(false);
      setLoading(false);

      //  window.location.reload();
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log("edit error message== ", error);
    }
  };

  // fetch data after each updation
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/fetchUserData", {
          userId: userCredentials._id,
        });
        console.log("res== ", res);
        setKeyValue(res.data.data);
      } catch (error) {
        setError(error);
        console.log("Error in fetching user data in API: ", error);
      }
    };
    userCredentials._id && fetchUserData();
  }, [loading]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500  ${
        editPopUp
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* creating a form */}
      <div
        className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}
      >
        <CloseIcon
          onClick={() => setEditPopUp(false)}
          sx={{ fontSize: 25 }}
          className="mr-2 text-slate-700 cursor-pointer absolute top-4 right-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Edit Key Value
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please Edit Key and Value
        </p>
        <input
          type="text"
          placeholder="Enter Key"
          value={keyValueToEdit?.key || ''}
          onChange={(e) =>
            setKeyValueToEdit({ ...keyValueToEdit, key: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Enter Value"
          value={keyValueToEdit?.value || ''}
          onChange={(e) =>
            setKeyValueToEdit({ ...keyValueToEdit, value: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleEditKeyValue}
          className="bg-slate-700 text-white py-2 px-4 rounded-md mr-2 cursor-pointer w-full"
        >
          {loading && !error ? <p>Please wait...</p> : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default EditPopUp;
