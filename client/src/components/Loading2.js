import React from "react";
import { Bars } from "react-loader-spinner";

const Loading2 = () => {
  return (
    <div>
      <Bars
        height="80"
        width="80"
        color="#4285f4"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading2;
