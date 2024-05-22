import Spinner from 'react-bootstrap/Spinner';

function SpinnerIcon() {
    return (
        <Spinner animation="border" variant="info" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default SpinnerIcon();
