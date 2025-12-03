import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            location: "United Kingdom",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "An absolute dream come true. The guides were incredibly knowledgeable and the lodges were breathtaking. Highly recommended! We saw the Big Five on our second day.",
            rating: 5
        },
        {
            name: "Michael Thompson",
            location: "USA",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "Everything was perfectly organized. From the airport pickup to the game drives, we didn't have to worry about a thing. Lindberg Safaris truly went above and beyond.",
            rating: 5
        },
        {
            name: "David Ross",
            location: "Australia",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "The best family vacation we've ever had. The kids loved seeing the elephants and lions up close. The guide was great with the children and made it educational too.",
            rating: 5
        },
        {
            name: "Emma Wilson",
            location: "Canada",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "A magical experience. The hot air balloon ride over the Masai Mara was the highlight of our trip. Thank you for organizing such a wonderful itinerary.",
            rating: 5
        },
        {
            name: "James Chen",
            location: "Singapore",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "Professional, reliable, and friendly. The accommodation choices were excellent and the food was delicious. I will definitely book with them again.",
            rating: 4
        },
        {
            name: "Sophie Martin",
            location: "France",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            text: "We had a fantastic time in Tanzania. The Serengeti is unbelievable. Our driver guide was very experienced and spotted animals we would have missed.",
            rating: 5
        }
    ];

    return (
        <Layout>
            <div className="bg-primary text-white py-20">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Guest Reviews</h1>
                    <p className="text-lg text-primary-light max-w-2xl">
                        Read what our travelers have to say about their Lindberg Safaris experience.
                    </p>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
                                <Quote className="text-primary/20 mb-4 h-10 w-10" />
                                <p className="text-gray-600 mb-6 italic flex-grow">"{item.text}"</p>

                                <div className="flex items-center gap-1 text-accent mb-4">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" stroke="none" />
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                                        <span className="text-xs text-gray-500">{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default Testimonials;
