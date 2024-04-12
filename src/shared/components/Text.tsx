import { Colors } from "@shared/constants";
import { FontVariant } from "@shared/types";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface TextProps
  extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  variant?: FontVariant;
  color?: string;
}

const Text = ({
  variant = "Body1",
  color = Colors.Black400,
  children,
  ...props
}: TextProps) => {
  switch (variant) {
    case "H1":
      return (
        <H1 color={color} {...props}>
          {children}
        </H1>
      );
    case "H2":
      return (
        <H2 color={color} {...props}>
          {children}
        </H2>
      );
    case "H3":
      return (
        <H3 color={color} {...props}>
          {children}
        </H3>
      );
    case "H4":
      return (
        <H4 color={color} {...props}>
          {children}
        </H4>
      );
    case "Body1":
      return (
        <Body1 color={color} {...props}>
          {children}
        </Body1>
      );
    case "Body2":
      return (
        <Body2 color={color} {...props}>
          {children}
        </Body2>
      );
    case "Body3":
      return (
        <Body3 color={color} {...props}>
          {children}
        </Body3>
      );
    case "Body4":
      return (
        <Body4 color={color} {...props}>
          {children}
        </Body4>
      );
  }
};

const H1 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const H2 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const H3 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const H4 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const Body1 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const Body2 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const Body3 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

const Body4 = styled.h1<TextProps>`
  ${({ variant }) => variant}
`;

export default Text;