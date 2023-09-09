import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Wrap } from './Loader.styled';

export const Loader = () => (
  <Wrap>
    <Oval
      height={100}
      width={100}
      color="#3f51b5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#3f51b5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </Wrap>
);

// export default Loader;
