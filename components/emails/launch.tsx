import { siteConfig } from '@/lib/constants';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export default function LaunchEmail({
  name = 'Friend',
  email = 'example@example.com',
}: {
  name?: string | null;
  email?: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        {siteConfig.name} is now live — you&apos;re invited in! 🚀
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hey {name},</Text>

          <Text style={paragraph}>
            The wait is over —{' '}
            <strong>{siteConfig.name} is officially live!</strong> 🎉 Thanks for
            being part of our early waitlist. Your early belief in the product
            means a lot.
          </Text>

          <Text style={paragraph}>
            You now have full access to the platform, along with all the
            features we’ve been quietly building behind the scenes.
          </Text>

          <Text style={paragraph}>
            Here&apos;s what you can explore starting today:
            <br />• Smarter AI-powered learning tools
            <br />• Faster, more intuitive study flows
            <br />• Personalized learning insights
            <br />• And tons more — with even bigger updates coming soon
          </Text>

          <Text style={paragraph}>
            We&apos;re just getting started, and we’re excited to have you with
            us from day one.
          </Text>

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button style={button} href={siteConfig.domain}>
              Get Started →
            </Button>
          </Section>

          <Text style={team}>— The {siteConfig.name} Team 🚀</Text>

          <Section style={footerSection}>
            <Text style={footerText}>
              This email was sent to{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>{' '}
              because you joined the {siteConfig.name} waitlist.
            </Text>

            <Text style={footerText}>
              © {new Date().getFullYear()} {siteConfig.name},{' '}
              {siteConfig.address}
            </Text>

            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Link href={siteConfig.twitterUrl} style={socialIcon}>
                ✖
              </Link>{' '}
              <Link href={siteConfig.websiteUrl} style={socialIcon}>
                🌐
              </Link>{' '}
              <Link href={siteConfig.LinkedinUrl} style={socialIcon}>
                📘
              </Link>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// --- Styles ---
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  color: '#1a1a1a',
  padding: '40px 0',
};

const container = {
  margin: '0 auto',
  padding: '24px',
  maxWidth: '480px',
  border: '1px solid #eaeaea',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const greeting = {
  fontSize: '16px',
  fontWeight: 500,
  marginBottom: '16px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: '16px',
};

const team = {
  fontSize: '14px',
  marginTop: '24px',
  marginBottom: '16px',
};

const button = {
  backgroundColor: '#279591',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  padding: '10px 20px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
};

const footerSection = {
  marginTop: '32px',
  paddingTop: '16px',
  borderTop: '1px solid #eaeaea',
};

const footerText = {
  fontSize: '12px',
  color: '#666',
  lineHeight: '18px',
  marginBottom: '8px',
  textAlign: 'center' as const,
};

const link = {
  color: '#279591',
  textDecoration: 'none',
};

const socialIcon = {
  margin: '0 4px',
  color: '#999',
  textDecoration: 'none',
  fontSize: '16px',
};
