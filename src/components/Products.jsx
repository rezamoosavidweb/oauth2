import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Posts = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          //   audience: "Rezamoosavi.kntu@gmail.com",
          //   scope: "see:products",
          //   issuer: "https://dev-fz-a0xlh.us.auth0.com/",
        });
        console.log(token);
        const response = await axios.get("http://localhost:8080/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setPosts(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post}</li>;
      })}
    </ul>
  );
};

export default Posts;
