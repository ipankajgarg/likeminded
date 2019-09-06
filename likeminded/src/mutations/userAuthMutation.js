import {gql} from 'apollo-boost';

export const isSignedInMutation = gql`
  mutation IsSignedIn($email: String!, $name: String!) {
    isSignedIn(email: $email, name: $name) {
      message
    }
  }
`;

export const isMobileNumberExistMutation = gql`
  mutation IsMobileNumberExist($mobileNumber: Long!) {
    isMobileNumberExist(mobileNumber: $mobileNumber) {
      message
    }
  }
`;

export const signUp = gql`

type PositionType {
  lat:Long,
  lng:Long
}

type LocationType {
  country: String
  countryCode: String,
  formattedAddress: String,
  locality: String
  streetName: String,
  position: PositionType

}

mutation SignUp($mobileNumber:Long!,$email:String!,$location:LocationType){
signUp(mobileNumber:$mobileNumber,email:$email,location :$location){
  message
}


}

`;
