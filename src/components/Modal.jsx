import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gloablToken from "../gloablToken";

const Modal = ({ i, close, slug }) => {
  const [comments, setComments] = useState();
  useEffect(() => {
    const getUser = async () => {
      await fetch(
        `https://api.github.com/repos/${slug}/issues/${i.number}/comments`,
        {
          method: "GET",
          headers: { Authorization: `token ${gloablToken}` },
        }
      )
        .then((resp) => resp.status === 200 && resp.json())
        .then((data) => {
          setComments(data);
        });
    };
    getUser();
  }, [slug]);
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h1 className="title">{i.title}</h1>
        <ReactMarkdown>{i.body}</ReactMarkdown>
        <hr />
        {comments && (
          <>
            <h2 className="title">Comentarios</h2>
            <ul>
              {comments.map((c, index) => (
                <div key={index}>
                  <li>{c.body}</li>
                  {moment(c.created_at).format("llll")}
                  <div>
                    <small>{c.author_association}</small>
                  </div>
                  <hr className="mb-3" />
                </div>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        onClick={close}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
