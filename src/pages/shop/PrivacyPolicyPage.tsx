
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const sectionClass =
    "bg-[#FAF7F2] border border-[#D9BE95]/50 rounded-xl shadow-md p-6 sm:p-8";

const headingClass =
    "text-lg font-semibold text-[#342D26] mb-3";

const textClass =
    "text-base leading-relaxed text-[#6B5D48]";

const linkClass =
    "text-[#8C6843] font-medium underline underline-offset-2 hover:text-[#6F4E2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843] rounded-sm";

function PrivacySection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className={sectionClass}>
            <h2 className={headingClass}>{title}</h2>
            <div className={textClass}>{children}</div>
        </section>
    );
}

function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#FAF6EE] pt-10 pb-24 md:pb-10 text-[#342D26]">
            <div className="max-w-4xl mx-auto px-4">

                {/* Sidhuvud */}
                <header className="text-center max-w-2xl mx-auto mb-12">

                    <span className="block text-xs uppercase tracking-[0.25em] text-[#8C6843]">
                        Goldie Ranch
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#342D26] mt-2">
                        Integritetspolicy
                    </h1>

                    <div className="w-20 h-[3px] mx-auto mt-4 mb-5 bg-gradient-to-r from-transparent via-[#D9BE95] to-transparent opacity-90 rounded-full" />

                    <p className="text-base leading-relaxed text-[#6B5D48]">
                        Vi på Goldie Ranch värnar om din personliga integritet.
                        Här beskriver vi hur vi samlar in, använder och hanterar
                        personuppgifter när du besöker vår webbplats eller kontaktar oss.
                    </p>

                    <p className="text-sm text-[#6B5D48] mt-4">
                        Senast uppdaterad: 15 november 2026
                    </p>

                </header>

                <div className="space-y-5">

                    <PrivacySection title="1. Personuppgiftsansvarig">
                        <p>
                            Personuppgiftsansvarig för behandlingen av
                            personuppgifter är:
                        </p>

                        <p className="mt-3">
                            <strong>Emilia and Ellinor Showhorses HB</strong>
                            <br />
                            Organisationsnummer: 969785-0023
                            <br />
                            Verksamhet: Goldie Ranch
                            <br />
                            E-post:{" "}
                            <a
                                href="mailto:goldieranch96@gmail.com"
                                className={linkClass}
                            >
                                goldieranch96@gmail.com
                            </a>
                            <br />
                            Postadress: [Fyll i företagets postadress]
                        </p>
                    </PrivacySection>

                    <PrivacySection title="2. Vilka personuppgifter behandlar vi?">
                        <p>
                            Vi behandlar personuppgifter som du själv lämnar
                            till oss när du kontaktar oss, samt viss teknisk
                            information som kan uppstå när du använder vår
                            webbplats.
                        </p>

                        <p className="mt-3">
                            Det kan exempelvis handla om:
                        </p>

                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Namn och kontaktuppgifter som du lämnar till oss.</li>
                            <li>E-postadress och innehåll i meddelanden.</li>
                            <li>Uppgifter som du delar med oss via sociala medier.</li>
                            <li>
                                Teknisk information, exempelvis IP-adress,
                                webbläsare och information om hur webbplatsen
                                kommunicerar med din enhet.
                            </li>
                            <li>
                                Uppgifter kopplade till våra administratörskonton
                                och webbplatsens administration.
                            </li>
                        </ul>

                        <p className="mt-3">
                            Vi erbjuder för närvarande inga kundkonton eller
                            kundinloggningar på webbplatsen.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="3. Varför behandlar vi personuppgifter?">
                        <p>
                            Vi behandlar personuppgifter för att kunna:
                        </p>

                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>
                                <strong>Besvara frågor:</strong> Hantera
                                meddelanden och förfrågningar som du skickar
                                till oss.
                            </li>
                            <li>
                                <strong>Hantera kundärenden:</strong> Följa upp
                                kontakter och ärenden som uppstår i samband
                                med vår verksamhet.
                            </li>
                            <li>
                                <strong>Administrera webbplatsen: </strong>
                                Hantera våra administratörskonton, produkter
                                och webbplatsens funktioner.
                            </li>
                            <li>
                                <strong>Säkerhet och drift:</strong> Skydda
                                webbplatsen, förebygga missbruk och se till
                                att tjänsterna fungerar som de ska.
                            </li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection title="4. Rättslig grund">
                        <p>
                            Vi behandlar personuppgifter med stöd av den
                            rättsliga grund som gäller för respektive
                            behandling enligt dataskyddsförordningen (GDPR).
                        </p>

                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>
                                <strong>Berättigat intresse:</strong> När vi
                                behöver hantera förfrågningar, kommunicera med
                                besökare samt administrera och skydda vår
                                verksamhet.
                            </li>
                            <li>
                                <strong>Avtal eller åtgärder före avtal: </strong>
                                När behandlingen behövs för att hantera en
                                beställning eller en förfrågan inför ett köp.
                            </li>
                            <li>
                                <strong>Rättslig förpliktelse:</strong> När vi
                                enligt lag behöver spara eller lämna ut vissa
                                uppgifter.
                            </li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection title="5. Hur länge sparar vi uppgifterna?">
                        <p>
                            Vi sparar inte personuppgifter längre än vad som
                            är nödvändigt för de ändamål som uppgifterna
                            samlades in för, eller så länge vi behöver dem
                            för att uppfylla rättsliga skyldigheter.
                        </p>

                        <p className="mt-3">
                            Meddelanden och kontaktuppgifter sparas så länge
                            det behövs för att hantera kontakten och
                            eventuella uppföljningar. Uppgifter kopplade
                            till administratörskonton sparas så länge
                            kontona behöver finnas kvar.
                        </p>

                        <p className="mt-3">
                            Om vi behandlar personuppgifter i samband med
                            framtida beställningar kommer vi även att följa
                            de lagstadgade krav som gäller för exempelvis
                            bokföring.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="6. Vilka kan få tillgång till uppgifterna?">
                        <p>
                            Vi säljer inte dina personuppgifter vidare.
                            För att kunna driva webbplatsen och vår
                            verksamhet använder vi externa tjänster som
                            kan behandla personuppgifter.
                        </p>

                        <p className="mt-3">
                            Det gäller bland annat:
                        </p>

                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>
                                <strong>Supabase:</strong> Används för
                                webbplatsens databas och administratörsinloggning.
                                Endast vi som administrerar verksamheten
                                har inloggning till dessa funktioner.
                            </li>
                            <li>
                                <strong>Netlify:</strong> Används för
                                webbplatsens hosting och drift.
                            </li>
                            <li>
                                <strong>E-post- och sociala medietjänster: </strong>
                                Används när vi kommunicerar med dig via
                                dessa kanaler.
                            </li>
                        </ul>

                        <p className="mt-3">
                            När externa leverantörer behandlar
                            personuppgifter för vår räkning ska
                            behandlingen regleras genom lämpliga
                            personuppgiftsbiträdesavtal.
                        </p>

                        <p className="mt-3">
                            Vi kan även behöva lämna ut uppgifter om
                            det krävs enligt lag eller myndighetsbeslut.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="7. Överföring till länder utanför EU/EES">
                        <p>
                            Vissa av de tjänster vi använder kan innebära
                            att personuppgifter behandlas eller överförs
                            till länder utanför EU/EES.
                        </p>

                        <p className="mt-3">
                            Om en sådan överföring sker ansvarar vi för att
                            den har stöd i GDPR och att lämpliga
                            skyddsåtgärder finns på plats.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="8. Cookies och liknande tekniker">
                        <p>
                            Vi använder för närvarande inga särskilda
                            analys- eller marknadsföringsverktyg för att
                            spåra besökare på webbplatsen.
                        </p>

                        <p className="mt-3">
                            Webbplatsens tekniska funktioner och
                            administratörsinloggning kan använda teknisk
                            lagring, exempelvis för att hantera sessioner
                            och säkerställa att webbplatsen fungerar
                            korrekt.
                        </p>

                        <p className="mt-3">
                            Vi använder vanliga länkar till våra sociala
                            medier. När du klickar på en sådan länk lämnar
                            du vår webbplats och omfattas av den externa
                            tjänstens egna integritetsvillkor.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="9. Dina rättigheter">
                        <p>
                            Enligt GDPR har du flera rättigheter när vi
                            behandlar dina personuppgifter. Beroende på
                            situation har du bland annat rätt att:
                        </p>

                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>
                                Begära information om vilka personuppgifter
                                vi behandlar om dig.
                            </li>
                            <li>Begära rättelse av felaktiga uppgifter.</li>
                            <li>Begära att dina uppgifter raderas.</li>
                            <li>Begära begränsning av behandlingen.</li>
                            <li>
                                Invända mot behandling som grundas på
                                berättigat intresse.
                            </li>
                            <li>
                                Begära dataportabilitet när reglerna för
                                detta är uppfyllda.
                            </li>
                            <li>
                                Lämna klagomål till
                                Integritetsskyddsmyndigheten (IMY).
                            </li>
                        </ul>

                        <p className="mt-3">
                            Om du vill utöva någon av dina rättigheter
                            är du välkommen att kontakta oss via e-post.
                        </p>

                        <p className="mt-3">
                            Läs mer hos{" "}
                            <a
                                href="https://www.imy.se/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                Integritetsskyddsmyndigheten (IMY)
                            </a>.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="10. Ändringar i integritetspolicyn">
                        <p>
                            Vi kan komma att uppdatera denna
                            integritetspolicy om vår verksamhet,
                            webbplats eller behandling av personuppgifter
                            förändras.
                        </p>

                        <p className="mt-3">
                            Den senaste versionen finns alltid
                            tillgänglig på vår webbplats.
                        </p>
                    </PrivacySection>

                    <PrivacySection title="11. Kontakta oss">
                        <p>
                            Om du har frågor om hur vi hanterar
                            personuppgifter eller vill utöva dina
                            rättigheter är du välkommen att kontakta oss.
                        </p>

                        <p className="mt-3">
                            <strong>Emilia and Ellinor Showhorses HB</strong>
                            <br />
                            Organisationsnummer: 969785-0023
                            <br />
                            E-post:{" "}
                            <a
                                href="mailto:goldieranch96@gmail.com"
                                className={linkClass}
                            >
                                goldieranch96@gmail.com
                            </a>
                        </p>

                        <div className="mt-6">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#D9BE95] border border-[#D9BE95]/50 text-[#342D26] font-semibold hover:bg-[#CFB58C] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6843]"
                            >
                                Kontakta oss
                            </Link>
                        </div>
                    </PrivacySection>

                </div>
            </div>
        </main>
    );
}

export default PrivacyPolicyPage;
