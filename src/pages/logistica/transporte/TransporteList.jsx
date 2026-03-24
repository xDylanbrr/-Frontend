const TransporteList = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Historial de Transportes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-semibold">ID</th>
                            <th scope="col" className="px-6 py-3 font-semibold">Empresa</th>
                            <th scope="col" className="px-6 py-3 font-semibold">Chofer</th>
                            <th scope="col" className="px-6 py-3 font-semibold">Placa</th>
                            <th scope="col" className="px-6 py-3 font-semibold">Fecha de Salida</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                    No hay transportes registrados aún.
                                </td>
                            </tr>
                        ) : (
                            data.map((transporte) => (
                                <tr key={transporte.id_transporte} className="hover:bg-blue-50 transition duration-150">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{transporte.id_transporte}</td>
                                    <td className="px-6 py-4">{transporte.empresa}</td>
                                    <td className="px-6 py-4">{transporte.chofer}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded font-mono text-xs">
                                            {transporte.placa}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(transporte.fecha_salida).toLocaleString('es-DO')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransporteList;