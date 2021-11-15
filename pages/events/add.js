import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import parseCookies from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const AddEventPage = ({ token }) => {
    const [values, setValues] = useState({
        name: "",
        performers: "",
        venue: "",
        address: "",
        date: "",
        time: "",
        description: ""
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const hasEmptyFields = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all the fields!");
            return;
        }

        const res = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        // 401 = Unauthorised, 403 = Forbidden
        if (res.status === 401 || res.status === 403) {
            toast.error("Not authorised!");
            return;
        }

        if (!res.ok) {
            toast.error("Oops, something went wrong!");
            return;
        }

        const evt = await res.json();
        router.push(`/events/${evt.slug}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const goBack = () => {
        router.back();
    };

    return (
        <Layout title="Add Event">
            <div>
                <Toaster position="bottom-center" />
            </div>
            <h1>Add an event</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input
                            type="text"
                            name="performers"
                            id="performers"
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" value={values.date} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Add event" className="btn" />
            </form>
        </Layout>
    );
};

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    return {
        props: {
            token
        }
    };
}

export default AddEventPage;
