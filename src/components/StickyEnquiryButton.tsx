import { MessageSquare } from 'lucide-react';

interface StickyEnquiryButtonProps {
  onClick: () => void;
}

export function StickyEnquiryButton({ onClick }: StickyEnquiryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed left-6 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-40 flex items-center gap-2 md:flex-col md:gap-1 hover:scale-110"
      aria-label="Open enquiry form"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="text-xs font-semibold md:text-center">Enquiry</span>
    </button>
  );
}
