import Link from 'next/link';
import React from "react";

function CustomButton({ id, label, className, loading, onClick }) {
    return (
        <Link href={`/${id}`}>
            <button
                id={id}
                className={className}
                onClick={onClick}
                disabled={loading}
            >
                {label}
            </button>
        </Link>
    );
}

export default CustomButton;