import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DestinationCardProps {
    id: string;
    name: string;
    image: string;
    tourCount: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ id, name, image, tourCount }) => {
    return (
        <Link to={`/destinations/${id}`} className="group relative rounded-xl overflow-hidden aspect-[3/4] block">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-xs font-medium uppercase tracking-wider mb-1 block opacity-80">
                    {tourCount} Tours
                </span>
                <h3 className="text-2xl font-serif font-bold mb-2">{name}</h3>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
};

export default DestinationCard;
