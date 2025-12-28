"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";

type Experience = {
    _id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate?: string | null;
    description: string;
};

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("/api/experiences", { cache: "no-store" });

                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                const data = (await res.json()) as Experience[];
                setExperiences(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Experience
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        A list of my work and involvement
                    </p>
                </header>

                {loading && (
                    <p className="text-sm text-muted-foreground">Loading…</p>
                )}

                {!loading && error && (
                    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
                        <p className="font-medium">Couldn’t load experiences.</p>
                        <p className="mt-1 text-muted-foreground">{error}</p>
                    </div>
                )}

                {!loading && !error && experiences.length === 0 && (
                    <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
                        No experiences yet. Add one via Postman at <span className="font-mono">POST /api/experiences</span>.
                    </div>
                )}

                {!loading && !error && experiences.length > 0 && (
                    <section className="grid gap-4">
                        {experiences.map((exp) => (
                            <ExperienceCard key={exp._id} experience={exp} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
