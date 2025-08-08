"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useUser,useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const {signOut} = useClerk();
  const router = useRouter();

  

  return (
    <>
      {
        isLoaded ? (
           <div style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/checklist-business-performance-monitoring-concept-600nw-2503514245.jpg')", }} className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
    
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-black">
       
        <div className="mb-12">
          <p className="font-bold text-2xl">Welcome to Secret Docs</p>
          {/* lock icon */}
           
        </div>

        <div>
          <p className="mx-4 text-center">Store and organize API tokens, SSH keys, secrets, and project documents securely — just for you.</p>
        </div>

        {!isSignedIn ? (
          <div className="w-full">
            <div>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded mt-4 w-full">
                  Login
                </button>
                 
              </SignInButton>
            </div>
            <div>
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="bg-[#6c47ff] hover:bg-[#5c34fc] cursor-pointer text-white font-bold py-2 px-4 rounded mt-2 w-full">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <button onClick={()=>router.push("/dashboard")} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out w-full cursor-pointer">Go To Dashboard</button>
             <button onClick={()=>signOut()} className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded mt-2 w-full cursor-pointer">Sign Out</button>
          </div>
        )}

        {/* login and signUp button */}
      </div>
    </div>
        ):
        (
        <div className='flex justify-center items-center min-h-screen w-full bg-white'>
           <Loader/>
        </div>
        
        )
      }
     
    </>
    
  );
}
