const AltQuery = ({ altData }) => {
    if (!altData) {
      return null;
    }
  
    return (
      <div className="overflow-x-auto mx-auto lg:w-[80%] md:w-full md:mt-[1rem] text-center h-[400px] overflow-auto">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-blue text-white">
            <tr>
              <th className="px-4 py-2">Alt</th>
              <th className="px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {altData.map((altItem, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{altItem.altText || altItem.alt}</td>
                <td className="px-4 py-2">{altItem.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AltQuery;
  