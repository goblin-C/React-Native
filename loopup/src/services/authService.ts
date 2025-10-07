type RegisterData = {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterData) {
  console.log('Mock register', data);
  await new Promise((res) => setTimeout(res, 800));
  return { success: true, message: 'Registered successfully' };
}

export async function loginUser(email: string, password: string) {
  console.log('Mock login', email);
  await new Promise((res) => setTimeout(res, 800));
  if (password === '1234') return { success: true };
  return { success: false, message: 'Invalid credentials (try password 1234)' };
}
