import moment from "moment";
import { FaImage } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import parseCookies from "@/helpers/index";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const EditEventPage = ({ evt, token }) => {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description
    });

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const hasEmptyFields = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all the fields!");
            return;
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: "PUT",
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

        const updatedEvt = await res.json();
        router.push(`/events/${updatedEvt.slug}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/events/${evt.id}`);
        const data = await res.json();
        setImagePreview(data.image.formats.thumbnail.url);
        setShowModal(false);
    };

    return (
        <Layout title="Edit event">
            <div>
                <Toaster position="bottom-center" />
            </div>
            <h1>Edit an existing event</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event name</label>
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
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={moment(values.date).format("yyyy-MM-DD")}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Update event" className="btn" />
            </form>

            <h2>Event image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} alt="An image of the event" />
            ) : (
                <div>
                    <p>No image uploaded</p>
                </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)} className="btn-secondary btn-icon">
                    <FaImage /> Set image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token} />
            </Modal>
        </Layout>
    );
};

export async function getServerSideProps({ params: { id }, req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();

    return {
        props: {
            evt,
            token
        }
    };
}

export default EditEventPage;
