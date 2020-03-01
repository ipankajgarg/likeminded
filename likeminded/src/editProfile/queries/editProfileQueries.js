import {gql} from 'apollo-boost';

export const getProfile = gql`
  {
    getProfile(id: "5d6678e761a5793aacb42c0c") {
      id
      about
      profileImage
      coverImage
      email
      name
      gender
      crushes {
        id
        name
        email
        mobileNumber
        id
        profileImage
      }
      likes {
        id
        name
        email
        profileImage
      }
    }
  }
`;

export const getProfileFromClient = gql`
  {
    getProfile(id: "5d6678e761a5793aacb42c0c") @client {
      id
      crushes {
        id
        name
        email
        profileImage
      }
      likes {
        id
        name
        email
        profileImage
      }
    }
  }
`;
