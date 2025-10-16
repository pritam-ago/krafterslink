import Link from "next/link";

export default function MyLinksIndex() {
  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold">My Links</h2>
      <p className="mt-2 text-sm text-muted-foreground">List of your created links.</p>
      <ul className="mt-4 list-disc list-inside">
        <li>
          <Link href="/dashboard/myLinks/1">Example link #1</Link>
        </li>
      </ul>
    </div>
  );
}
