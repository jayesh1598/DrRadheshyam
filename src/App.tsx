import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { StickyEnquiryButton } from './components/StickyEnquiryButton';
import { EnquiryModal } from './components/Contact';
import { loadAndSetFavicon } from './utils/favicon';

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    loadAndSetFavicon();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <StickyEnquiryButton onClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
}
