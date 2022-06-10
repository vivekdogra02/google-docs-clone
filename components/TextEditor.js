import dynamic from "next/dynamic";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { convertToRaw } from "draft-js";
import {
  updateDoc,
  doc,
  onSnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { convertFromRaw } from "draft-js";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const [value, loading, error] = useDocumentOnce(
    doc(db, 'userDocs', id)
  );


  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState);
    const docsRef = doc(db, "userDocs", id);
    await updateDoc(docsRef, {
      editorState: convertToRaw(editorState.getCurrentContent()),
    });
  };

 

  useEffect(() => {
    if(value?.data()?.editorState) {
        debugger;
        setEditorState(EditorState.createWithContent(convertFromRaw(value?.data()?.editorState)));
    }
  }, [value]);
  return (
    <div className=" bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
        onEditorStateChange={onEditorStateChange}
      />
      ;
    </div>
  );
}

export default TextEditor;
