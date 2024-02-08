import Styled from 'styled-components/native';

export const Container = Styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
  text-align: center;  
`;

export const Content = Styled.View`
  padding: 0 20px;
  align-items: center;
  border: solid 1px blue;
  aling-self: center;

`;

export const InputContent = Styled.View`
  padding: 0 20px;

  border: solid 1px red;  
`;
