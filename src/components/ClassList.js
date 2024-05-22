import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as classService from '../service/classService';
import { Link } from 'react-router-dom';
import configs from '../configs';
import { pencel, plus, trash } from '../assets/icons';
import ConfirmModal from './ConfirmModal';
import store from '../store';
import { deleteClassAction, getListClassAction } from '../actions/classActions';
import { connect } from 'react-redux';
import { isAdminUser } from '../service/authService';
import SpinnerIcon from './SpinnerIcon';

function ClassList(props) {
    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        store.dispatch(getListClassAction());
    }, []);

    const handleEdit = (classId) => {
        navigate(`/edit-class/${classId}`);
    };

    const handleDelete = async (classId) => {
        await store.dispatch(deleteClassAction(classId));
    };

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
                <h1 className="mt-5 ">Class List</h1>
            </div>
            {isAdmin && (
                <div className="d-flex justify-content-end">
                    <Link to={configs.routes.newClass} className="btn btn-outline-dark">
                        New <span>{plus}</span>
                    </Link>
                </div>
            )}

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        {isAdmin && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {props.listClass &&
                        props.listClass.map((classElement) => {
                            return (
                                <tr key={classElement.id}>
                                    <th scope="row">{classElement.id}</th>
                                    <td>
                                        <Link className="text-decoration-none" to={`/class-detail/${classElement.id}`}>
                                            {classElement.name}
                                        </Link>{' '}
                                    </td>
                                    <td>{classElement.description}</td>
                                    {isAdmin && (
                                        <td>
                                            <ConfirmModal callback={handleEdit} param={classElement.id}>
                                                <span className="text-success m-2">{pencel}</span>
                                            </ConfirmModal>
                                            <ConfirmModal callback={handleDelete} param={classElement.id}>
                                                <span className="text-danger m-2">{trash}</span>
                                            </ConfirmModal>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        listClass: state.classReducer.list,
        isLoading: state.classReducer.isLoading,
        error: state.classReducer.error,
    };
};

export default connect(mapStateToProps)(ClassList);
