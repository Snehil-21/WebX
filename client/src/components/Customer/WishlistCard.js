import React from "react";
import styled from "styled-components";
import { Image } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Product";

export const WishlistCard = ({ id, name, price, pic }) => {
  const dispatch = useDispatch();
  const customerEmail = useSelector((state) => state.Auth.email);

  const handleClick = async () => {
    await dispatch(productActions.removeWishlistProduct(customerEmail, id));
  };

  return (
    <Wrapper>
      <Card>
        <Image
          style={{ minHeight: "10%", width: "25%", borderRadius: "25px" }}
          cloudName="cloudSnehil"
          publicId={`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${pic}`}
        />
        <Details>
          <h6>{name}</h6>
          <p>Rs. {price}</p>
        </Details>
      </Card>
      <RemoveButton onClick={handleClick}>Remove</RemoveButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  font-size: 12px;
  width: 20%;
  background: transparent;
  border: 1px solid beige;
  border-radius: 12px;
  background: salmon;
`;

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
