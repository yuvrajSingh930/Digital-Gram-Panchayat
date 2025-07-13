import React from "react";
import AllServices_Comp from "../../Services/AllServices/AllServices_Comp";

const ManageApplication_Comp = () => {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "20px",
          color: "black",
        }}
      >
        <span
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "serif",
            fontStyle: "italic",
          }}
        >
          Hello Staff
        </span>
        <br />
        You can manage all applications, Status of user-submitted forms,
      </h2>
      <AllServices_Comp />
    </>
  );
};

export default ManageApplication_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
