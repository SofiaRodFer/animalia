import styled from 'styled-components/native';

export const Container = styled.View`
    width: 80%;

    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    margin-top: 20px;
`;

export const ImageContainer = styled.View``;

export const Image = styled.Image`
    width: 120px;
    height: 120px;

    border-bottom-left-radius: 23px;
    border-top-left-radius: 23px;
    border-top-right-radius: 13px;
`;

export const TextContainer = styled.View`
    height: 85%;

    background-color: ${({ theme }) => theme.colors.shape};
    box-shadow: 10px 10px ${({ theme }) => theme.colors.shadow};

    flex-direction: row;
    align-items: flex-end;

    padding-right: 10px;

    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
`;

export const InfoContainer = styled.View`
    width: 145px;

    margin-left: 15px;
    margin-bottom: 10px;    
`;

export const Nome = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 18px;
    color: ${({ theme }) => theme.colors.title};

    flex-wrap: wrap;
`;

export const Info = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 14px;
    color: ${({ theme }) => theme.colors.title};
`;