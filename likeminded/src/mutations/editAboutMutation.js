import {gql} from 'apollo-boost';

export const updateAboutMe = gql`
  mutation UpdateAboutMe($id: ID!, $about: String!) {
    updateAboutMe(id: $id, about: $about) {
      message
      statusCode
    }
  }
`;
