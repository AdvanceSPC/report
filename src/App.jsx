import axios from 'axios';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from './components/DataTable';

function App() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/interacciones', {
      params: { from, to }
    });
    setData(res.data);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "interacciones.xlsx");
  };

  return (

    
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Interacciones</h1>
      
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label>Desde:</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded ml-2"/>
        </div>
        <div>
          <label>Hasta:</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded ml-2"/>
        </div>
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Filtrar
        </button>
        <button onClick={exportExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Exportar a Excel
        </button>
      </div>

      <DataTable data={data} />
    </div>
  );
}

export default App;
