import { MessageSquare } from 'lucide-react';

interface StickyEnquiryButtonProps {
  onClick: () => void;
}

export function StickyEnquiryButton({ onClick }: StickyEnquiryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-40 flex items-center gap-2 hover:scale-110"
      aria-label="Open enquiry form"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="text-xs font-semibold">Enquiry</span>
    </button>
  );
}
