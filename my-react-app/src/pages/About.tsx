import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Shield, Users, Heart, Award } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Shield size={32} className="text-primary" />,
            title: "Safety First",
            description: "Your safety is our top priority. We use well-maintained vehicles and experienced guides."
        },
        {
            icon: <Users size={32} className="text-primary" />,
            title: "Expert Guides",
            description: "Our guides are passionate, knowledgeable, and dedicated to making your safari unforgettable."
        },
        {
            icon: <Heart size={32} className="text-primary" />,
            title: "Sustainable Tourism",
            description: "We are committed to conservation and supporting local communities."
        },
        {
            icon: <Award size={32} className="text-primary" />,
            title: "Excellence",
            description: "We strive for excellence in every aspect of your journey, from planning to execution."
        }
    ];

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80")' }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <Container className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Story</h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide">Passionate about Africa. Dedicated to You.</p>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-serif font-bold mb-6">Who We Are</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Lindberg Safaris was born out of a deep love for the African wilderness.
                                Founded by a team of experienced safari enthusiasts, our mission is to share the magic of East Africa with the world.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With over 25 years of combined experience, we specialize in crafting bespoke safari itineraries that cater to your unique interests and preferences.
                                Whether you dream of witnessing the Great Migration, tracking gorillas in the mist, or relaxing on pristine beaches, we are here to make it happen.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Safari Landscape"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">Why Choose Us</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We go above and beyond to ensure your safari is everything you dreamed of and more.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-md transition-all">
                                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default About;
