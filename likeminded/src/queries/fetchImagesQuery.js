import {gql} from 'apollo-boost';

export const fetchImages = gql`
  query {
    getProfileImages {
      profileImage
      id
    }
  }
`;
