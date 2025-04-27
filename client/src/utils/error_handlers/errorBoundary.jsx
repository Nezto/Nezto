import React from 'react';

// Error Boundary for handling failed suspense
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen bg-white flex-col">
                    <div className="text-red-500 text-xl font-bold mb-4">Something went wrong</div>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}


