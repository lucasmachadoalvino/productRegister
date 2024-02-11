import Styled from 'styled-components/native';

export const Container = Styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = Styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.space.default}px;
  flex-direction: row;
`;

export const TitleContainer = Styled.View`
  flex: 1;
  align-items: center;
`;

export const Content = Styled.View`
  padding: ${({ theme }) => theme.space.default}px;
`;

export const SwitchContainer = Styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.default}px;
`;
