import "server-only";
import { imprint } from "./legal";
import { links } from "./links";

// Datenschutzerklärung (erstellt von Johannes, Stand Oktober 2026).
// Fakten geprüft am 10.10.2026: Vercel-Anschrift und EU-U.S. Data Privacy
// Framework laut vercel.com/legal/privacy-notice; Zoho-Mail im EU-Rechenzentrum
// (MX-Einträge mx.zoho.eu); BayLDA-Anschrift laut lda.bayern.de.
// Bei Änderungen an der Website oder den genutzten Diensten bitte anpassen.

function ExternalLink({ href }: { href: string }) {
  return <a href={href}>{href.replace(/^https:\/\/(www\.)?/, "")}</a>;
}

export function PrivacyPolicy() {
  const email = <a href={`mailto:${links.email}`}>{links.email}</a>;

  return (
    <>
      <p>Stand: Oktober 2026</p>
      <p>
        Diese Website ist bewusst schlank gebaut: Sie setzt keine Cookies, nutzt
        kein Tracking und keine Analyse-Tools und bindet keine Inhalte von
        Drittanbietern ein. Im Folgenden steht, welche Daten trotzdem anfallen
        und wofür.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {imprint.name}
        <br />
        {imprint.street}
        <br />
        {imprint.city}
        <br />
        E-Mail: {email}
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei der Vercel Inc., 440 N Barranca Avenue #4133,
        Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet
        Vercel automatisch technische Daten, die Ihr Browser übermittelt
        (sogenannte Server-Logfiles), insbesondere:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite bzw. Datei</li>
        <li>Referrer-URL (die zuvor besuchte Seite)</li>
        <li>verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>
        Diese Daten sind technisch erforderlich, um die Website auszuliefern
        sowie ihre Stabilität und Sicherheit zu gewährleisten. Rechtsgrundlage
        ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt im
        sicheren und fehlerfreien Betrieb der Website. Eine Zusammenführung mit
        anderen Datenquellen oder eine Auswertung zu Werbe- oder Analysezwecken
        findet nicht statt. Die Daten werden von Vercel nur so lange
        gespeichert, wie es für diese Zwecke erforderlich ist.
      </p>
      <p>
        Vercel verarbeitet die Daten in meinem Auftrag. Dabei können Daten in
        die USA übertragen werden. Vercel ist nach dem EU-U.S. Data Privacy
        Framework zertifiziert; für die USA besteht damit ein
        Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere
        Informationen:{" "}
        <ExternalLink href="https://vercel.com/legal/privacy-notice" />
      </p>

      <h2>3. Keine Cookies, kein Tracking</h2>
      <p>
        Diese Website setzt keine Cookies und verwendet keine Analyse-,
        Tracking- oder Werbedienste. Schriftarten werden zusammen mit dieser
        Website ausgeliefert; beim Seitenaufruf wird keine Verbindung zu Google
        oder anderen Schrift-Anbietern aufgebaut.
      </p>

      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn Sie mir eine E-Mail schreiben (z. B. an {email}), verarbeite ich
        Ihre E-Mail-Adresse, Ihren Namen (sofern angegeben) und den Inhalt Ihrer
        Nachricht, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
        Anfragen) bzw. Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf eine
        Zusammenarbeit gerichtet ist. Ich lösche Ihre Nachricht, sobald sie
        erledigt ist und keine Aufbewahrungsgründe mehr bestehen.
      </p>
      <p>
        Für E-Mails nutze ich Zoho Mail, einen Dienst der Zoho Corporation B.V.,
        Beneluxlaan 4B, 3527 HT Utrecht, Niederlande. Die Daten werden in
        Rechenzentren in der EU verarbeitet. Weitere Informationen:{" "}
        <ExternalLink href="https://www.zoho.com/privacy.html" />
      </p>

      <h2>5. Links zu WhatsApp, Instagram und Google Kalender</h2>
      <p>
        Auf dieser Website finden Sie Links zu unserer WhatsApp-Community und
        unserem Instagram-Profil (beide betrieben von Gesellschaften der
        Meta-Gruppe) sowie einen Link, um einen Termin in den Google Kalender zu
        übernehmen. Es handelt sich um einfache Links: Beim bloßen Besuch dieser
        Website werden keine Daten an diese Anbieter übertragen. Erst wenn Sie
        einen Link anklicken, verlassen Sie diese Website, und es gelten die
        Datenschutzbestimmungen des jeweiligen Anbieters:
      </p>
      <ul>
        <li>
          WhatsApp:{" "}
          <ExternalLink href="https://www.whatsapp.com/legal/privacy-policy-eea" />
        </li>
        <li>
          Instagram:{" "}
          <ExternalLink href="https://privacycenter.instagram.com/policy" />
        </li>
        <li>
          Google: <ExternalLink href="https://policies.google.com/privacy" />
        </li>
      </ul>
      <p>
        Die Kalender-Datei zum Herunterladen (.ics) wird direkt von dieser
        Website bereitgestellt; dabei werden keine zusätzlichen Daten erhoben.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft über die von mir verarbeiteten Daten
        (Art. 15 DSGVO), auf Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art.
        20). Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht,
        können Sie ihr aus Gründen, die sich aus Ihrer besonderen Situation
        ergeben, widersprechen (Art. 21 DSGVO). Schreiben Sie dafür einfach eine
        E-Mail an {email}.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig
        ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade
        18, 91522 Ansbach, <ExternalLink href="https://www.lda.bayern.de" />
      </p>

      <h2>7. Änderungen</h2>
      <p>
        Ich passe diese Datenschutzerklärung an, wenn sich die Website oder die
        genutzten Dienste ändern. Es gilt die jeweils hier veröffentlichte
        Fassung.
      </p>
    </>
  );
}
