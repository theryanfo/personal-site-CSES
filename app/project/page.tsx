"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

type Project = {
    _id: string;
    projectName: string;
    description: string;
    startDate: string;
    endDate?: string | null;
    deploymentLink?: string | null;
    githubLink?: string | null;
};

export default function ProjectPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                // Your current API path is plural:
                const res = await fetch("/api/projects", { cache: "no-store" });

                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                const data = (await res.json()) as Project[];
                setProjects(data);
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
                        Projects
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Selection of projects I've worked on
                    </p>
                </header>

                {loading && (
                    <p className="text-sm text-muted-foreground">Loading…</p>
                )}

                {!loading && error && (
                    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
                        <p className="font-medium">Couldn’t load projects.</p>
                        <p className="mt-1 text-muted-foreground">{error}</p>
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
                        No projects yet. Add one via Postman at <span className="font-mono">POST /api/projects</span>.
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <section className="grid gap-4">
                        {projects.map((proj) => (
                            <ProjectCard key={proj._id} project={proj} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
