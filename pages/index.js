import { DotsVerticalIcon, FolderOpenIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import nextId from "react-id-generator";

import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  where,
} from "firebase/firestore";

import { db } from "../firebase";
import DocumentRow from "../components/DocumentRow";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const { data: session } = useSession();
  const [document, setDocument] = useState([]);
 document.map(x => x.data())
  useEffect(() => {
    if (session) {
      const q =  query(collection(db, "userDocs"), where("email", "==", session?.user?.email));
      return onSnapshot(
        query(
          q,
          orderBy("timestamp", "desc"),
        ),
        (snapshot) => {
          setDocument(snapshot?.docs);
        }
      );
    }
  }, [db]);

  const createDocument = async () => {
    const docName = nextId("test-id-"); // id: test-id-2
    const docRef = await addDoc(collection(db, "userDocs"), {
      filename: docName,
      email: session?.user?.email,
      timestamp: serverTimestamp(),
    });
    toast.success("Document created successfully!!!");
  };
  if (!session) return <Login />;

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <meta name="description" content="Generated by Google Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <Header />
      <section className="bg-[#F8F9FA] pb-10 px-10 ">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between py-6 items-center">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <DotsVerticalIcon className="h-5 w-5 cursor-pointer border-0" />
          </div>
          <div className="">
            <div
              onClick={createDocument}
              className="relative  h-52 w-40 border-2 cursor-pointer hover:border-blue-500 shadow-md"
            >
              <Image
                src="https://links.papareact.com/pju"
                className=""
                layout="fill"
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <FolderOpenIcon className="h-5 w-5 cursor-pointer border-0" />
          </div>
          {document?.length > 0 &&
            document?.map((row) => (
              <DocumentRow
                key={row?.id}
                id={row?.id}
                fileName={row.data().filename}
                date={row.data().timestamp}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
