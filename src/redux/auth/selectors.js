export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsRememberUser = state => state.auth.rememberUser;
export const selectAuthErrorCode = state => state.auth.authError;
export const selectToken = state => state.auth.token;
export const selectIsLoggedInLoading = state => state.auth.isLoggedInLoading;
