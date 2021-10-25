import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

const NotFoundPage = () => {
    return (
        <Layout title="Page not found">
            <div className={styles.error}>
                <h1>
                    <FaExclamationTriangle /> 404
                </h1>
                <h4>Sorry, the page you are looking for cannot be found!</h4>
                <Link href="/">Return to home page</Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
