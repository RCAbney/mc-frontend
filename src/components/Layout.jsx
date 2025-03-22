import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Login from "./Login";
import ErrorBoundary from "./ErrorBoundary";

export default function Layout() {
  return (
    <div className="layout">
      <header className="flex justify-between items-center p-4">
        <Navbar />
        <Login />
      </header>
      
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer>
        {/* Add your footer here later */}
      </footer>
    </div>
  );
}