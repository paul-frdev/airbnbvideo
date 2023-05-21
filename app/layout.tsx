import { Modal } from './components/modals/Modal';
import { RegisterModal } from './components/modals/RegisterModal';
import { Navbar } from './components/navMenu/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import { ToastProvider } from './providers/ToastProvider';
import { LoginModal } from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import { RentModal } from './components/modals/RentModal';
import { SearchModal } from './components/modals/SearchModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb close',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <main className='pb-20 pt-28'>{children}</main>
      </body>
    </html>
  );
}
