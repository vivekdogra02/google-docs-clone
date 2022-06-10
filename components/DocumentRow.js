import { DocumentTextIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100  text-gray-700 text-sm cursor-pointer"
    >
      <DocumentTextIcon className="h-5 w-5 ml-2 text-blue-700" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      <DotsVerticalIcon className="h-5 w-5 ml-2 text-gray-700" />
    </div>
  );
}

export default DocumentRow;
