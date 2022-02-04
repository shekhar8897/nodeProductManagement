class AccountStatus{
    static active="active";
    static deleted="deleted";
    static disabled="deactive";
}

Object.freeze(AccountStatus)

class AccountLoggedStatus{
    static login=0;
    static logout=1;
}
Object.freeze(AccountLoggedStatus)

const UsernameRegEx={
    length:"(?=.{3,15})"
}

const PasswordRegEx={
    length:"(?=.{3,15})"
}