import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

const CardA = ({ name, count, link }) => {
  return (
    <Card style={{ width: "11rem", float: "left", margin: "30px 10px" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{count}</Card.Text>
        <Button
          onClick={() => {
            console.log("form button");

            window.location = link;
          }}
          variant="primary"
        >
          view
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardA;
