import Counter from './components/Counter';
import {Fragment} from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import {useSelector} from "react-redux";
import UserProfile from "./components/UserProfile";

/**
 * - We want to make the login form work.
 *      - we will cover form authentication later.
 *      - For now, when login button is clicked, we switch into some login mode.
 *      - For e.g., Navigation bar changes, logout button will only be displayed if we're logged in.
 *
 *  - Unlike counter state (was just basic example), the Authentication state (use logged in or not)
 *      is not just local state, it' application-wide state i.e., it matters to Header, Auth, UserProfile components.
 *  - So, this user Authentication state is a perfect example for a state that we could manage with React Context/Redux.
 *  - Authentication state will be true if user is authenticated else vice versa.
 *
 */
function App() {

    const isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <Fragment>
            <Header/>
            {!isAuth && <Auth />}
            {isAuth && <UserProfile/>}
            <Counter/>
        </Fragment>
    );
}

export default App;
