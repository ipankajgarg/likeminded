import {gql} from 'apollo-boost';

export const fetchImages = gql`
  query {
    getProfileImages {
      profileImage
      coverImage
      name
      about
      id
    }
  }
`;
