import graphqlClient from "./graphqlClient";


export const deleteMultipleLoginReport= async (
  data: string[],
) => {
  const mutation = `
    mutation deleteMultipleLoginReport($data: [ID]!) {
    deleteMultipleLoginReport(data: $data) {
    status
    type
    message
  }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { data },
  });

  return response.data;
};



export const getLoginReport = async (field:string) => {
  const query = `
    query getLoginReport {
      loginReports {
       ${field}
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data;
};


export const deleteMultipleSubscriber= async (
  data: string[],
) => {
  const mutation = `
    mutation deleteMultipleSubscriber($data: [ID]!) {
    deleteMultipleSubscriber(data: $data) {
    status
    type
    message
  }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { data },
  });

  return response.data;
};
export const getAllSubscriber = async (field:string) => {
  const query = `
    query getAllSubscriber {
      subscribers {
       ${field}
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data;
};



export const createSubscriber = async (email_address: string) => {
  const mutation = `
    mutation CreateSubscriber($email_address: String!) {
      createSubscriber(email_address: $email_address) {
        status
        message
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: {
      email_address,
    },
  });

  return response.data.data;
};



export const login = async (
  email_address: string,
  password: string,
) => {
  const mutation = `
    mutation Login($email_address: String!, $password: String!) {
      login(email_address: $email_address, password: $password) {
        status
        type
        message
        token
        session_id
        user{
        id
        }
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { email_address, password },
  });

  return response.data;
};


export const createUser = async (data: {
  firstName:string;
  lastName:string;
  email_address:string;
  telephone:string;
  academicLevel:string;
  password:string;
}) => {
   const mutation = `
     mutation CreateUser($data: AddUserInput!) {
       addUser(data: $data) {
         status
         type
         message
       }
     }
   `;
 
   const response = await graphqlClient.post("", {
     query: mutation,
     variables: { data },
   });
 
   return response.data;
};

export const verifyOTP = async (
  email_address: string,
  otp: string,
) => {
  const mutation = `
    mutation VerifyOTP($email_address: String!, $otp: String!) {
      verifyOTP(email_address: $email_address, otp: $otp) {
        status
        type
        message
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { email_address, otp },
  });

  return response.data;
};

export const resendOTP = async (
  email_address: string,
) => {
  const mutation = `
    mutation ResendOTP($email_address: String!) {
      resendOTP(email_address: $email_address) {
        status
        type
        message
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { email_address },
  });

  return response.data;
};



 export const updateUser = async (
  id: string,
  data: { 
    name: string;
    abbreviation: string;
    status: string;
    description: string;
   }
) => {
  const mutation = `
    mutation updateUser($id: ID!, $data: AddUserInput!) {
      updateUser(id: $id, data: $data) {
        status
        type
        message
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { id, data },
  });

  return response.data;
};



export const deleteMultipleUser = async (
  data: string[],
) => {
  const mutation = `
    mutation deleteMultipleUser($data: [ID]!) {
    deleteMultipleUser(data: $data) {
    status
    type
    message
  }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { data },
  });

  return response.data;
};



export const deleteUser = async (
  id: string,
) => {
  const mutation = `
    mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
    status
    type
    message
  }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { id },
  });

  return response.data;
};



export const getAllUser = async (field:string) => {
  const query = `
    query getAllUser {
      users {
       ${field}
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data;
};




export const getUserById = async (id: string, field:string) => {
  const query = `
    query getUserById($id: ID!) {
       getUserById(id: $id) {
        ${field}
      }
    }
  `;

  const response = await graphqlClient.post("", { query, variables: { id } });
  return response.data;
};
