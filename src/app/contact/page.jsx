import DarkNavbar from "../../components/DarkNavbar";
import ContactPageContent from "../../components/ContactPageContent";

export const metadata = {
  title: "Contact | ThinkAlternate",
  description: "Talk to ThinkAlternate about MIRSA, Foundry, CTO+, cloud, AI, QA, and product engineering support.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-gray-900">
      <DarkNavbar />
      <ContactPageContent />
    </main>
  );
}
