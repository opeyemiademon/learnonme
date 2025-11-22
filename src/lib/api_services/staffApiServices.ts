import graphqlClient from "./graphqlClient";

export const createStaff = async (data: {
  fullname:string;
    email_address:string;
    password:string;
    telephone:string;
    hear_about_us:string;
    country:string;
    school:string;
    address:string;
    website:string;
}) => {
   const mutation = `
     mutation CreateStaff($data: AddStaffInput!) {
       addStaff(data: $data) {
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


export const getStaffAndSchoolForRegistration = async (schoolId: string, staffId: string) => {
  const query = `
    query GetStaffAndSchoolForRegistration($schoolId: ID!, $staffId: ID!) {
      getStaffAndSchoolForRegistration(schoolId: $schoolId, staffId: $staffId) {
        school_name
        staff_name
        status
        type
        message
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query,
    variables: { schoolId, staffId },
  });

  return response.data;
};

export const registerStaff = async (data: {
  schoolId: string;
  staffId: string;
  fullname: string;
  email_address: string;
  password: string;
  telephone: string;
}) => {
  const mutation = `
    mutation RegisterStaff($data: RegisterStaffInput!) {
      registerStaff(data: $data) {
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

//from here 






export const staffLogin = async (
  email_address: string,
  password: string,
) => {
  const mutation = `
    mutation staffLogin($email_address: String!, $password: String!) {
      staffLogin(email_address: $email_address, password: $password) {
       message
      session_id
    type
    token
    staff_id
    expires_in
    status
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { email_address, password },
  });

  return response.data;
};

export const  updateStaff = async (
  id: string,
  data: { 
    fullname: string;
   role: string;
    gender: string;
    telephone: string;
   status: string;
   permission: string[];
    is_two_factor: boolean;
   }
) => {
  const mutation = `
    mutation updateStaff($id: ID!, $data: UpdateStaffInput!) {
      updateStaff(id: $id, data: $data) {
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

export const updateStaffName = async (data: { fullname: string }) => {
  const mutation = `
    mutation updateStaffName($data: UpdateStaffNameInput!) {
      updateStaffName(data: $data) {
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

export const updateStaffEmail = async (data: { email_address: string; current_password: string }) => {
  const mutation = `
    mutation updateStaffEmail($data: UpdateStaffEmailInput!) {
      updateStaffEmail(data: $data) {
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

export const updateStaffPassword = async (data: { current_password: string; new_password: string }) => {
  const mutation = `
    mutation updateStaffPassword($data: UpdateStaffPasswordInput!) {
      updateStaffPassword(data: $data) {
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

export const getStaffById = async (field:string) => {
  const query = `
    query getStaffById{
       getStaffById {
        ${field}
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data;
};



export const getSchoolStaff = async (staffFields: string) => {
  const query = `
    query getSchoolStaff {
      getSchoolStaff {
        school{
        name
        id
        }
        staff {
          ${staffFields}
        }
      }
    }
  `;

  const response = await graphqlClient.post("", { query });
  return response.data;
};



export const getAllStaff = async (field:string) => {
  const query = `
    query getAllStaff {
      staffs {
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

export const staffLoginAsAdmin = async (staffId: string) => {
  const mutation = `
    mutation staffLoginAsAdmin($staffId: ID!) {
      staffLoginAsAdmin(staffId: $staffId) {
        message
        session_id
        type
        token
        staff_id
        expires_in
        status
      }
    }
  `;

  const response = await graphqlClient.post("", {
    query: mutation,
    variables: { staffId },
  });

  return response.data;
};





