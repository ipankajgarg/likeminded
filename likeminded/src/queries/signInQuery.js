import {gql} from 'apollo-boost';

const query = gql`
  {
    demo {
      name
    }
  }
` ;

export default query;
