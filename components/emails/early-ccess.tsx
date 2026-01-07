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

export default function EarlyAccessEmail({
  name = 'Friend',
  email = 'example@example.com',
  inviteId,
  code,
  role,
}: {
  name?: string | null;
  email?: string | null;
  inviteId: string;
  code: string;
  role: string;
}) {
  const inviteUrl = `${siteConfig.domain}/auth/early/access?inviteId=${inviteId}&code=${code}`;

  return (
    <Html>
      <Head />
      <Preview>
        🎉 You’ve been granted early access to {siteConfig.name}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hey {name},</Text>

          <Text style={paragraph}>
            Great news! 🎉 You’ve officially been granted{' '}
            <strong>early access</strong> to <strong>{siteConfig.name}</strong>
            as a <strong>{role}</strong>.
          </Text>

          <Text style={paragraph}>
            As one of our early supporters, you now get exclusive access before
            the public launch. We truly appreciate you being part of the journey
            from the start.
          </Text>

          <Text style={paragraph}>
            Click the button below to activate your early access:
          </Text>

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Button style={button} href={inviteUrl}>
              Activate Early Access →
            </Button>
          </Section>

          <Text style={paragraph}>
            This invite is personal to you. If the button doesn’t work, you can
            copy and paste this link into your browser:
          </Text>

          <Text style={codeBlock}>{inviteUrl}</Text>

          <Text style={paragraph}>
            We’re excited to have you inside and can’t wait for your feedback 💚
          </Text>

          <Text style={team}>— The {siteConfig.name} Team 🚀</Text>

          <Section style={footerSection}>
            <Text style={footerText}>
              This email was sent to{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>{' '}
              because you joined the {siteConfig.name} early access.
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
  borderRadius: '10px',
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

const button = {
  backgroundColor: '#279591',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const codeBlock = {
  fontSize: '12px',
  backgroundColor: '#f9f9f9',
  padding: '12px',
  borderRadius: '6px',
  wordBreak: 'break-all' as const,
  marginBottom: '16px',
  border: '1px dashed #eaeaea',
};

const team = {
  fontSize: '14px',
  marginTop: '24px',
  marginBottom: '16px',
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
