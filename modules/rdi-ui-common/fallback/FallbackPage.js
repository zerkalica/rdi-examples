/* @flow */

interface FallbackPageProps {
    error: Error;
}

export default function FallbackPage({error}: FallbackPageProps, _state: any, __h: any) {
    return <div className="unhandlered-error-page">
        <pre className="error-trace">{error.stack}</pre>
    </div>
}
