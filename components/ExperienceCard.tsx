type Experience = {
    _id: string;
    company: string;
    title: string;
    location: string;
    startDate: string; // dates come back as ISO strings from JSON
    endDate?: string | null;
    description: string;
};

function formatDate(dateString?: string | null) {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Present";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
    return (
        <article className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold leading-tight">
                        {experience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {experience.company} · {experience.location}
                    </p>
                </div>

                <p className="text-sm text-muted-foreground">
                    {formatDate(experience.startDate)} – {formatDate(experience.endDate)}
                </p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {experience.description}
            </p>
        </article>
    );
}
