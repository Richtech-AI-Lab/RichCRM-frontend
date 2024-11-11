import React from 'react';
import { Html, Button, Head, Body, Text } from "@react-email/components";

export const FEKToPurchaserEmail = ({ clientObj, caseObj }) => (
  <Html>
    <Head>
      <title>Contract and Important Dates</title>
    </Head>
    <Body>
      <Text>
        Hi {clientObj.firstName},
      </Text>
      <Text>
        Attached is a copy of the fully executed contract that we received from the seller’s attorney.
      </Text>
      <Text>
        PLEASE KEEP THESE IMPORTANT DATES IN MIND:
      </Text>
      <Text>
        <strong>CLOSING DATE:</strong> The closing date in the contract is <strong>ON OR ABOUT {caseObj.closingDate}</strong>. This means the closing can be anytime between {caseObj.closingDate} TO {caseObj.closingDate} if all parties agree.
      </Text>
      <Text>
        <strong>MORTGAGE CONTINGENCY DATE:</strong> The mortgage commitment must be obtained by <strong>{caseObj.mortgageContingencyDate}</strong>. If you cannot obtain the commitment by {caseObj.mortgageContingencyDate} please let me know immediately so I can request an extension of this date.
      </Text>
      <Text>
        <strong>RATE LOCKS:</strong> If the client decides to "lock-in" an interest rate PLEASE MAKE SURE THE RATE LOCK IS GOOD THROUGH <strong>{caseObj.closingDate}</strong>.
      </Text>
      <Text>
        Please let me know if anything else is needed.
      </Text>
      <Text>Thank you!</Text>
      <Text>
        Sincerely,
      </Text>
      <Text>MG Law Group</Text>
    </Body>
  </Html>
);