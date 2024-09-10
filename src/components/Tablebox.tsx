import { TableboxProps } from "../types";

const Tablebox = ({
  posts,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onRowClick,
}: TableboxProps) => {
  return (
    <div className="p-2">
      <table className="w-full bg-white rounded-3xl table-fixed">
        <thead className="bg-[#36454F]">
          <tr>
            <th className="text-left p-5 font-bold text-white rounded-tl-3xl w-[35vw]">
              Title
            </th>
            <th className="text-left p-5 font-bold text-white">Owner</th>
            <th className="text-left p-5 font-bold text-white">Space</th>
            <th className="text-left p-5 font-bold text-white">Published At</th>
            <th className="text-left p-5 font-bold text-white rounded-tr-3xl">
              Reactions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="odd:bg-gray-100 cursor-pointer hover:bg-gray-200"
              onClick={() => onRowClick(post.id)}
            >
              <td className="p-6 text-[#36454F]">
                <p className="font-semibold truncate">{post.title}</p>
              </td>
              <td className="p-6 text-[#36454F] font-normal flex items-center gap-1">
                <div className="bg-[#65C61A] rounded-full h-5 w-5 flex items-center justify-center">
                  <span className="text-xs text-white font-normal pb-1">
                    {post.owner.member.name[0]}
                  </span>
                </div>
                {post.owner.member.name}
              </td>
              <td className="p-6 text-gray-800">{post.space.name}</td>
              <td className="p-6 text-gray-800">
                {new Date(post.publishedAt).toLocaleDateString()}
              </td>
              <td className="p-6 text-gray-800">
                {post.reactions.length > 0 ? (
                  <div className="flex flex-col">{post.reactions.length}</div>
                ) : (
                  "0"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center h-12 w-12 bg-gray-100 hover:bg-gray-600 rounded-full cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &lt;
          </button>
          <span className="text-black text-sm">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center h-12 w-12 bg-gray-100 hover:bg-gray-600 rounded-full cursor-pointer ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tablebox;
