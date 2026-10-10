import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicyReady } from "@/content/legal";

export const metadata: Metadata = {
  title: "Datenschutz · builder.community",
};

// Die Datenschutzerklärung kommt aus einem Generator (Issue #4) und wird hier
// eingefügt. Danach in content/legal.ts privacyPolicyReady auf true setzen.
export default function PrivacyPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      {privacyPolicyReady ? null : (
        <p>Die Datenschutzerklärung wird gerade erstellt.</p>
      )}
    </LegalPage>
  );
}
