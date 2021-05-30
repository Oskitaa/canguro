import { useEffect, useState } from "react";
import { db } from "/firebase/client";
import { Edad } from "/components/utils/utils";

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const feeds = [];
    db.collection("users")
      .get()
      .then(({ docs }) => {
        docs.forEach((docs) => {
          feeds.push(docs.data());
        });
        setFeed(feeds);
      });
  }, []);

  return (
    <>
      <h1>Feed</h1>
      {feed.map((e) => {
        return (
          <div className="feed-container">
            <div className="feed-foto">
              <img src={e.photoURL} alt="Foto de perfil" />
            </div>
            <div className="feed-info">
              <p className="feed-nombre">
                <strong>
                  {e.nombre} - {Edad(e.fecha_nacimiento)}
                </strong>
              </p>
              <p>{e?.descripcion}</p>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .feed-container {
          display: flex;
          border-bottom: 1px solid red;
          padding: 20px;
          font-size: 1em;
        }
        img {
          height: 200px;
          width: 200px;
          border-radius: 10px;
        }
        .feed-nombre {
          font-size: 1.3em;
        }
        .feed-info {
          margin-left: 2%;
        }
      `}</style>
    </>
  );
}
