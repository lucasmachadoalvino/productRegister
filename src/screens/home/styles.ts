import Styled from 'styled-components/native';

export const Container = Styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Content = Styled.View`
  padding: ${({ theme }) => theme.space.default}px;

`;

export const Header = Styled(Content)`
  flex-direction: row;
  align-items: center;
`;

export const ConfigButton = Styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.space.default}px;
`;

export const InputContainer = Styled.View`
  flex: 1
`;
