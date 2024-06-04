import { env } from "@/env";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyMagicLinkEmailProps {
  confirmLink?: string;
}

export const VerifyMagicLinkEmail = ({
  confirmLink,
}: VerifyMagicLinkEmailProps) => {
  const appUrl = env.NEXT_PUBLIC_APP_URL;
  return (
  <Html>
    <Head />
    <Preview>Verify your email.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verify your email.</Heading>
        <Link
          href={confirmLink}
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          Click here to confirm your email.
        </Link>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          If you didn&apos;t try to verify your email , you can safely ignore
          this email.
        </Text>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          Hint: You can set a permanent password in Settings.
        </Text>
        <Img
          src={`${appUrl}/android-chrome-512x512.png`}
          width="32"
          height="32"
          alt="Muswaddaty's Logo"
        />
        <Text style={footer}>
          <Link
            href={appUrl}
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            {appUrl}
          </Link>
          , the all-in-one-workspace
          <br />
          for your ideas, notes, documents and tasks.
        </Text>
      </Container>
    </Body>
  </Html>
  )
};
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#0a0a0a",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
