import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Modal from "./Modal";
import gloablToken from "../gloablToken";

const Repository = ({ repo }) => {
  const { slug, userpath } = useParams();
  const [detailRepo, setDetailRepo] = useState([]);
  const [tags, setTags] = useState();
  const [issues, setIssues] = useState();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();

  useEffect(() => {
    const getRepo = repo && repo.filter((f) => f.name === slug);
    setDetailRepo(getRepo);

    const getTags = async () => {
      await fetch(`https://api.github.com/repos/${userpath}/${slug}/labels`, {
        method: "GET",
        headers: {
          Authorization: `token ${gloablToken}`,
        },
      })
        .then((resp) => resp.status === 200 && resp.json())
        .then((data) => {
          setTags(data);
        });
    };
    if (slug) {
        getTags();
    }

    const getIssues = async () => {
      await fetch(`https://api.github.com/repos/${userpath}/${slug}/issues`, {
        method: "GET",
        headers: {
          Authorization: `token ${gloablToken}`,
        },
      })
        .then((resp) => resp.status === 200 && resp.json())
        .then((data) => {
          setIssues(data);
        });
    };
    if (repo) {
        getIssues();
    }
  }, [slug]);

  const handleClick = (i) => {
    setOpen(!open);
    setInfo(i)
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {detailRepo &&
        detailRepo.map((m, index) => (
          <div className="box m-3" key={index}>
            <h3 className="title is-3">{m.name}</h3>
            <p>Fecha de creación</p>
            <h6 className="subtitle is-6">
              {moment(m.created_at).format("lll")}
            </h6>
            <p>Última actualización</p>
            <h6 className="subtitle is-6">
              {moment(m.updated_at).format("lll")}
            </h6>
            {tags &&
              tags.map((t, tIndex) => (
                <span key={tIndex} className="tag is-info is-small m-1">
                  {t.name}
                </span>
              ))}
            
            {issues && (
              <>
                <h3>Issues</h3>
                <ul>
                {issues.map((i, index) => (
                    <div className="box" key={index}>
                    <li style={{ display: "flex", flexDirection: "column" }}>
                      <h5 className="title is-5 mr-2">{i.title}
                      {i.pull_request ? (
                        <span className="tag ml-2 is-info is-small">Pull Request</span>
                      ) : (
                        <span className="tag ml-2 is-primary is-small">Issue</span>
                      )}
                      </h5>
                      <small className="small-description">{i.body}</small>
                    </li>
                    <div>
                      <button className="button is-info is-outlined my-3" onClick={() => handleClick(i)}>Ver info</button>
                      </div>
                      {open && (
                        <Modal i={info} slug={`${userpath}/${slug}`} close={() => handleClose()}/>
                      )}
                    </div>
                ))}
                </ul>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Repository;
