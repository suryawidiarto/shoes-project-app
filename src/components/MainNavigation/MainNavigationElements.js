import styled from "styled-components";

export const SideCartIcon = styled.div`
  position: absolute;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  top: 24px;
  display: ${({ $isLogin }) => ($isLogin ? `block` : `none`)};
  right: ${({ $isLogin }) => $isLogin && `100px`};

  &:hover {
    color: #ff7800;
  }
`;

export const LoginButton = styled.div`
  display: ${({ $isLogin }) => ($isLogin ? `none` : `block`)};
  visibility: ${({ $isLogin }) => ($isLogin ? `hidden` : `false`)};
  opacity: ${({ $isLogin }) => ($isLogin ? 0 : 1)};
  margin-right: 2rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  margin-right: 2rem;
  background-color: #ff7800;
  height: 30px;
  padding: 10px;
  border-radius: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f90716;
  }

  .nav-btn-link {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    &:hover {
      color: #fff;
    }
  }
`;

export const DropdownMenu = styled.div`
  display: ${({ $isLogin }) => ($isLogin ? `block` : `none`)};
  visibility: ${({ $isLogin }) => ($isLogin ? `visible` : `hidden`)};
  opacity: ${({ $isLogin }) => ($isLogin ? 1 : 0)};
  margin-right: 2rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  .main-nav-avatar {
    @media screen and (max-width: 380px) {
      margin: 0;
      padding: 0;
      position: absolute;
      right: 30px;
      top: 14px;
    }
  }
`;

export const DropdownList = styled.div`
  visibility: ${({ $isOpen }) => ($isOpen ? `visible` : `hidden`)};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  position: absolute;
  right: 75px;
  top: 30px;
  transition: 0.5s ease-in-out;
  z-index: 5;

  .menu-list {
    @media screen and (max-width: 760px) {
      font-size: 14px;
    }
  }
`;

export const DropdownMenuAdmin = styled.div`
  display: ${({ $isAdmin }) => ($isAdmin ? `block` : `none`)};
  visibility: ${({ $isAdmin }) => ($isAdmin ? `visible` : `hidden`)};
  opacity: ${({ $isAdmin }) => ($isAdmin ? 1 : 0)};
  margin-right: 2rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;
`;

export const DropdownListAdmin = styled.div`
  visibility: ${({ $isOpen }) => ($isOpen ? `visible` : `hidden`)};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  position: absolute;
  left: 250px;
  top: 50px;
  transition: 0.5s ease-in-out;
  z-index: 5;

  @media screen and (max-width: 450px) {
    left: 33px;
    top: 50px;
  }

  .menu-list {
    @media screen and (max-width: 760px) {
      font-size: 14px;
    }
  }
`;
