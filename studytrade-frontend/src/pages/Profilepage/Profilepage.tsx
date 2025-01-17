import React, { useEffect, useState } from "react";
import Favorites from "./Components/Favorites";
import YourProduct from "./Components/YourProduct";
import Info from "./Components/Info";
import { Product } from "../../interfaces/Product";
import { AuthUser } from "../../interfaces/AuthUser";

interface ProfilepageProps {
  homepageClick?: () => void;
}

function Profilepage({ homepageClick }: ProfilepageProps) {
  const [activeButton, setActiveButton] = useState<string>("activity");
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [created, setCreated] = useState<Product[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser>();

  const fetchAuthUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/667c20e305a1ca273ca4e305`
      );
      const data = await response.json();
      setAuthUser(data);
      setFavorites(data.favorites);
      setCreated(data.createdProducts);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const deleteProduct = async (_id: string) => {
    if (
      authUser &&
      authUser.createdProducts &&
      authUser.createdProducts.length > 0
    ) {
      try {
        console.log(_id);
        const response = await fetch(
          `http://localhost:8080/api/v1/products/${_id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchAuthUser();
        } else {
          console.error("Error deleting product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting products:", error);
      }
    } else {
      console.error("Error deleting products: No created products found.");
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Large image above */}
      <div className="relative w-full sm:h-80 h-44">
        <div
          className="absolute inset-0 bg-fixed sm:bg-cover sm:bg-center bg-right-bottom"
          style={{ backgroundImage: "url(./images/hdm_picture2.jpg)" }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

        {/* Profile picture */}
        <div className="absolute sm:top-80 top-44 sm:left-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/images/womanProfile.png"
            alt=""
            className="w-[150px] h-[150px] rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile names */}
      <div className="sm:ml-96 flex justify-center sm:justify-start sm:pt-2 pt-20">
        <div className="flex flex-col">
          <span className="text-black font-bold text-[23px] leading-6">
            {authUser?.username}
          </span>
          {/*<span className="text-gray-400 text-[19px]">@hansi</span>*/}
        </div>
      </div>

      {/* info button */}
      <div className="relative">
        <div className="absolute sm:top-10 top-12 right-0 sm:bottom-20 flex justify-end items-center">
          <button
            className={`text-black sm:w-64 w-52 sm:h-36 h-28 hover:bg-gray-200 active:bg-gray-300 ${
              activeButton === "info" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveButton("info")}
          >
            <div className="mt-6 leading-3">
              <i className="bi bi-info-circle text-gray-500 sm:text-[40px] text-[35px]"></i>
            </div>
            <div className="">
              <span className="text-gray-400 sm:text-[21px] text-[19px]">
                Info
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* activity button */}
      <div className="relative">
        <div className="absolute sm:top-10 top-12 sm:right-64 sm:bottom-20 flex justify-end items-center">
          <button
            className={`text-black sm:w-64 w-52 sm:h-36 h-28 hover:bg-gray-200 active:bg-gray-300 ${
              activeButton === "activity" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveButton("activity")}
          >
            <div className="mt-6 leading-3">
              <i className="bi bi-bag text-gray-500 sm:text-[40px] text-[35px]"></i>
            </div>
            <div className="">
              <span className="text-gray-400 sm:text-[21px] text-[19px]">
                Activity
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Indented gray strip */}
      <div className="relative w-full h-6 sm:mt-28 mt-40 bg-gray-200">
        <div className="absolute inset-0 bg-gray-200 shadow-inner"></div>
      </div>

      {activeButton === "info" ? (
        <Info />
      ) : (
        <>
          <Favorites
            deleteProduct={deleteProduct}
            favorites={favorites}
          ></Favorites>
          <YourProduct
            deleteProduct={deleteProduct}
            created={created}
          ></YourProduct>
        </>
      )}
    </div>
  );
}

export default Profilepage;
