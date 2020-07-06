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

export const likeBack = gql`
  mutation LikeBack($id: ID!, $crushId: ID!) {
    likeBack(id: $id, crushId: $crushId) {
      message
      statusCode
    }
  }
`;

export const mutateLikeBack = gql`
  mutation MutateLikeBack($id: ID!, $crushId: ID!) {
    mutateLikeBack(id: $id, crushId: $crushId) @client {
      message
      statusCode
    }
  }
`;
