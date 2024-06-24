import AdminPanel from "./components/admin-panel";

export const revalidate = 60;

async function AdminPage() {
  return (
    <AdminPanel />
  )
}

export default AdminPage