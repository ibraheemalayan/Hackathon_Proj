''' messages (to make messages easy to change from one place) '''

# messages
LOGIN_FAILED_MESSAGE = "Please check your credentials"
LOGIN_LIMITED_MESSAGE = "your account has been limited, please contact admin, {SOME EMAIL}"

PASSWORD_RESET_SUCCESS_ADMIN_SIDE_MESSAGE = "changed password successfully for user \"{}\""
PASSWORD_RESET_SUCCESS_MESSAGE = "changed password successfully"
PASSWORD_RESET_NO_MATCH_MESSAGE = "new passwords didn't match"
PASSWORD_RESET_WRONG_OLD_MESSAGE = "old password is invalid"

# TODO when making the admin (moves history), use those records to generate banners instead
USER_ADD_SUCCESS_MESSAGE = "User \"{}\" was added successfully"
USER_DEL_SUCCESS_MESSAGE = "User  \"{}\" was deleted successfully"
USER_EDIT_SUCCESS_MESSAGE = "User  \"{}\" was data updated successfully"

# notifications

FAILED_LOGIN_NOTE = "Someone tried to login to your account !"
LOGIN_NOTE = "Successful Login to your account"

USER_ENABLE_NOTE = "your account was enabled by admin"
USER_DISABLE_NOTE = "your account was disabled due to many failed logins"

PASS_RESET_NOTE = "your password was updated"
PASS_RESET_BY_ADMIN_NOTE = "your password was updated by admin"
