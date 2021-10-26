import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

const EventPage = ({ evt }) => {
    const deleteEvent = (e) => {
        console.log("delete");
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete event
                    </a>
                </div>

                <span>
                    {evt.date} at {evt.time}
                </span>

                <h1>{evt.name}</h1>

                <div className={styles.image}>
                    <Image
                        src={evt.image ? evt.image : "/images/event-default.png"}
                        width={960}
                        height={600}
                        alt="Image of the event"
                    />
                </div>

                <h3>Performers:</h3>
                <p>{evt.performers}</p>

                <h3>Description:</h3>
                <p>{evt.description}</p>

                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href="/events">
                    <a className={styles.back}>{"<"} Go back</a>
                </Link>
            </div>
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    const paths = events.map((evt) => ({
        params: { slug: evt.slug }
    }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1
    };
};

// export const getServerSideProps = async ({ query: { slug } }) => {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         }
//     };
// };

export default EventPage;