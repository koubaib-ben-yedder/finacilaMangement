import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../css/home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="home-description">
        The is app is created for help professional or ordinay user who whant
        just to manage her finacail buisness behaviour add we have many plane
        for different people needs
      </div>
      <div>
        <CardGroup>
          <Card>
            <Card.Header>Basic</Card.Header>
            <Card.Body>
              <Card.Text>
                <li>income store</li>

                <li>factor store</li>

                <li>client store</li>
              </Card.Text>
              <Card.Text>10 € </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Intermedia</Card.Header>
            <Card.Body>
              <Card.Text>
                <li>income store</li>

                <li>factor store</li>

                <li>client store</li>

                <li>income classification depend of time</li>

                <li>factor classification depend of time</li>

                <li>statistique </li>
              </Card.Text>
              <Card.Text>50 €</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Expert</Card.Header>
            <Card.Body>
              <Card.Text>
                <li>income store</li>

                <li>factor store</li>

                <li>client store</li>

                <li>income classification depend of time </li>

                <li>factor classification depend of time</li>

                <li>statistique </li>

                <li>support </li>
              </Card.Text>
              <Card.Text>200 €</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

export default Home;
