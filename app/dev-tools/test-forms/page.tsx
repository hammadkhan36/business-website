import { getCustomForms, submitCustomForm } from "@/lib/website/forms";
import { createElement } from "react";

async function submitFirstForm(formData: FormData) {
  "use server";

  const formId = String(formData.get("formId") || "");
  const name = String(formData.get("name") || "");
  const phone = String(formData.get("phone") || "");

  if (!formId) {
    throw new Error("No form found.");
  }

  await submitCustomForm({
    form_id: formId,
    fields: {
      name,
      phone,
    },
    page_url: "http://localhost:3001/test-forms",
  });
}

export default async function TestFormsPage() {
  const data = await getCustomForms();
  const firstForm = data?.forms?.[0] || data?.data?.[0] || data?.[0];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Forms API Test</h1>

      {!firstForm ? (
        <p className="mt-4 text-sm text-red-600">
          No custom form found in admin.
        </p>
      ) : (
        <form action={submitFirstForm} className="mt-4 space-y-3">
          <input type="hidden" name="formId" value={firstForm.id} />

          {createElement("input", {
            name: "name",
            placeholder: "Name",
            className: "block rounded border px-3 py-2",
          })}

          {createElement("input", {
            name: "phone",
            placeholder: "Phone",
            className: "block rounded border px-3 py-2",
          })}

          <button type="submit" className="rounded bg-black px-4 py-2 text-white">
            Submit Custom Form
          </button>
        </form>
      )}
    </main>
  );
}