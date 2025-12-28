type Project = {
    _id: string;
    projectName: string;
    description: string;
    startDate: string;
    endDate?: string | null;
    deploymentLink?: string | null;
    githubLink?: string | null;
};

function formatDate(dateString?: string | null) {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Present";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function safeLink(url?: string | null) {
    if (!url) return null;
    try {
        // Ensure it's a valid absolute URL
        // If you store "github.com/..." without protocol, add it in your DB or adjust here.
        const parsed = new URL(url);
        return parsed.toString();
    } catch {
        return null;
    }
}

export default function ProjectCard({ project }: { project: Project }) {
    const deployment = safeLink(project.deploymentLink);
    const github = safeLink(project.githubLink);

    return (
        <article className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold leading-tight">
                        {project.projectName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {formatDate(project.startDate)} – {formatDate(project.endDate)}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {deployment && (
                        <a
                            href={deployment}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                        >
                            Live
                        </a>
                    )}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {project.description}
            </p>
        </article>
    );
}
