import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Info } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import TourCard from '@/components/tours/TourCard';
import api from '@/lib/api';

const DestinationDetail = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDestination = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await api.destinations.getById(id);
                setDestination(response.data);
            } catch (err) {
                console.error("Error fetching destination:", err);
                setError("Failed to load destination details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="h-[50vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !destination) {
        return (
            <Layout>
                <Container className="py-20 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600">{error || "Destination not found"}</p>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url("${destination.heroImage?.url || destination.cardImage?.url || 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80'}")` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <Container className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">{destination.name}</h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide">{destination.tagline || "Experience the magic"}</p>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Info */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif font-bold mb-6">Overview</h2>
                            <div className="text-gray-600 leading-relaxed mb-8 text-lg prose max-w-none">
                                {destination.description}
                            </div>

                            {destination.highlights && destination.highlights.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-bold mb-4">Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                        {destination.highlights.map((highlight: string, index: number) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {destination.tours && destination.tours.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-bold mb-6">Popular Tours in {destination.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {destination.tours.map((tour: any) => (
                                            <TourCard
                                                key={tour._id}
                                                id={tour._id}
                                                title={tour.title}
                                                image={tour.images?.[0]?.url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                                duration={tour.duration}
                                                groupSize={tour.groupSize || 'Contact us'}
                                                price={tour.price}
                                                rating={tour.rating || 0}
                                                reviews={tour.reviews || 0}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                                <h3 className="text-xl font-serif font-bold mb-6">Practical Info</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <Calendar className="text-primary shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-sm">Best Time to Visit</h4>
                                            <p className="text-sm text-gray-600">{destination.bestTime || "Year Round"}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Info className="text-primary shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-sm">Visa Info</h4>
                                            <p className="text-sm text-gray-600">{destination.visaInfo || "Check with your embassy"}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 flex items-center justify-center font-bold text-primary text-xs">KSH</div>
                                        <div>
                                            <h4 className="font-bold text-sm">Currency</h4>
                                            <p className="text-sm text-gray-600">{destination.currency || "USD Accepted"}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 flex items-center justify-center font-bold text-primary">Aa</div>
                                        <div>
                                            <h4 className="font-bold text-sm">Language</h4>
                                            <p className="text-sm text-gray-600">{destination.language || "English"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default DestinationDetail;
