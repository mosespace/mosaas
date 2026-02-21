import { siteConfig } from "@/lib/constants";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function VerifyEmailOtp({
  name,
  email = "user@example.com",
  otp = "123456",
}: {
  name?: string | null;
  email?: string | null;
  otp: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Your {siteConfig.name} verification code: {otp}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hi {name ? name : "👋"},</Text>

          <Text style={paragraph}>
            Thanks for creating an account with {siteConfig.name}.
          </Text>

          <Text style={paragraph}>
            Use the verification code below to confirm your email address:
          </Text>

          <Section style={otpContainer}>
            <Text style={otpCode}>{otp}</Text>
          </Section>

          <Text style={paragraph}>
            This code will expire in <strong>10 minutes</strong>. If you didn’t
            request this, you can safely ignore this email.
          </Text>

          <Text style={paragraph}>Thanks,</Text>
          <Text style={team}>The {siteConfig.name} Team</Text>

          <Section style={footerSection}>
            <Text style={footerText}>
              This email was sent to{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>

            <Text style={footerText}>
              © {new Date().getFullYear()} {siteConfig.name},{" "}
              {siteConfig.address}
            </Text>

            <div style={{ textAlign: "center", marginTop: "8px" }}>
              <Link href={siteConfig.twitterUrl} style={socialIcon}>
                ✖
              </Link>{" "}
              <Link href={siteConfig.websiteUrl} style={socialIcon}>
                🌐
              </Link>{" "}
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
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter, sans-serif",
  color: "#1a1a1a",
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  padding: "24px",
  maxWidth: "480px",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const greeting = {
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  marginBottom: "16px",
};

const otpContainer = {
  backgroundColor: "#f5f7f9",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const otpCode = {
  fontSize: "28px",
  fontWeight: 700,
  letterSpacing: "6px",
  color: "#279591",
};

const team = {
  fontSize: "14px",
  marginBottom: "16px",
};

const footerSection = {
  marginTop: "32px",
  borderTop: "1px solid #eaeaea",
  paddingTop: "16px",
};

const footerText = {
  fontSize: "12px",
  color: "#666",
  lineHeight: "18px",
  marginBottom: "8px",
  textAlign: "center" as const,
};

const link = {
  color: "#279591",
  textDecoration: "none",
};

const socialIcon = {
  margin: "0 4px",
  color: "#999",
  textDecoration: "none",
  fontSize: "16px",
};
