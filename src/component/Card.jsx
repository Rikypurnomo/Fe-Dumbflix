import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { FaPlay } from 'react-icons/fa';

export default function Card() {
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin]=useState(false);

  // Fetching Film data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  let asceding = [];
  if (films !== undefined) {
    asceding = [...films];
    asceding.sort((a, b) => b.id - a.id);
  }
  console.log("p")
  return (
    <>
      <Container className="">
            <>
             <div className="mt-5">
              <h3 className="fw-bold text-light">Film</h3>
             </div>
                <div className="d-flex justify-content-start gap-3">
                  {asceding?.map((item) => {
                    return (
                      <NavLink to={`/detail/${item.id}`} className="text-decoration-none">
                        <div className="d-flex justify-content-start gap-4">
                          <div key={item.id} className="mt-2 mb-5 rounded" style={{ width: "200px" }}>
                          <div style={{ position: "relative" }}>
                            <img className="rounded" src={`${item.thumbnailfilm}`}width="200px" height="300px"
                                style={{ objectFit: "cover" }} alt="Card" />
                                <div style={{ position: "absolute",top: "50%",left: "50%", transform: "translate(-50%, -50%)" }}>
                                  <FaPlay style={{ fontSize:"40px", color:"white"}} />
                                  </div>
                            </div>

                                <h5 className="fw-bold text-light mt-3">{item.title}</h5>
                                <p className="text-light">{item.year}</p>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
            </>
      </Container>
    </>
  );
}
