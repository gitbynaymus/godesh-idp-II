import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "../../components/shared/Logo";
import useRole from "../../hooks/useRole";
import Loading from "../../components/shared/Loading";
import { useUser } from "../../hooks/useUser";
import PageTransitionWrapper from "../../Animation/PageTransitionWrapper";

const getNavLinkClass = ({ isActive }) =>
  `block w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
    isActive
      ? "bg-accent text-white"
      : "text-gray-700 hover:bg-accent hover:text-white"
  }`;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, loading] = useRole();
  const { data: user, isLoading } = useUser();

  const roleItems = {
    admin: [
      { name: "Manage Profile", path: "/dashboard/manage-admin-profile" },
      { name: "Manage Users", path: "/dashboard/manage-users" },
      { name: "Manage Candidates", path: "/dashboard/manage-candidates" },
      { name: "Add Packages", path: "/dashboard/add-packages" },
    ],
    guide: [
      { name: "My Assigned Tours", path: "/dashboard/my-assign-tour" },
      { name: "Manage Profile", path: "/dashboard/guide-profile" },
      { name: "Add Story", path: "/dashboard/add-story" },
      { name: "Manage Stories", path: "/dashboard/manage-stories" },
    ],
    tourist: [
      { name: "My Bookings", path: "/dashboard/my-bookings" },
      { name: "Manage Profile", path: "/dashboard/manage-tourist-profile" },
      { name: "Add Story", path: "/dashboard/add-story" },
      { name: "Manage Stories", path: "/dashboard/manage-stories" },
      { name: "Join As a Guide", path: "/dashboard/join-as-guide" },
    ],
  };
  if (loading || isLoading) return <Loading />;
  const navItems = roleItems[role] || [];

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-100">
      {/* ====== Mobile Sidebar ====== */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="flex w-64 flex-col space-y-4 bg-green-50 p-4 dark:bg-gray-50">
                <div className="flex items-center justify-between">
                  <Logo />
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map(({ name, path }) => (
                      <li key={path}>
                        <NavLink
                          to={path}
                          className={getNavLinkClass}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ====== Sidebar (Desktop) ====== */}
      <aside className="hidden w-64 flex-col bg-green-100 p-4 shadow-md md:flex">
        <div>
          <div className="pb-5">
            <Logo />
          </div>
          <div className="mb-5 border-t border-accent"></div>
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map(({ name, path }) => (
                <li key={path}>
                  <NavLink to={path} className={getNavLinkClass}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto flex items-center gap-3 rounded-md bg-green-200 p-3">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="User"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-accent ring-offset-2"
          />
          <div>
            <h2 className="max-w-[150px] truncate text-sm font-semibold">
              {user?.name}
            </h2>
            <p className="max-w-[150px] truncate text-xs">{user?.email}</p>
          </div>
        </div>
      </aside>

      {/* ====== Main Content ====== */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar (Mobile) */}
        <header className="flex items-center justify-between border-b border-accent/30 p-4 md:hidden">
          <Logo />
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="min-h-screen flex-1 overflow-y-auto p-4">
          <PageTransitionWrapper>
            <Outlet />
          </PageTransitionWrapper>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
