import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <footer className="bg-dark footer">
        <Container>
          <Row className=" row-grid align-items-center mb-5">
            <Col lg="6">
              <h3 className=" text-danger font-weight-bold mb-2">
                Thank you for supporting us!
              </h3>
              <h4 className="text-white mb-0 font-weight-light">
                Let's get in touch on any of these platforms.
              </h4>
            </Col>
            <Col className="text-lg-center btn-wrapper" lg="6">
              <Button
                className="btn-icon-only rounded-circle"
                color="twitter"
                href="#"
                id="tooltip475038074"
                target="_blank"
              >
                <img height="20" width="20" src={require("../../assets/img/s2.png")}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip475038074">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="facebook"
                href="#"
                id="tooltip837440414"
                target="_blank"
              >
                <img height="20" width="20" src={require("../../assets/img/s1.png")}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip837440414">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="dribbble"
                href="#"
                id="tooltip829810202"
                target="_blank"
              >
                <img height="20" width="20" src={require("../../assets/img/s3.png")}/>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip829810202">
                Follow us
              </UncontrolledTooltip>
            </Col>
          </Row>
          <hr />
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://abhishekzambare.herokuapp.com"
                  target="_blank"
                >
                  Red Sportsz
                </a>
                .
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default SimpleFooter;
