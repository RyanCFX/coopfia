export interface UserProps {
  id: string;
  name: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
}

export interface SaveUserProps {
  card: string;
  name: string;
  lastname: string;
  marital_status_code: string;
  country_id: string;
  other_salaries: number;
  other_salaries_justification: string;
  province_id: string;
  sector_id: string;
  address: string;
  phone: string;
  email: string;
  gender_code: string;
  initial_job_date: string;
  bussiness: string;
  real_state_status_code: string;
  partner_job: JobProps;
}

export interface JobProps {
  position: string;
  bussines_name: string;
  address: string;
  entry_date: string;
  phone: string;
  email: string;
}

export interface SaveUserServiceProps {
  card: string;
  name: string;
  lastname: string;
  marital_status_code: string;
  country_id: string;
  other_salaries: number;
  other_salaries_justification: string;
  province_id: string;
  sector_id: string;
  address: string;
  phone: string;
  email: string;
  gender_code: string;
  initial_job_date: string;
  bussiness: string;
  real_state_status_code: string;
  partner_job_id: string;
}

export interface SaveTransactionProps {
  account_id: string;
  total: number;
  type: string;
  currentTotal: number;
}

export interface SaveLoanTransactionProps {
  loan_id: string;
  total: number;
  restante:number;
  valorantes:number;
}

export interface SaveLoanProps {
  $id?: string;
  user_id: string;
  status_code: "P" | "A" | "R";
  total_borrowed: number;
  interest_rate: number;
  payDay: string;
  guarantor: GuarantorProps;
  disbursemented_at?: string;
}

export interface GuarantorProps {
  card: string;
  name: string;
  lastname: string;
  bussiness: string;
  profession: string;
  salary: string;
  phone: string;
}
