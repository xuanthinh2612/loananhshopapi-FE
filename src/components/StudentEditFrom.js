import { useEffect, useState } from 'react';
import { getClassList } from '../service/classService';
import { getDetailStudentAction, updateStudentAction } from '../actions/studentActions';
import { useNavigate, useParams } from 'react-router-dom';
import configs from '../configs';
import ConfirmModal from './ConfirmModal';
import store from '../store';
import { connect } from 'react-redux';

function StudentEditForm() {
    const studentInitState = {
        firstName: '',
        lastName: '',
        age: '',
        address: '',
        email: '',
        schoolClass: {},
    };
    const [studentState, setStudentState] = useState(studentInitState);
    const { id } = useParams();
    const [classList, setClassList] = useState([]);
    const navigate = useNavigate();
    const ageOptions = Array.from({ length: 70 }, (_, index) => index + 1);

    useEffect(() => {
        // Dispatch the action to fetch student detail when component mounts
        store.dispatch(getDetailStudentAction(id));

        // Subscribe to Redux store changes and update component state accordingly
        const unsubscribe = store.subscribe(() => {
            const updatedStudent = store.getState().studentReducer.item;
            if (updatedStudent) {
                setStudentState(updatedStudent);
            }
        });

        // Clean-up function to unsubscribe from store changes when component unmounts
        return () => {
            unsubscribe();
        };
    }, [id]);

    useEffect(() => {
        const getClassListApi = async () => {
            const classData = await getClassList();
            setClassList(classData);
        };
        getClassListApi();
    }, []);

    const handleChangeFirstName = (value) => {
        const newStudentState = {
            ...studentState,
            firstName: value,
        };

        setStudentState(newStudentState);
    };
    const handleChangeLastName = (value) => {
        const newStudentState = {
            ...studentState,
            lastName: value,
        };

        setStudentState(newStudentState);
    };
    const handleChangeAge = (value) => {
        const newStudentState = {
            ...studentState,
            age: value,
        };

        setStudentState(newStudentState);
    };
    const handleChangeAddress = (value) => {
        const newStudentState = {
            ...studentState,
            address: value,
        };

        setStudentState(newStudentState);
    };
    const handleChangeEmail = (value) => {
        const newStudentState = {
            ...studentState,
            email: value,
        };

        setStudentState(newStudentState);
    };
    const handleChangeClass = (value) => {
        const newStudentState = {
            ...studentState,
            schoolClass: { id: value },
        };

        setStudentState(newStudentState);
    };

    const onSubmit = async () => {
        await store.dispatch(updateStudentAction(studentState));
        navigate(configs.routes.studentList);
    };

    const cancelCreateStudent = () => {
        navigate(-1);
    };

    return (
        <>
            {studentState && (
                <form className="row d-flex justify-content-center p-5 " onSubmit={onSubmit}>
                    <div className="col-12  d-flex justify-content-center">
                        <h3>Student Infomation</h3>
                    </div>

                    <div className="col-8 p-5">
                        <div className="border p-3">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    value={studentState.firstName}
                                    onChange={(e) => handleChangeFirstName(e.target.value)}
                                />
                                <label>First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={studentState.lastName}
                                    onChange={(e) => handleChangeLastName(e.target.value)}
                                />
                                <label>Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    aria-label="Floating label select example"
                                    value={studentState.age}
                                    onChange={(e) => handleChangeAge(e.target.value)}
                                >
                                    <option value={0}>Age</option>
                                    {ageOptions.map((age, index) => {
                                        return (
                                            <option key={index} value={age}>
                                                {age}
                                            </option>
                                        );
                                    })}
                                </select>
                                <label>Age</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    value={studentState.address}
                                    onChange={(e) => handleChangeAddress(e.target.value)}
                                />
                                <label>Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={studentState.email}
                                    onChange={(e) => handleChangeEmail(e.target.value)}
                                />
                                <label>Email</label>
                            </div>

                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    aria-label="Floating label select example"
                                    value={studentState.schoolClass.id}
                                    onChange={(e) => handleChangeClass(e.target.value)}
                                >
                                    <option>Select Class Name</option>
                                    {classList.map((obj) => {
                                        return (
                                            <option key={obj.id} value={obj.id}>
                                                {obj.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <label>Class Name</label>
                            </div>
                            <div className="col-7">
                                <div className="d-flex mt-3 ">
                                    <ConfirmModal callback={onSubmit} param={studentState}>
                                        <button className="btn btn-outline-success" type="button">
                                            Update Student
                                        </button>
                                    </ConfirmModal>
                                    <ConfirmModal callback={cancelCreateStudent}>
                                        <button className="btn btn-outline-danger mx-2" type="button">
                                            Cancel
                                        </button>
                                    </ConfirmModal>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        studentState: state.studentReducer.item,
        isLoading: state.studentReducer.isLoading,
    };
};

export default connect(mapStateToProps)(StudentEditForm);
