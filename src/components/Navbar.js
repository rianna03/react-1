import { Link } from "react-router-dom";
const Navbar = () => {
    return(
        <nav className="navbar">
            <h2> College </h2>
            <div className="links">
                <Link to="/addStudent"> Add Student </Link>
                <Link to="/students"> Students</Link>
                <Link to="/login"> Login </Link>

            </div>
        </nav>
    );
}

export default Navbar;