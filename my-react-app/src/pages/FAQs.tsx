import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

const FAQs = () => {
    const faqs = [
        {
            question: "What is the best time to go on a safari?",
            answer: "The best time depends on what you want to see. Generally, the dry season (June to October) is best for game viewing as animals gather around water sources. The Great Migration in Masai Mara usually happens from July to October."
        },
        {
            question: "Do I need a visa for Kenya/Tanzania?",
            answer: "Yes, most visitors require a visa. Kenya has an e-visa system that should be applied for in advance. Tanzania also offers e-visas and visas on arrival. We recommend checking the latest requirements for your specific nationality."
        },
        {
            question: "Is it safe to travel on safari?",
            answer: "Yes, safaris are generally very safe. You will be with experienced guides at all times. We only use trusted lodges and camps. However, it is important to follow your guide's instructions, especially when near wild animals."
        },
        {
            question: "What should I pack?",
            answer: "Pack light, breathable clothing in neutral colors (khaki, beige, green). Bring a warm jacket for early morning game drives, comfortable walking shoes, a hat, sunglasses, sunscreen, and insect repellent. Don't forget your camera and binoculars!"
        },
        {
            question: "Are vaccinations required?",
            answer: "Yellow Fever vaccination is often required for entry into Tanzania and sometimes Kenya. Malaria prophylaxis is highly recommended. Please consult your travel doctor for the most up-to-date medical advice."
        },
        {
            question: "Can children go on safari?",
            answer: "Absolutely! Many lodges are family-friendly and offer special activities for kids. However, some camps have age restrictions (usually 6+ or 12+). We can tailor an itinerary specifically for families."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Layout>
            <div className="bg-primary text-white py-20">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-primary-light max-w-2xl">
                        Everything you need to know before your African adventure.
                    </p>
                </Container>
            </div>

            <Section>
                <Container className="max-w-3xl">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                                    {openIndex === index ? (
                                        <Minus className="text-primary shrink-0" />
                                    ) : (
                                        <Plus className="text-primary shrink-0" />
                                    )}
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-6 pt-0 bg-white text-gray-600 leading-relaxed border-t border-transparent">
                                        {faq.answer}
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

export default FAQs;
