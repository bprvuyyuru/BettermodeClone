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
            <th className="text-left p-5 font-bold text-white rounded-tl-3xl w-[600px]">
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
              <td className="p-6 text-black font-bold">
                {post.owner.member.name}
              </td>
              <td className="p-6 text-gray-800">{post.space.name}</td>
              <td className="p-6 text-gray-800">
                {new Date(post.publishedAt).toLocaleDateString()}
              </td>
              <td className="p-6 text-gray-800">
                {post.reactions.length > 0 ? (
                  <div className="flex flex-col">
                    {post.reactions.map((r, idx) => (
                      <span key={idx} className="text-sm">
                        {r.reaction} ({r.count})
                      </span>
                    ))}
                  </div>
                ) : (
                  "No reactions"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Bar */}
      <div className="flex justify-end items-center mt-8">
        {/* <span className="text-gray-600 text-sm">Rows per page: {limit}</span> */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-1 border rounded-3xl text-white bg-[#36454F] hover:bg-gray-800 ${
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
            className={`px-4 py-1 border rounded-3xl text-white bg-[#36454F] hover:bg-gray-800 ${
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
