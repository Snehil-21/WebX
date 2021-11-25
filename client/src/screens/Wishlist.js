import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import * as authActions from "../../src/store/actions/Auth";
import * as productActions from "../../src/store/actions/Product";
import { WishlistCard } from "../components/Customer/WishlistCard";

export default function Wishlist() {
  const history = useHistory();
  const { addToast } = useToasts();
  const customerEmail = useSelector((state) => state.Auth.email);
  const customerName = useSelector((state) => state.Auth.fullName);
  const dispatch = useDispatch();
  const WishlistItems = useSelector(
    (state) => state.Product.wishlistProductsList
  );

  useEffect(() => {
    async function getProducts() {
      await dispatch(productActions.getWishlistProducts(customerEmail));
    }
    getProducts();
  }, [dispatch, customerEmail]);

  const final = WishlistItems[0].wishlist;
  var amount = 0;
  //   console.log(final);
  final.map((item) => {
    return (amount += parseInt(item.productPrice));
  });

  const handleLogout = async () => {
    try {
      await dispatch(authActions.logout());
      history.replace("/login");
    } catch (error) {
      addToast("Something went wrong!", { appearance: "error" });
    }
  };

  return (
    <>
      <Wrapper>
        <Header>
          <h4>WebX</h4>
          <div>
            <Link
              style={{
                marginRight: "16px",
                textDecoration: "none",
                color: "#000",
              }}
              to="/home"
            >
              <span>Home</span>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/wishlist"
            >
              <span>Cart</span>
            </Link>
          </div>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Header>
        <h2
          style={{
            display: "flex",
            alignItems: "flex-start",
            margin: "8px 20%",
            color: "#31230B",
          }}
        >
          Shopping Cart
        </h2>
        <Main>
          <Left>
            <h3>
              Logged In as <p>{customerName}</p>
            </h3>
            <h6>SHIPPING DETAILS</h6>
          </Left>
          <Right>
            <h4>Your Items</h4>
            <Rule />
            {final.map((item) => {
              return (
                <>
                  <WishlistCard
                    name={item.productTitle}
                    price={item.productPrice}
                    pic={item.productPic}
                  />
                  <Rule />
                </>
              );
            })}
            <h4>Amount: ₹{amount}</h4>
            <Rule />
          </Right>
        </Main>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #f7f7f7;
  border-radius: 20px;
`;

const Header = styled.div`
  margin: 0 4% 1% 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #000;
  z-index: 2;
  top: 0;

  > h4 {
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  > div {
    font-weight: 600;
  }

  > div > button {
    color: brown;
  }
`;

const Main = styled.div`
  display: flex;
  margin: 2% 16%;
  background: linear-gradient(to bottom right, #fcfcfc, #fbedef, #fceef0);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 16px;
  margin-right: 16px;
  > h3 > p {
    display: inline;
    color: gray;
    text-transform: uppercase;
  }
`;

const Right = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  background-color: #fbfbfb;
`;

const Rule = styled.hr`
  height: 2px;
  color: #ebebeb;
  border: none;
  border-radius: 25px;
  width: 80%;
  align-items: center;
  background-color: #ebebeb;
`;
