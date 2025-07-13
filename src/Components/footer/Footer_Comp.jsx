import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer_Comp = () => {
  return (
    <footer className="footer bg-dark text-white pt-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>About Us</h5>
            <p>
              Digital E Gram Panchayat aims to streamline and improve the
              delivery of citizen services in the village. Our platform enables
              users to apply for various gram panchayat services online and
              track their application progress, ensuring transparency and
              efficiency.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope mr-2"></i>Email:
                support@egrampanchayat.com
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i>Phone: +123 456 7890
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>Address: 456
                Village Road, Village City, VC 67890
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled justify-content-center">
              <li className="mr-3">
                <a
                  href="https://www.facebook.com"
                  className="text-white"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="https://www.twitter.com"
                  className="text-white"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="https://www.instagram.com"
                  className="text-white"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <p>&copy; 2024 Digital E Gram Panchayat. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
