export default function NoDataFound({addKeyValuePopUp,setAddKeyValuePopUp}) {
  return (
    <div className={`flex justify-center items-center w-full h-screen ${addKeyValuePopUp ? "blur-sm" : ""}`}>
        <div className="flex flex-col items-center justify-center  text-center py-10 px-4 bg-slate-100 rounded-2xl shadow-md">
      <div className="mb-4 animate-bounce text-slate-500">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-slate-700 mb-2">No Data Found</h2>
      <p className="text-sm text-slate-500 mb-4">
        You haven't added any data yet. Click the <span className="font-semibold text-slate-700">"Add +"</span> button to get started.
      </p>
      <button onClick={()=>setAddKeyValuePopUp(true)} className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
        Add +
      </button>
    </div>
    </div>
    
  );
}
