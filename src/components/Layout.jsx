import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#060606' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
