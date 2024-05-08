import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewProposalEmailProps {
  fullname?: string;
  imageSrc?: string;
  proposalText?: string;
}

export const NewProposalEmail = ({
  fullname,
  imageSrc,
  proposalText,
}: NewProposalEmailProps) => {
  const previewText = `Read ${fullname}'s review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba2ecc2a8af9615522bd837955f90aa462b022e2f13c46a05493e77f07595398?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
              width="96"
              height="30"
              alt="KaizenCloud"
            />
          </Section>
          <Section>
            <Img
              src={imageSrc || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              width="96"
              height="96"
              alt={fullname}
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Here's {fullname}'s new proposal</Text>
              <Text style={review}>{proposalText}</Text>
              <Text style={paragraph}>
                Now that the review period is over, we’ve posted {fullname}
                ’s review to your Airbnb profile.
              </Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                Halilua
              </Text>

              <Button style={button} href="">
                Send My Grade
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={footer}>
                KaizenCloud, Inc., 888 Brannan St, San Francisco, CA 94103
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

NewProposalEmail.PreviewProps = {
  authorName: "Proposal Name",
  authorImage: '',
  proposalText: ``,
} as NewProposalEmailProps;

export default NewProposalEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#2B79C2",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
