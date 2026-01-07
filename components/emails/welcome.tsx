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

export default function WelcomeEmail({
  name = 'John Doe',
  email = 'welcome@example.com',
}: {
  name?: string | null;
  email?: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {siteConfig.name} — let’s get started!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hi {name},</Text>

          <Text style={paragraph}>
            We&apos;re glad to have you onboard! You&apos;re already on your way
            to creating and interacting with our professional system.
          </Text>

          <Text style={paragraph}>
            Whether you&apos;re here for your studies, for a cause, or just for
            fun—welcome! If there&apos;s anything you need, we&apos;ll be here
            every step of the way.
          </Text>

          <Text style={paragraph}>Thanks,</Text>
          <Text style={team}>The Team</Text>

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button style={button} href={`${siteConfig.domain}/auth/login`}>
              Log in
            </Button>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              This email was sent to{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
              . If you&apos;d rather not receive this kind of email, you can{' '}
              <Link href="#" style={link}>
                unsubscribe
              </Link>{' '}
              or{' '}
              <Link href="#" style={link}>
                manage your email preferences
              </Link>
              .
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
                📷
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
