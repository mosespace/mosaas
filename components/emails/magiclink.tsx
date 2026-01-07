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

export default function MagicLinkEmail({
  name = 'Friend',
  email = 'example@example.com',
  url,
  expiresInMinutes = 10,
}: {
  name?: string | null;
  email?: string | null;
  url: string;
  expiresInMinutes?: number;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Your secure login link for {siteConfig.name} — expires soon.
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hi {name},</Text>

          <Text style={paragraph}>
            Here’s your secure login link for <strong>{siteConfig.name}</strong>
            .
          </Text>

          <Text style={paragraph}>
            Click the button below to sign in. This link is valid for{' '}
            <strong>{expiresInMinutes} minutes</strong> for security reasons.
          </Text>

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button style={button} href={url}>
              Sign in to {siteConfig.name}
            </Button>
          </Section>

          <Text style={paragraph}>
            If you didn’t request this email, you can safely ignore it — your
            account is secure.
          </Text>

          <Text style={team}>— The {siteConfig.name} Team 🚀</Text>

          {/* FOOTER */}
          <Section style={footerSection}>
            <Text style={footerText}>
              This login email was sent to{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
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
  padding: '12px 22px',
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
