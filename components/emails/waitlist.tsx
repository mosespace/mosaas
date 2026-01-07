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

export default function WaitlistEmail({
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
        You&apos;re on the waitlist — thanks for joining {siteConfig.name}!
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hi {name},</Text>

          <Text style={paragraph}>
            Thanks for joining the {siteConfig.name} waitlist! 🎉 We’re excited
            to have you onboard.
          </Text>

          <Text style={paragraph}>
            You’ll be among the very first to know when we release new features,
            open early access, and share important updates.
          </Text>

          <Text style={paragraph}>
            We’re building something designed to make learning smarter, faster,
            and more interactive — and we’re glad you’re part of the journey.
          </Text>

          <Text style={paragraph}>
            Meanwhile, if you ever have ideas or questions, feel free to reply
            to this email. We&apos;d love to hear from you.
          </Text>

          <Text style={team}>— The {siteConfig.name} Team 🚀</Text>

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button style={button} href={siteConfig.domain}>
              Visit Website
            </Button>
          </Section>

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
  borderTop: '1px solid #eaeaea',
  paddingTop: '16px',
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
