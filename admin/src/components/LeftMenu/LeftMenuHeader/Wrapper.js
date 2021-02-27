import styled from "styled-components";
import PropTypes from "prop-types";

import Logo from "../../../assets/images/logoGTA.png";

const Wrapper = styled.div`
  background-color: #ffffff;
  height: ${(props) => props.theme.main.sizes.leftMenu.height};

  .projectName {
    display: block;
    width: 100%;
    height: ${(props) => props.theme.main.sizes.leftMenu.height};

    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 14rem;
  }
`;

export default Wrapper;
