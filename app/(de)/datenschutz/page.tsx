import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicyReady } from "@/content/legal";
import { PrivacyPolicy } from "@/content/privacy-policy";
import { SHY } from "@/lib/format";

export const metadata: Metadata = {
  title: "Datenschutz · builder.community",
};

// Der Text steht in content/privacy-policy.tsx.
export default function PrivacyPage() {
  return (
    // Weiches Trennzeichen: Auf schmalen Handys bricht das lange Wort an der
    // Wortfuge um, statt über den Bildschirmrand zu laufen.
    <LegalPage title={`Datenschutz${SHY}erklärung`}>
      {privacyPolicyReady ? (
        <PrivacyPolicy />
      ) : (
        <p>Die Datenschutzerklärung wird gerade erstellt.</p>
      )}
    </LegalPage>
  );
}
