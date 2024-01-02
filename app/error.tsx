'use client'
import { Button } from "@/components/ui/button"

const Error = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {
    return (
        <div className="w-full h-screen">
            <section className="w-full max-w-7xl px-6 py-24 flex flex-col gap-4 mx-auto">
                <h1 className="md:text-4xl text-2xl font-bold">Что-то не так!</h1>
                <span className='text-muted-foreground'>{error.message} {error.digest && `& ${error.digest}`}</span>
                {
                    process.env.NODE_ENV === 'development' &&
                    <code className="w-full h-fit overflow-auto p-4 rounded-xl bg-card">
                        <pre>
                            {error.stack}
                        </pre>
                    </code>
                }
                <Button className="w-fit gap-2" onClick={reset}>
                    Попробовать ещё раз
                </Button>
            </section>
        </div>
    )
}

export default Error