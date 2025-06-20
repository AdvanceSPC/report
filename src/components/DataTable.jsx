
const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full text-sm bg-white border">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="px-4 py-2 text-left">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-2">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
