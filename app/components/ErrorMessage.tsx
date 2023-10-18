import React, { ReactNode, PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";
const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return false;
  return (
    <Text className="text-red-500" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
