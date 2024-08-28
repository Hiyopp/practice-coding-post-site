import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { postLogin } from "src/apis/auth";

type joinPayloadType = {
  nickname: string | undefined;
  email: string | undefined;
  password: string | undefined;
  reCheckPw: string | undefined;
};

type loginPayloadType = {
  email: string | undefined;
  password: string | undefined;
};

type PayloadContextType = {
  joinPayload: joinPayloadType;
  joinMutate: UseMutationResult<unknown, unknown, void, unknown>;
  loginPayload: loginPayloadType;
};

const PayloadContext = createContext<PayloadContextType | undefined>(undefined);

export const usePayload = (): PayloadContextType => {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};

export const PayloadProvider = ({ children }: { children: ReactNode }) => {
  const joinPayload: joinPayloadType = {
    nickname: undefined,
    email: undefined,
    password: undefined,
    reCheckPw: undefined,
  };
  const joinMutate = useMutation({
    mutationFn: () => postLogin(joinPayload),

    onSuccess: () => {
      alert("성공적으로 가입되었습니다.");

      window.location.replace("/login");
    },
    onError: (error: unknown) => {
      alert(`가입에 실패했습니다. ${error}`);
    },
  });
  const loginPayload: loginPayloadType = {
    email: undefined,
    password: undefined,
  };

  return (
    <PayloadContext.Provider
      value={{
        joinPayload,
        joinMutate,
        loginPayload,
      }}
    >
      {children}
    </PayloadContext.Provider>
  );
};
