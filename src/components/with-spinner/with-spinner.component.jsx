import React from "react";

import { SpinnerContainer } from "./with-spinner.styles";
import { SpinnerOverlay } from "./with-spinner.styles";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
