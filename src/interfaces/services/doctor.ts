export interface IOrganizationInfo {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  code: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  fax: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  country?: string;
  logoSignedURL?: string;
  logoKey?: string;
  subscriptionCode?: string;
}

export interface IOrganizationPermission {
  organizationInfo?: IOrganizationInfo;
  modules: {
    name: string;
    code: string;
    services: {
      serviceType: string;
      serviceName: string;
      canRead: boolean;
      canWrite: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    }[];
  }[];
  level: string;
  roleId: string;
}

export interface OrganizationData {
  message: string;
  data: IOrganizationPermission;
}

export interface GetOrganizationPageState {
  data?: OrganizationData;
  loading: boolean;
  error?: string;
  hasFetched: boolean;
}

export interface LoginPageState {
  data?: LoginData;
  loading: boolean;
  error?: string;
}

export interface LoginData {
  message: string;
  data: LoginResponse;
}

export interface LoginResponse {
  token: string;
  organizations: IDoctorOrganizations[];
}

export interface IDoctorOrganizations {
  organizationId: string;
  organizationName: string;
  roleId: string;
  roleName: string;
  isPrimary: boolean;
}
