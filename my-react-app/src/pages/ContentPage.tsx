import Layout from '@/components/layout/Layout';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

interface ContentPageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, subtitle, children }) => {
    return (
        <Layout>
            <div className="bg-primary text-white py-20">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h1>
                    {subtitle && <p className="text-lg text-primary-light max-w-2xl">{subtitle}</p>}
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="prose prose-lg max-w-none text-gray-600">
                        {children}
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default ContentPage;
