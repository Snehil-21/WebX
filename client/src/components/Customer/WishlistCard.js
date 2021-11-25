import React from "react";
import styled from "styled-components";
import { Image } from "cloudinary-react";

export const WishlistCard = ({ name, price, pic }) => {
  return (
    <Card>
      <Image
        style={{ minHeight: "10%", width: "25%", borderRadius: "25px" }}
        cloudName="cloudSnehil"
        publicId={`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${pic}`}
      />
      <Details>
        <h6>{name}</h6>
        <p>₹{price}</p>
      </Details>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 36px;
`;
