import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryState {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
}
interface IErrorBoundaryProps {
  error: string;
  children: ReactNode;
  resetError: () => void;
}
class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError || this.props.error) {
      return (
        <div className={styles.errorBoundaryContainer}>
          <div className={styles.errorMessage}>
            <img
              className={styles.errorBoundaryImage}
              src="https://cdn-icons-png.freepik.com/256/10633/10633319.png?semt=ais_hybrid"
              alt="Error illustration"
            />
            <h2>{this.props.error || 'Something went wrong!'}</h2>
            <button onClick={() => this.props.resetError()}>Go Back</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
