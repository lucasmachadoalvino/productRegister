import Styled from 'styled-components/native';

export const Container = Styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
`;
