type ErrorPageProps = {
    title: string;
    message: string;
}

export function ErrorPage({ title, message }: ErrorPageProps) {
    return (
        <div className="h-screen bg-background dark grid place-content-center">
            <h1 className="text-primary text-6xl font-bold">{title}</h1>
            <p className="text-primary text-xl mt-3">{message}</p>
        </div>
    )
}