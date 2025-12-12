import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { StickyEnquiryButton } from './components/StickyEnquiryButton';
import { EnquiryModal } from './components/Contact';

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <RouterProvider router={router} />
      <StickyEnquiryButton onClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
}
