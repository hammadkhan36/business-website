import { validateCoupon } from "@/lib/website/coupons";

async function testCoupon(formData: FormData) {
  "use server";

  const code = String(formData.get("code") || "").trim();

  if (!code) {
    throw new Error("Coupon code required.");
  }

  await validateCoupon({ code });
}

export default function TestCouponPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Coupon API Test</h1>

      <form action={testCoupon} className="mt-4 flex gap-2">
        <input
          name="code"
          placeholder="Enter coupon code"
          className="rounded border px-3 py-2"
        />

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Validate Coupon
        </button>
      </form>
    </main>
  );
}