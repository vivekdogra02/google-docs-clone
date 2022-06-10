import { db } from "../../firebase";
import { signOut, useSession, getSession } from "next-auth/react";
import Login from "../../components/Login";
import { DocumentTextIcon, ShareIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import TextEditor from "../../components/TextEditor";

function Doc() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [docData, setDocData] = useState(null);
  const getResponse = async () => {
    if (id) {
      const docRef = doc(db, "userDocs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        setDocData(null);
        router.replace("/");
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getResponse();
  }, [db, id]);

  if (!session) return <Login />;

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1 bg-">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <DocumentTextIcon className="h-5 w-5 ml-2 text-blue-700" />
        </span>
        {docData && (
          <>
            <div className="flex-grow px-2">
              <h2 className="">{docData?.filename}</h2>
              <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                <p className="options hover:bg-gray-100">File</p>
                <p className="options hover:bg-gray-100">Edit</p>
                <p className="options hover:bg-gray-100">View</p>
                <p className="options hover:bg-gray-100">Insert</p>
                <p className="options hover:bg-gray-100">Format</p>
                <p className="options hover:bg-gray-100">Tools</p>
              </div>
            </div>
            <button className="hidden md:inline-flex rounded-full px-4 py-2 bg-blue-400 space-x-4">
              <ShareIcon className="h-5 w-5 mr-2" /> Share
            </button>
            <img
              src={session?.user?.image}
              className="h-10 w-10 ml-2 cursor-pointer rounded-full"
              alt=""
              onClick={signOut}
            />
          </>
        )}
      </header>

      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    };
  }
