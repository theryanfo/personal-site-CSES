export default function Home()
{
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
                <section className="w-full max-w-3xl rounded-lg border bg-card p-8 shadow-sm">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center">
                        <div className="flex justify-center md:justify-start">
                            <img
                                src="/profile.jpg"
                                alt="Profile picture"
                                className="h-32 w-32 rounded-full border object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Ryan Fordham
                            </h1>

                            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                                Hi! I am a 4th-year student at UCSD majoring in 
                                Mathematics-Computer Science and looking to gain experience in the 
                                software engineering and development space.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
