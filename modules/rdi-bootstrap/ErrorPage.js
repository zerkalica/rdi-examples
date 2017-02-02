// @flow

export default function ErrorPage(
    {error}: {error: Error}
) {
    return <div>
        <h1>Error</h1>
        <pre>{error.message}</pre>
    </div>
}
