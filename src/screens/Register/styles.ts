import Styled from 'styled-components/native';

export const Container = Styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
`;

export const Content = Styled.View`
  padding: 0 ${({ theme }) => theme.space.large}px;
  align-items: center;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.space.extraLarge}px;
`;

export const InputContent = Styled.View`
 padding: 0 ${({ theme }) => theme.space.large}px;
`;
