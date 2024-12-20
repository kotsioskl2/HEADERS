import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="font-bold text-xl">Vehicle Listings</div>
            <div className="space-x-4">
                <Link href="/" className="hover:text-secondary">Home</Link>
                <Link href="/admin" className="hover:text-secondary">Admin Dashboard</Link>
            </div>
        </nav>
    );
}
