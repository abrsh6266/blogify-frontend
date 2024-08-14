import React from "react";
import Swal from "sweetalert2";

const errorMsg = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message,
  });
};

export default errorMsg;
