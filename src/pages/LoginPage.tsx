import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { usePayload } from "./PayloadContext";

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: "Ownglyph_meetme-Rg";
`;

const InputBox = styled.div`
  width: 300px;
  height: 270px;
  box-shadow: 0 0 10px #d6d6d6;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 70%;
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;

  border: none;
  border-radius: 5px;
  outline: 0;

  &::placeholder {
    color: #bebebe;
  }
`;

const SubmitWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 110px;
  background: white;

  font-weight: bold;
  font-size: 20px;
  font-family: "Ownglyph_meetme-Rg";

  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export function LoginPage() {
  const navigate = useNavigate();
  const { loginPayload } = usePayload();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") loginPayload.email = e.target.value;
    else if (e.target.name === "password")
      loginPayload.password = e.target.value;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      console.log(loginPayload.email, loginPayload.password);
  };

  const toJoinPage = () => {
    navigate("/join");
  };

  return (
    <HomeWrapper>
      <InputBox>
        <Title>Postry</Title>
        <StyledInput
          type="email"
          placeholder="email"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          name="email"
        />
        <StyledInput
          type="password"
          placeholder="password"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          name="password"
        />
        <SubmitWrapper>
          <SubmitButton>로그인</SubmitButton>
          <SubmitButton onClick={toJoinPage}>회원가입</SubmitButton>
        </SubmitWrapper>
      </InputBox>
    </HomeWrapper>
  );
}
