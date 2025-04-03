import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideMenu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppNavbar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Header />
            <main className="py-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
