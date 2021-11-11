import { FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { register, error } = useContext(AuthContext);

    useEffect(() => error && toast.error(error));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match!");
            return;
        }

        register({ username, email, password });
    };

    return (
        <Layout title="User registration">
            <div>
                <Toaster position="bottom-center" />
            </div>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Register user
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="passwordConfirm">Confirm password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Register" className="btn" />
                </form>

                <p>
                    Already have an account? <Link href="/account/login">Login</Link>
                </p>
            </div>
        </Layout>
    );
};

export default RegisterPage;
