import Dashboard from "./admin/dashboard/page";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Welcome to Chicha Mobile</h1>
      <Dashboard />
    </main>
  );
}
