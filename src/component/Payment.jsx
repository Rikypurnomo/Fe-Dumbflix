import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();
  const [formPayment, setFormPayment] = useState({});

  const handleChange = (e) => {
    setFormPayment({
      ...formPayment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (data) => {
    try {


      const response = await API.post("/transaction", data);
      console.log("success : ", response.data.data.token);
      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          console.log(result);
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed: ", error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
 <Container>
        <Row>
          <Col className="mt-5 pt-5" style={{ textAlign: "center" }}>
          <h1 className="mt-5 mb-4 text-white fw-bold" style={{ fontSize: "48px", letterSpacing: "2px" }}>Premium </h1>

          <p className="text-white fs-5" style={{ lineHeight: "2", maxWidth: "500px", margin: "0 auto" }}>
            Bayar Sekarang dan Nikmati streaming film-film yang kekinian dari{" "}
            <span className="fw-bold" style={{ color: "#E50914" }}> DUMBFLIX </span>
          </p>

          <p style={{ marginTop: "20px", marginBottom: "0" }}>
            <span className="fw-bold fs-5" style={{ color: "#E50914" }}>
              DUMBFLIX :{" "}
            </span>
            <span className="fw-bold text-white fs-5">0981119181</span>
          </p>
          </Col>
          </Row>
          <Row className="w-20 m-auto" style={{ marginTop: "50px" }}>
        <Col md={3} sm={6} xs={12}>
          <Card className="py-2 bg-black border" style={{borderRadius:"10px"}}>
            <Card.Body className="text-light m-auto ">
              <Card.Title className="text-success" style={{ fontSize: "36px", fontWeight: "bold" }}>30K  <FaBell className="text-danger"/></Card.Title>
              <Card.Text style={{ fontSize: "18px", fontWeight: "bold" }}>1 Month</Card.Text>
              <Card.Text>1 bulan Premium, Rp30.000.</Card.Text>
              <Card.Text type="submit"
            onClick={() => handleSubmit.mutate({ price: 30000, days: 30 })} className="text-white text-center py-2 bg-danger" style={{ borderRadius: "20px", cursor: "pointer" }} > <FaPlayCircle/>Langganan</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <Card className="py-2 bg-black border" style={{borderRadius:"10px"}}>
            <Card.Body className="text-light m-auto ">
              <Card.Title className="text-success" style={{ fontSize: "36px", fontWeight: "bold" }}>80K  <FaBell className="text-danger"/></Card.Title>
              <Card.Text style={{ fontSize: "18px", fontWeight: "bold" }}>3 Month</Card.Text>
              <Card.Text>3 bulan Premium, Rp80.000.</Card.Text>
              <Card.Text type="submit"
            onClick={() => handleSubmit.mutate({ price: 30000, days: 30 })} className="text-white text-center py-2 bg-danger" style={{ borderRadius: "20px", cursor: "pointer" }} > <FaPlayCircle/>Langganan</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <Card className="py-2 bg-black border" style={{borderRadius:"10px"}}>
            <Card.Body className="text-light m-auto ">
              <Card.Title className="text-success" style={{ fontSize: "36px", fontWeight: "bold" }}>150K  <FaBell className="text-danger"/></Card.Title>
              <Card.Text style={{ fontSize: "18px", fontWeight: "bold" }}>6 Month</Card.Text>
              <Card.Text>6 bulan Premium, Rp150.000.</Card.Text>
              <Card.Text type="submit"
            onClick={() => handleSubmit.mutate({ price: 30000, days: 30 })} className="text-white text-center py-2 bg-danger" style={{ borderRadius: "20px", cursor: "pointer" }} > <FaPlayCircle/>Langganan</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <Card className="py-2 bg-transparent border" style={{borderRadius:"10px"}}>
            <Card.Body className="text-light m-auto ">
              <Card.Title className="text-success" style={{ fontSize: "36px", fontWeight: "bold" }}>300K  <FaBell className="text-danger"/></Card.Title>
              <Card.Text style={{ fontSize: "18px", fontWeight: "bold" }}>12 Month</Card.Text>
              <Card.Text>12 bulan Premium, Rp300.000.</Card.Text>
              <Card.Text type="submit"
            onClick={() => handleSubmit.mutate({ price: 30000, days: 30 })} className="text-white text-center py-2 bg-danger" style={{ borderRadius: "20px", cursor: "pointer" }} > <FaPlayCircle/>Langganan</Card.Text>
            </Card.Body>
          </Card>
        </Col>
    
      </Row>
           
      </Container>
    </>
  );
}
