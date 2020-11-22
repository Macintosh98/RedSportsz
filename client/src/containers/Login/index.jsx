import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { checkLoginDetails } from "../../actions";
import axios from "axios";
import {
  Button,
  CardImg,
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,Modal
} from "reactstrap";
import { Form } from "react-bootstrap";

import one from "../../assets/img/kisspng-liverpool-f-c-fujinon-xf-56mm-f1-2-r-football-pla-soccer-player-5a68fb3f489053.7406375815168295032972.png";
import two from "../../assets/img/kisspng-running-london-marathon-the-color-run-sport-5ae3e0ec20cd22.8534516715248836921344.png";
import three from "../../assets/img/kisspng-indian-premier-league-baseball-bat-cricket-vector-hand-painted-baseball-5a8b5d501e2a31.9417828915190828321236.png";

import { useHistory } from "react-router";

export default function Login({ checkLoginDetails, LoginDetails }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const [isSubmit, setIsSubmit] = useState();

  var history = useHistory();
  var validateMsgValid = (
    <div></div>
    // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
  );
  var validateMsgInvalid = (
    <Form.Control.Feedback type="invalid">
      Please provide a valid Input.
    </Form.Control.Feedback>
  );



  useEffect(() => {


    if (LoginDetails) {
      if (LoginDetails.valid_user) {
        localStorage.setItem("token", LoginDetails.token);
        localStorage.setItem("firstname", LoginDetails.data.first_name);
        localStorage.setItem("lastname", LoginDetails.data.last_name);
        localStorage.setItem("lastlogin", LoginDetails.data.last_login);
        localStorage.setItem("role", LoginDetails.data.role);
        localStorage.setItem("userid", LoginDetails.data.id);

        if (LoginDetails.data.role === "super_user") {
          history.push("/player-list");
        } else if (LoginDetails.data.role === "user") {
          history.push("/register-sport");
        }
        // else if(LoginDetails.data.role === 'bank_admin'){
        //     history.push("/customer-list");
        // }
      } else {
        setEmail("")
        setPassword("")
        NotificationModel("bg-danger", "Incorrect Credentials");
      }
    }
  }, [LoginDetails]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    if (e.currentTarget.checkValidity()) {
      checkLoginDetails({
        username: email,
        password: password,
      });
    }
  }

  const [cemail, setcemail] = useState("");
  const [cname, setcname] = useState(""); 
  const [cmessage, setcmessage] = useState("");

  function handleContact(e){
    e.preventDefault();
    const profiledata = new FormData();
    profiledata.append("cemail", cemail);
    profiledata.append("cname", cname);
    profiledata.append("cmessage", cmessage);
    axios
    .post(
      "http://localhost:3000/registereduserdetails/contact",
      profiledata,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": localStorage.getItem("token"),
        },
      }
    )
    .then(function (response) {
      console.log(response);
      if (response.data.status == 200) {
         NotificationModel("bg-success", response.data.msg);
         setcemail("");
         setcname("");
         setcmessage("");
      } else {
        NotificationModel("bg-danger", response.data.msg);
      }
      setIsSubmit(false);
    })
    .catch(function (error) {
      console.log(error);
      NotificationModel("bg-danger", "Server Error");
    });
  }

  const [Class, SetClass] = useState();
  const [Msg, SetMsg] = useState();
  const [Notification, SetNotification] = useState(false);
  const NotificationClose = () => SetNotification(false);
  const NotificationShow = () => SetNotification(true);
  function NotificationModel(Class, Msg) {
    SetClass(Class);
    SetMsg(Msg);
    NotificationShow();
    setTimeout(function () {
      NotificationClose();
    }, 5000);
  }


  return (
    <main>
            <Modal
        className="modal-dialog modal-danger"
        contentClassName={Class}
        isOpen={Notification}
        toggle={NotificationClose}
      >
        <div className="modal-header">
          <div className="mt-1 modal-title heading">{Msg}</div>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={NotificationClose}
          >
          </button>
        </div>
      </Modal>
      <div className="position-relative">
        {/* shape Hero */}
        <section className="section section-shaped pb-150">
          <div
            className="shape shape-style-1"
            style={{ "background-color": "#333333" }}
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <Card className="bg-secondary shadow border-0 mt-5 floating">
                    <CardHeader className="bg-white">
                      <div className="text-muted text-center">
                        <h2>Sign in with</h2>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form
                        noValidate
                        validated={isSubmit}
                        onSubmit={handleSubmit}
                        role="form"
                      >
                        <Form.Group className="mb-3">
                          <i className="ni ni-email-83" />
                          <Input
                            className="form-control-alternative"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                          />
                          {validateMsgValid}
                          {validateMsgInvalid}
                        </Form.Group>
                        <Form.Group>
                          <i className="ni ni-lock-circle-open" />
                          <Input
                            className="form-control-alternative"
                            required
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {validateMsgValid}
                          {validateMsgInvalid}
                        </Form.Group>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button className="my-4" color="danger" type="submit">
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a className="text-light" href="/#/forgot-password">
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/#/register">
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
                <Col lg="6">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={one}
                  />
                </Col>
              </Row>
            </div>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-dark" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        {/* 1st Hero Variation */}
      </div>

      <section className="section bg-dark">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid floating"
                src={two}
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h3 className="text-danger font-weight-bold">
                  WE ARE HERE NOT ONLY FOR ENTERTAINMENT, BUT ALSO FOR
                  BETTERMENT of SPORTS AND SPORTSMAN
                </h3>
                <hr />
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <h5 className="text-white mb-0 font-weight-light">
                        Xsportz is an online ‘fantasy games’ company of new era,
                        which not only makes sports ‘better’, for the fans by
                        enabling them to close interface, engagement with the
                        sports they love by online gaming. But it aims to give a
                        worldwide platform to ‘The Hidden jewels’ that are
                        spread all over the world.
                      </h5>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <h5 className="text-white mb-0 font-weight-light">
                        Having ‘passion’ for sports and possessing the ‘Talents,
                        genius and aspirations for striving for excellence in
                        their respective sports skills. dreaming and expecting
                        worldwide recognition and fame.
                      </h5>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <h5 className="text-white mb-0 font-weight-light">
                        We are here not only for entertainment and commerce, but
                        also for the betterment and good future of sports,
                        sportsmen. We possess so many innovative ideas with us
                        for future of the sports.
                      </h5>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section" style={{ "background-color": "#333333" }}>
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <Card className="bg-dark shadow border-0">
                <CardImg
                  alt="..."
                  src={three}
                  top
                />
                <blockquote className="card-blockquote">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-bg"
                    preserveAspectRatio="none"
                    viewBox="0 0 583 95"
                  >
                    <polygon
                      className="fill-default"
                      points="0,52 583,95 0,95"
                    />
                    <polygon
                      className="fill-default"
                      opacity=".2"
                      points="0,42 583,95 683,0 0,95"
                    />
                  </svg>
                  <h3 className="display-3 font-weight-bold text-danger mb-0">
                    OBJECTIVES OF SYSTEM
                  </h3>
                </blockquote>
              </Card>
            </Col>
            <Col md="6">
              <div className="pl-md-5">
                <hr />
                <h5 className="text-white mb-0 font-weight-light">
                  Xsports is based on the legally well recognized and accepted
                  principle of ‘mere game of skill’ by the Indian judiciary
                  also!
                </h5>
                <hr />
                <h5 className="text-white mb-0 font-weight-light">
                  Here you exercise your ‘skills’ by your experience and
                  knowledge and win money, rewards and prizes in return for
                  sure.​
                </h5>
                <hr />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="section bg-dark">
        <Container>
          <Row className="justify-content-center text-center mb-md">
            <Col lg="8">
              <h2 className="display-3 text-danger mb-0 font-weight-bold">
                OUR PARTNERS
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/1.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/2.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/3.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/4.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/5.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/6.png")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/7.png")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/8.png")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/9.png")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/10.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/11.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col className="mb-5 mb-lg-0" lg="2" md="4">
              <div className="px-4">
                <img
                  alt="..."
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  src={require("../../assets/img/partners/12.jpg")}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <section className="section bg-gradient-default pb-300">

            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section> */}
      <section
        id="contact"
        className="section section section-contact-us"
        style={{ "background-color": "#333333" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <h4>Want to contact us?</h4>
                  <Form onSubmit={handleContact}>
                  <Form.Group>
                    <i className="ni ni-user-run" />
                    <Input
                      className="form-control-alternative"
                      placeholder="Your name"
                      type="text"
                      value={cname}
                      onChange={(e) => setcname(e.target.value)}
                      required
                    />
                    {validateMsgValid}
                    {validateMsgInvalid}
                  </Form.Group>
                  <Form.Group>
                    <i className="ni ni-email-83" />
                    <Input
                      className="form-control-alternative"
                      placeholder="Email address"
                      type="email"
                      value={cemail}
                      onChange={(e) => setcemail(e.target.value)}
                      required
                    />
                    {validateMsgValid}
                    {validateMsgInvalid}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Input
                      className="form-control-alternative"
                      cols="80"
                      name="name"
                      placeholder="Type a message..."
                      rows="4"
                      type="textarea"
                      value={cmessage}
                      onChange={(e) => setcmessage(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div>
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      size="lg"
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-dark" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
    </main>
  );
}

const mapDispatchToProps = {
  checkLoginDetails: checkLoginDetails,
};

const mapStateToProps = (state) => ({
  LoginDetails: state.loginDetails,
});

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
