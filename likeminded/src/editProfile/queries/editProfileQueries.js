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
        name
        email
        mobileNumber
        id
      }
      likes {
        name
        email
      }
    }
  }
`;
