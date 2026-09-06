import { submitReview } from "@/lib/website/reviews";

async function createTestReview() {
  "use server";

  await submitReview({
    customer_name: "Review Test User",
    customer_email: "review-test@example.com",
    rating: 5,
    comment: "Testing review submission from website.",
  });
}

export default function TestReviewPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Review API Test</h1>

      <form action={createTestReview} className="mt-4">
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Submit Test Review
        </button>
      </form>
    </main>
  );
}