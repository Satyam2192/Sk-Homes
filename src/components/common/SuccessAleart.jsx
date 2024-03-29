
export default function successAleart({message}) {
    return (
        <>
            <div
                className="flex w-full items-start gap-4 rounded border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-500"
                role="alert"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    role="graphics-symbol"
                    aria-labelledby="title-06 desc-06"
                >
                    <title id="title-06">Icon title</title>
                    <desc id="desc-06">{message}</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>


                <div>
                    <h3 className="mb-2 font-semibold">
                        All components are now published.
                    </h3>
                    <p>
                        You successfully read this important alert message. Green often
                        indicates something successful or positive.{" "}
                    </p>
                </div>
            </div>

        </>
    )
}