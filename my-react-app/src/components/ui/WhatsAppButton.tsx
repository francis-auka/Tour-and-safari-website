import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const WhatsAppButton = () => {
    const handleClick = () => {
        const link = getWhatsAppLink("Hello! I would like to inquire about your safari packages.");
        window.open(link, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="text-white" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 font-bold">
                Chat with us
            </span>
        </button>
    );
};

export default WhatsAppButton;
