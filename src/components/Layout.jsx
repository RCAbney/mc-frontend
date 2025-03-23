import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Login from "./Login";
import ErrorBoundary from "./ErrorBoundary";

export default function Layout() {
  return (
    <>
      <header className="flex justify-between items-center p-4">
        <Navbar />
        <Login />
      </header>
      
      <main className="h-[calc(100vh-theme(spacing.16))]">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
}