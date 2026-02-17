import DepartamentoForm from "./DepartamentoForm";
import DepartamentoList from "./DepartamentoList";

function DepartamentosPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Administración - Departamentos</h1>

      <DepartamentoForm />
      <hr />
      <DepartamentoList />
    </div>
  );
}

export default DepartamentosPage;