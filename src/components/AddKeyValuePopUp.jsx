import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';

const AddKeyValuePopUp = ({addKeyValuePopUp, setAddKeyValuePopUp,setKeyValue, userCredentials, error,setError}) => {

    const [key,setKey] = useState('');
    const [value,setValue] = useState('');

    const [loading,setLoading] = useState(false);

    const handleAddKeyValue = async () => {
      if(!key || !value) {
        setError("Please enter key and value");
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const res = await axios.post('/api/addkeyvalue', { key, value, userCredentials });
        console.log(res);
        setAddKeyValuePopUp(false);
        setLoading(false);
        setKey('');
        setValue('');
        // window.location.reload();
      } catch (error) {
        
        console.log(error);
        setLoading(false);
        setError(error.message);
        
      }
    }

  // fetch data after each addition
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
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500  ${
          addKeyValuePopUp
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}> 

        {/* creating a form */}
        <div
          className={`max-w-lg  bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative `}
        >
          <CloseIcon
            onClick={() => setAddKeyValuePopUp(false)}
            sx={{ fontSize: 25 }}
            className="mr-2 text-slate-700 cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Add </h1>
          <p className="text-gray-600 mb-6 text-center">
            Please Add Key and Value
          </p>
          <input type='text' placeholder='Enter Key'   className='w-full p-2 border border-gray-300 rounded-md mb-4' value={key} onChange={(e) => setKey(e.target.value)}/>
          <input type='text' placeholder='Enter Value'  className='w-full p-2 border border-gray-300 rounded-md mb-4' value={value} onChange={(e)=> setValue(e.target.value)}/>
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
          <button onClick={handleAddKeyValue} className="bg-slate-700 text-white py-2 px-4 rounded-md mr-2 cursor-pointer w-full">{loading ? <p>please wait...</p>:<p>Add and Save</p>}</button>
        </div> 
    </div>
  )
}

export default AddKeyValuePopUp