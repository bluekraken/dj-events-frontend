import { FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error } = useContext(AuthContext);

    useEffect(() => error && toast.error(error));

    const handleSubmit = (e) => {
        e.preventDefault();

        login({ email, password });
    };

    return (
        <Layout title="User login">
            <div>
                <Toaster position="bottom-center" />
            </div>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Login user
                </h1>
                <form onSubmit={handleSubmit}>
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

                    <input type="submit" value="Login" className="btn" />
                </form>

                <p>
                    Don&apos;t have an account? <Link href="/account/register">Register</Link>
                </p>
            </div>
        </Layout>
    );
};

export default LoginPage;
