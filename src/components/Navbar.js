import { NavLink, useNavigate } from 'react-router-dom';
import configs from '../configs';
import { home, back, group, school } from '../assets/icons';
import { cleanUpSessionAndStorageData, isUserLoggedIn } from '../service/authService';

function Navbar() {
    const navigate = useNavigate();
    const isAuth = isUserLoggedIn();
    function handleLogout() {
        cleanUpSessionAndStorageData();
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className=" navbar-collapse" id="navbarScroll">
                    <ul
                        className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                        style={{ '--bs-scroll-height': '100px' }}
                    >
                        <li className="nav-item mx-5">
                            <NavLink to={configs.routes.home} className="nav-link">
                                {home}
                            </NavLink>
                        </li>
                        <li className="nav-item mx-5">
                            <NavLink to={configs.routes.studentList} className="nav-link">
                                {group}
                            </NavLink>
                        </li>
                        <li className="nav-item mx-5">
                            <NavLink to={configs.routes.classList} className="nav-link">
                                {school}
                            </NavLink>
                        </li>
                        {!isAuth && (
                            <>
                                <li className="nav-item mx-5">
                                    <NavLink to={configs.routes.login} className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isAuth && (
                            <li className="nav-item mx-5">
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="m-2 btn btn-success" type="button">
                            Search
                        </button>
                        <button className=" m-2 btn btn-dark" type="button" onClick={() => navigate(-1)}>
                            {back}
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
