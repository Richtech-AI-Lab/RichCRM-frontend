import * as React from 'react';
import { Html, Button, Head, Title, Body, Text } from "@react-email/components";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>

    <Head>
        <title>Proposed Contract of Sale</title>
    </Head>
    <Body>
        <Text>Dear Counsel,</Text>

        <Text>Enclosed please find the proposed contract of sale and rider regarding the above-referenced transaction. Please kindly review and if it is acceptable to you and your clients, please have your client sign one (1) original and return it to our office together with the downpayment check in the amount of <strong>$xx,000.00</strong> made payable to <strong>"MG LAW GROUP PLLC, as attorney"</strong>.</Text>

        <Text>Please be advised that nothing is binding on our client until approved and signed by our client. Should you have any questions regarding this matter, you may call our office.</Text>

        <Text>Thank you!</Text>

        <Text>Sincerely,</Text>
        <Text>MG Law Group</Text>
    </Body>
    </Html>
  );
}