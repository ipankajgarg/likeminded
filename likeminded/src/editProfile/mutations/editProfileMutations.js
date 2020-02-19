import {gql} from 'apollo-boost';

export const updateCoverImage = gql`
  mutation UpdateCoverImage($id: ID!, $image: String!) {
    updateCoverImage(id: $id, image: $image) {
      message
      statusCode
    }
  }
`;

export const updateProfileImage = gql`
  mutation UpdateProfileImage($id: ID!, $image: String!) {
    updateProfileImage(id: $id, image: $image) {
      message
      statusCode
    }
  }
`;
