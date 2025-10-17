import { account } from "./config";

export async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function checkAuth() {
  try {
    await account.get();
    return true;
  } catch {
    return false;
  }
}
