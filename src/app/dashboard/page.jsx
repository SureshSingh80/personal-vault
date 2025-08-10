"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useUser, SignIn } from "@clerk/nextjs";
import axios from "axios";
import { set } from "mongoose";
import Navbar from "@/components/Navbar";
import "../globals.css";
import KeyValue from "@/components/KeyValue";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";


const page = () => {

  const { user, isLoaded } = useUser();
  const [userCredentials, setUserCredentials] = useState({});
  const [keyValue, setKeyValue] = useState([]);
  const [activeKeyValue, setActiveKeyValue] = useState(false);
  const [activePdf, setActivePdf] = useState(false);
  const [activeImage, setActiveImage] = useState(false);

  // fetching credentials
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        // saved credentials in database
        const res = await axios.post("/api/authenticate", {
          clerkId: user.id,
          username: user.fullName,
          email: user.emailAddresses[0].emailAddress,
        });
        // console.log("res= ",res);
        // storing user credentials
        let User = {
          _id: res.data.user._id,
          clerkId: res.data.user.clerkId,
          username: res.data.user.username,
          email: res.data.user.email,
          createdAt: res.data.user.createdAt,
        };
        setUserCredentials(User);
      } catch (error) {
        console.log("Error in fetching credentials: ", error);
      }
    };
    user && fetchCredentials();
  }, [user]);

  // fetch userData
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
  }, [userCredentials]);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-50  text-black">
      {/* Navbar */}
      <Navbar
        setActiveKeyValue={setActiveKeyValue}
        setActiveImage={setActiveImage}
        setActivePdf={setActivePdf}
      />
      {userCredentials._id ? (
        <>
          {activeKeyValue ? (
            <KeyValue
              keyValue={keyValue}
              setKeyValue={setKeyValue}
              userCredentials={userCredentials}
            />
          ) : activeImage ? (
           <div>
               <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-center px-4"
            >
              <div className="bg-white p-8 rounded-xl shadow-xl max-w-md">
                <div className="text-5xl mb-4">🖼️</div>{" "}
                {/* Change to 📄 for PDF */}
                <h2 className="text-3xl font-bold text-indigo-600">
                  Coming Soon!
                </h2>
                <p className="text-gray-600 mt-2">
                  The <strong>Image Upload</strong> feature is on its way.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Stay tuned! We’re working hard to bring this feature to life.
                  🚧
                </p>
              </div>
            </motion.div>
           </div>
          ) : activePdf ? (
            <div>
               <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-center px-4"
            >
              <div className="bg-white p-8 rounded-xl shadow-xl max-w-md">
                <div className="text-5xl mb-4">📄</div>{" "}
                {/* Change to 📄 for PDF */}
                <h2 className="text-3xl font-bold text-indigo-600">
                  Coming Soon!
                </h2>
                <p className="text-gray-600 mt-2">
                  The <strong>PDF Upload</strong> feature is on its way.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Stay tuned! We’re working hard to bring this feature to life.
                  🚧
                </p>
              </div>
            </motion.div>
           </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
              >
                <h2 className="text-3xl font-bold text-indigo-600">
                  🚀 Ready to Launch
                </h2>
                <p className="text-gray-700 mt-2">
                  Use the navbar to explore your <strong>Keys</strong>,{" "}
                  <strong>Images</strong>, or <strong>PDFs</strong>.
                </p>
              </motion.div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default page;
