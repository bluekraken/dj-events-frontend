import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

const EventPage = ({ evt }) => {
    const router = useRouter();

    const goBack = (e) => {
        e.preventDefault();
        router.back();
    };

    return (
        <Layout>
            <div>
                <Toaster position="bottom-center" />
            </div>
            <div className={styles.event}>
                <span>
                    {new Date(evt.date).toLocaleDateString("en-GB")} at {evt.time}
                </span>

                <h1>{evt.name}</h1>

                <div className={styles.image}>
                    <Image
                        src={evt.image ? evt.image.formats.medium.url : "/images/event-default.png"}
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

                <Link href="#">
                    <a onClick={goBack} className={styles.back}>
                        {"<"} Go back
                    </a>
                </Link>
            </div>
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const res = await fetch(`${API_URL}/events`);
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
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
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
