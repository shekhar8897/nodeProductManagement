class AccountRole{
    static admin="admin";
    static user="user";
}

Object.freeze(AccountRole)

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
    length:"(?=.{1,15})"
}
const NameRegEx={
    length:"(?=.{1,15})"
}
const EmailRegEx={
    email:"^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
}
const PasswordRegEx={
    length:"(?=.{6,15})"
}
const ContactRegEx={
    length:"(?=.{10,10})"
}