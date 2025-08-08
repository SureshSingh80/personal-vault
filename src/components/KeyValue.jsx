import React from "react";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { format } from "date-fns";
import "../app/globals.css";
import DeletePopUp from "@/components/DeletePopUp";
import EditPopUp from "@/components/EditPopUp";
import { Plus } from "lucide-react";
import AddKeyValuePopUp from "@/components/AddKeyValuePopUp";
import NoDataFound from '@/components/NoDataFound'

const KeyValue = ({ keyValue,setKeyValue, userCredentials }) => {
  const [showValue, setShowValue] = useState({});
  const [copied, setCopied] = useState({});
  const [editPopUp, setEditPopUp] = useState(false);
  const [keyValueToEdit, setKeyValueToEdit] = useState({});
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [keyValueToDelete, setKeyValueToDelete] = useState({});
  const [addKeyValuePopUp, setAddKeyValuePopUp] = useState(false);
  const [error, setError] = useState(false);

  // copy function
  const handleCopy = (value, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied((prev) => ({
          ...prev,
          [id]: true,
        }));
      })
      .catch((err) => {
        console.error('Clipboard copy failed:', err);
        alert("Copy failed. Try manually.");
      });
  } else {
    alert("Clipboard not supported in this environment.");
  }

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 2000);
  };
  return (
    <>
      {keyValue.length > 0 ? (
        <div
          className={`w-full ${
            editPopUp || deletePopUp || addKeyValuePopUp ? "blur-sm" : ""
          }`}
        >
          {keyValue.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-4 mx-4 my-2 flex   items-center justify-between relative key-value-items first:mt-18 last:mb-20"
            >
              <div className="key-container">
                <p className="text-lg font-bold text-slate-900 ">{item.key}</p>
                <p>
                  {format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
              <div className=" value-container">
                <input
                  type={showValue[item._id] ? "text" : "password"}
                  readOnly={true}
                  value={item.value}
                  className="border-none outline-none"
                />
                <button
                  onClick={() =>
                    setShowValue((prev) => ({
                      ...prev,
                      [item._id]: !prev[item._id],
                    }))
                  }
                  className="text-sm mr-4 ml-[-4] cursor-pointer"
                >
                  {showValue[item._id] ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: 20 }} />
                  )}
                </button>
                {copied[item._id] ? (
                  <DoneOutlinedIcon sx={{ fontSize: 23 }} />
                ) : (
                  <ContentCopyIcon
                    sx={{ fontSize: 15 }}
                    onClick={() => handleCopy(item.value, item._id)}
                    className="mr-2 cursor-pointer text-xs font-extralight"
                  />
                )}
                <EditIcon
                  onClick={() => {
                    setEditPopUp(true);
                    setKeyValueToEdit(item);
                    setError(false);
                  }}
                  sx={{ fontSize: 20 }}
                  className=" cursor-pointer text-xs font-extralight mr-2 text-orange-400"
                />
                <DeleteForeverIcon
                  onClick={() => {
                    setDeletePopUp(true);
                    setKeyValueToDelete(item);
                    setError(false);
                  }}
                  sx={{ fontSize: 20 }}
                  className=" cursor-pointer text-xs font-extralight text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound addKeyValuePopUp={addKeyValuePopUp} setAddKeyValuePopUp={setAddKeyValuePopUp}/>
      )}

      <DeletePopUp
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        setKeyValue={setKeyValue}
        keyValueToDelete={keyValueToDelete}
        setKeyValueToDelete={setKeyValueToDelete}        
        userCredentials={userCredentials}
        error={error}
        setError={setError}
      />
      <EditPopUp
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        setKeyValue={setKeyValue}
        keyValueToEdit={keyValueToEdit}
        setKeyValueToEdit={setKeyValueToEdit}        
        userCredentials={userCredentials}
        error={error}
        setError={setError}
      />
      <AddKeyValuePopUp
        addKeyValuePopUp={addKeyValuePopUp}
        setAddKeyValuePopUp={setAddKeyValuePopUp}
        setKeyValue={setKeyValue}
        userCredentials={userCredentials}
        error={error}
        setError={setError}
      />

      {/* add button */}
      <div
        className={`fixed bottom-6 right-6 z-50  ${
          editPopUp || deletePopUp || addKeyValuePopUp ? "blur-sm" : ""
        } `}
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="absolute w-12 h-12 rounded-full bg-slate-700 animate-ping opacity-75"></span>
        </div>
        <button
          onClick={() => {setAddKeyValuePopUp(true); setError(false);}}
          className="relative w-14 h-14 rounded-full bg-slate-700 text-white text-xl font-bold shadow-lg hover:bg-slate-600 transition duration-300 flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      </div>
    </>
  );
};

export default KeyValue;
