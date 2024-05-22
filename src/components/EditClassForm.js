import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import store from '../store';
import { getDetailClassAction, updateClassAction } from '../actions/classActions';

function EditClassForm() {
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    const updatedClass = {
        id,
        name: className,
        description,
    };
    const navigate = useNavigate();

    const handleChangeClassName = (classNameInput) => {
        setClassName(classNameInput);
    };

    const handleChangeDescription = (descriptionInput) => {
        setDescription(descriptionInput);
    };

    useEffect(() => {
        store.dispatch(getDetailClassAction(id));

        // Subscribe to Redux store changes and update component state accordingly
        const unsubscribe = store.subscribe(() => {
            const classState = store.getState().classReducer.item;
            if (classState) {
                setClassName(classState.name);
                setDescription(classState.description);
            }
        });

        // Clean-up function to unsubscribe from store changes when component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const onSubmit = (classObject) => {
        store.dispatch(updateClassAction(classObject));
        navigate('/classes');
    };
    const cancelAction = () => {
        navigate(-1);
    };
    return (
        <form className="row d-flex justify-content-center p-5 ">
            <div className="col-12  d-flex justify-content-center">
                <h3>Create New Class</h3>
            </div>
            <div className="col-8 p-5">
                <div className="border p-3">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={className}
                            onChange={(e) => handleChangeClassName(e.target.value)}
                        />
                        <label>Class Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => handleChangeDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>

                    <div className="col-7">
                        <div className="d-flex mt-3 ">
                            <ConfirmModal callback={onSubmit} param={updatedClass}>
                                <button className="btn btn-outline-success mx-2" type="button">
                                    Create Class
                                </button>
                            </ConfirmModal>

                            <ConfirmModal callback={cancelAction}>
                                <button className="btn btn-outline-danger mx-2" type="button">
                                    Cancel
                                </button>
                            </ConfirmModal>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EditClassForm;
