import {gql} from 'apollo-boost';

export const isSignedInMutation = gql`
  mutation IsSignedIn($email: String!, $name: String!) {
    isSignedIn(email: $email, name: $name) {
      message
    }
  }
`;


export const isMobileNumberExistMutation = gql`
mutation IsMobileNumberExist($mobileNumber:Long!){
isMobileNumberExist(mobileNumber:$mobileNumber){
  message
}


}


`


