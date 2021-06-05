import { useEffect, useState } from "react";
import { db } from "/firebase/client";
import { Edad } from "/components/utils/utils";
import useUser from "/hooks/useUser";
import { useRouter } from "next/router";

export default function Feed() {
  const user = useUser();
  const router = useRouter();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const feeds = [];
    db.collection("users")
      .get()
      .then(({ docs }) => {
        docs.forEach((docs) => {
          if (user && user.uid === docs.id) {
            return;
          }
          feeds.push(docs.data());
        });
        setFeed(feeds);
      });
  }, [user]);

  return (
    <>
      <h1>Encuentra a tu Canguro</h1>
      {feed.map((e) => {
        return (
          <div
            className="feed-container"
            onClick={() => router.push(`/perfil/${e.uid}`)}
          >
            <div className="feed-foto">
              <img src={e.photoURL} alt="Foto de perfil" />
            </div>
            <div className="feed-info">
              <p className="feed-nombre">
                <strong>
                  {e.nombre} • {Edad(e.fecha_nacimiento)}
                </strong>
              </p>
              <p className="feed-provincia">{e.provincia}</p>
              <p>{e?.descripcion}</p>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        h1 {
          text-align: center;
          margin-top: 20px;
        }
        .feed-container {
          display: flex;
          border-bottom: 1px solid #ddd;
          padding: 1.5rem 0;
          font-size: 1em;
          cursor: pointer;
          margin: 2% 10%;
        }

        .feed-container:hover {
          border-bottom-color: #59bec9;
        }
        .feed-foto img {
          height: 150px;
          width: 150px;
          border-radius: 10px;
        }
        .feed-nombre {
          font-size: 1.3em;
          margin-bottom: 0;
        }

        .feed-provincia {
          font-size: 0.7em;
        }
        .feed-info {
          overflow: hidden;
          text-overflow: ellipsis !important;
          margin-left: 10%;
          height: 204px;
        }
      `}</style>
    </>
  );
}
