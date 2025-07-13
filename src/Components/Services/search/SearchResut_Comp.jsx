import React from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { filteredCards } = location.state || { filteredCards: [] };

  return (
    <div className="setUpCard">
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <Card key={index} className="cardMain">
            <Card.Img variant="top" src={card.imgSrc} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <Button variant="primary" as={Link} to={card.link}>
                Apply Now
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
