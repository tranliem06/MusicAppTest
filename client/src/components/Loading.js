import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <InfinitySpin width="200" color="#4285f4" heigth={100} />
    </div>
  );
};

export default Loading;
