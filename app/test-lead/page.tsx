import { submitLead } from "@/lib/website/leads";

async function createTestLead() {
  "use server";

  await submitLead({
    name: "Website Test User",
    phone: "03001234567",
    email: "website-test@example.com",
    service: "Cake Order",
    message: "Testing from website test page",
    page_url: "http://localhost:3001/test-lead",
  });
}

export default function TestLeadPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Lead API Test</h1>

      <form action={createTestLead} className="mt-4">
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Create Test Lead
        </button>
      </form>
    </main>
  );
}