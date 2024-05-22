import { useEffect } from 'react';
import store from '../store';
import { getDetailClassAction } from '../actions/classActions';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import SpinnerIcon from './SpinnerIcon';

function ClassDetailForm(props) {
    const { id } = useParams();

    useEffect(() => {
        store.dispatch(getDetailClassAction(id));
    }, []);

    if (props.error) {
        return (
            <div>
                Opp! Some error Occured with status: {props.error.response.status} - {props.error.message}
            </div>
        );
    }
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="text-center">{SpinnerIcon}</div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="text-center">
                <h1 className="mt-5 ">Class Detail</h1>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.classDetail && (
                        <tr key={props.classDetail.id}>
                            <th scope="row">{props.classDetail.id}</th>
                            <td>{props.classDetail.name}</td>
                            <td>{props.classDetail.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        classDetail: state.classReducer.item,
        isLoading: state.classReducer.isLoading,
        error: state.classReducer.error,
    };
};
export default connect(mapStateToProps)(ClassDetailForm);
