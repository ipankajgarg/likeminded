import {gql} from 'apollo-boost';

const mutation = gql`
  mutation SignIn($email: String!, $name: String!) {
    signIn(email: $email, name: $name) {
      token
    }
  }
`;

export default mutation;
