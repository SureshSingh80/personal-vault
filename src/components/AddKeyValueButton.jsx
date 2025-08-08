import React from 'react'


const AddKeyValueButton = ({userCredentials}) => {
  return (
  <div className="fixed bottom-6 right-6">
    <button className="w-14 h-14 rounded-full bg-slate-700 text-white text-xl font-bold shadow-lg hover:bg-slate-600 transition duration-300 flex items-center justify-center">
       <Plus size={24} />
    </button>
  </div>
);


}

export default AddKeyValueButton