import Link from "next/link";

export default function Page() {
    return (
        <div>
            <p>home page</p>
            <Link
                href="/spaces"
                className="cursor-pointer"
            >spaces</Link>
        </div>
    );
}