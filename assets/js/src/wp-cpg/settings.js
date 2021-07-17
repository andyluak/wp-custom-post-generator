/**
 * Internal deps
 */
import Cookies from './components/Cookies';

/**
 * Wordpress deps
 */
const { api } = wp.api;
const {
    Button,
    Icon,
    Panel,
    PanelBody,
    PanelRow,
    Placeholder,
    SelectControl,
    Spinner,
    TextControl,
    ToggleControl,
} = wp.components;
const { Fragment, Component, useEffect, useState, useRef, render } = wp.element;
const { __ } = wp.i18n;

const useConstructor = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
};

export const App = (props) => {
    // Lets start off by creating helper function to create and get cookies
    const { setCookie, readCookie, checkCookie } = Cookies();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useConstructor(() => {});

	useEffect(() => {
		checkCookie('jwt');
	}, [])

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        fetch('http://dlmcsv.local/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((user) => {
                console.log(user.token);
                setCookie('jwt', user.token, 1);
            });
    };

    const addPost = () => {
        fetch('http://dlmcsv.local/wp-json/wp/v2/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${readCookie('jwt')}`,
            },
            body: JSON.stringify({
                title: 'This is my post',
                content: 'Just created a post',
                status: 'publish',
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((post) => {
                console.log(post);
            });
    };
	if (checkCookie('jwt')) {
        <div onClick={addPost}> Add Post</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    name="name"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );


};
export default App;

document.addEventListener('DOMContentLoaded', () => {
    const htmlOutput = document.getElementById('wp-cpg-settings');

    if (htmlOutput) {
        render(<App />, htmlOutput);
    }
});
