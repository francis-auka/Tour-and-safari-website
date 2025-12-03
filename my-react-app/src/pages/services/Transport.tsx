import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const Transport = () => {
    const features = [
        "Modern fleet of 4x4 Land Cruisers",
        "Professional, experienced drivers",
        "Airport transfers (JKIA & Wilson)",
        "Private hire for safaris",
        "Corporate transport solutions"
    ];

    return (
        <Layout>
            <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533658280853-e4a10c25a30d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80")' }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Transport Services</h1>
                    <p className="text-xl font-light tracking-wide">Reliable. Comfortable. Safe.</p>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-serif font-bold mb-6">Travel in Comfort & Style</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                At Lindberg Safaris, we understand that the journey is just as important as the destination.
                                That's why we maintain a fleet of modern, well-maintained vehicles designed for the rugged African terrain
                                without compromising on comfort.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <div className="bg-primary/10 p-1 rounded-full text-primary">
                                            <Check size={16} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg">Request a Quote</Button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Safari Vehicle"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default Transport;
