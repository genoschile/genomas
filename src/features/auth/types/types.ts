type LoginUserResponse = {
  success: boolean;
  message: string;
  data?: {
    email: string;
    id: string;
    name: string;
    organizationId: string;
    userType: string;
    accessToken: string;
  };
};

type LoginOrganizationResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  };
};